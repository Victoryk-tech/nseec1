import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  generatePasswordResetToken,
  verifyPasswordResetToken,
  generateMfaSessionToken,
  verifyMfaSessionToken,
} from "../utils/jwt.js";
import { success, error, unauthorized, badRequest, notFound } from "../utils/response.js";
import { sendPasswordResetEmail, sendPasswordChangedEmail } from "../emails/services/passwordResetEmail.js";
import { sendMfaCodeEmail } from "../emails/services/mfaEmail.js";
import { createAuditLog } from "../middleware/audit.js";
import { notifyRoles, notifyUser } from "../utils/notificationHelper.js";
import logger from "../utils/logger.js";

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
};

const COOKIE_OPTS_LONG = {
  ...COOKIE_OPTS,
  maxAge: 14 * 24 * 60 * 60 * 1000,
};

const getClientInfo = (req) => ({
  ipAddress: req.ip || req.connection?.remoteAddress,
  userAgent: req.headers["user-agent"],
});

const generateMfaCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const login = async (req, res) => {
  const { email, password } = req.body;
  const { ipAddress, userAgent } = getClientInfo(req);

  logger.info(`[AUTH] Login attempt: ${email} from ${ipAddress}`);

  try {
    const user = await User.findOne({ email }).select("+password +refreshTokens");
    if (!user) {
      logger.warn(`[AUTH] Login failed: user not found for email="${email}"`);
      await createAuditLog({
        action: "FAILED_LOGIN", resource: "auth",
        details: { email }, ipAddress, userAgent,
        status: "failure", errorMessage: "User not found",
      });
      return unauthorized(res, "Invalid credentials");
    }

    logger.info(`[AUTH] User found: id=${user._id} role=${user.role} isActive=${user.isActive}`);

    if (!user.isActive) {
      logger.warn(`[AUTH] Login blocked: account deactivated for ${email}`);
      await createAuditLog({
        userId: user._id, userName: user.name, userEmail: user.email, userRole: user.role,
        action: "FAILED_LOGIN", resource: "auth", ipAddress, userAgent,
        status: "failure", errorMessage: "Account deactivated",
      });
      return unauthorized(res, "Your account has been deactivated. Contact your administrator.");
    }

    logger.info(`[AUTH] Comparing password for ${email}...`);
    const isValid = await user.comparePassword(password);
    logger.info(`[AUTH] Password comparison result for ${email}: ${isValid}`);
    if (!isValid) {
      await createAuditLog({
        userId: user._id, userName: user.name, userEmail: user.email, userRole: user.role,
        action: "FAILED_LOGIN", resource: "auth", ipAddress, userAgent,
        status: "failure", errorMessage: "Wrong password",
      });

      await notifyRoles(["superAdmin"], {
        type: "FAILED_LOGIN",
        title: "Failed Login Attempt",
        message: `Failed login attempt for ${user.name} (${user.email}) — wrong password`,
        link: "/dashboard/audit",
        actorName: user.name,
        actorRole: user.role,
        resource: "auth",
        resourceId: String(user._id),
      }, user._id);

      return unauthorized(res, "Invalid credentials");
    }

    // Admin bypass: skip MFA entirely for the super-admin account
    if (user.email === (process.env.SEED_SUPER_ADMIN_EMAIL || "admin@nssec.gov.ng")) {
      const payload = { id: user._id, role: user.role };
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      user.refreshTokens = [
        ...(user.refreshTokens || []).slice(-4),
        { token: refreshToken, device: userAgent?.substring(0, 100) },
      ];
      user.lastLogin = new Date();
      user.loginCount = (user.loginCount || 0) + 1;
      await user.save({ validateBeforeSave: false });

      res.cookie("refreshToken", refreshToken, COOKIE_OPTS_LONG);

      createAuditLog({
        userId: user._id, userName: user.name, userEmail: user.email, userRole: user.role,
        action: "LOGIN", resource: "auth", ipAddress, userAgent,
      }).catch(() => {});

      logger.info(`[AUTH] Admin bypass login for ${email}`);
      return success(res, "Welcome back!", {
        requiresMfa: false,
        accessToken,
        user: user.toJSON(),
        requiresPasswordChange: user.requiresPasswordChange || false,
      });
    }

    // Issue MFA session — full access token granted only after code verification
    const mfaSession = generateMfaSessionToken({ id: user._id, role: user.role });
    logger.info(`[AUTH] MFA session issued for ${email}`);

    return success(res, "Credentials verified. Please complete identity verification.", {
      requiresMfa: true,
      mfaSession,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
    });
  } catch (err) {
    logger.error("Login error:", err);
    return error(res);
  }
};

export const sendMfaCode = async (req, res) => {
  const { mfaSession } = req.body;
  if (!mfaSession) return badRequest(res, "MFA session required");

  try {
    const decoded = verifyMfaSessionToken(mfaSession);
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) return unauthorized(res, "Invalid session");

    const code = generateMfaCode();
    logger.info(`[AUTH] MFA code generated for user ${user.email}`);
    if (process.env.NODE_ENV === "development") {
      logger.info(`[AUTH DEV] MFA code for ${user.email}: ${code}`);
    }
    const hashed = await bcrypt.hash(code, 10);

    user.mfaCode = hashed;
    user.mfaCodeExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await user.save({ validateBeforeSave: false });

    logger.info(`[AUTH] Sending MFA code email to ${user.email}...`);
    await sendMfaCodeEmail({ name: user.name, email: user.email, code });
    logger.info(`[AUTH] MFA code email sent to ${user.email}`);

    return success(res, "Verification code sent to your email");
  } catch (err) {
    if (err.name === "TokenExpiredError") return unauthorized(res, "Session expired. Please log in again.");
    if (err.name === "JsonWebTokenError") return unauthorized(res, "Invalid session");
    logger.error("Send MFA code error:", err);
    return error(res);
  }
};

export const verifyMfa = async (req, res) => {
  const { mfaSession, code, remember = false } = req.body;
  const { ipAddress, userAgent } = getClientInfo(req);

  if (!mfaSession || !code) return badRequest(res, "Session and code required");

  try {
    const decoded = verifyMfaSessionToken(mfaSession);
    logger.info(`[AUTH] MFA verify: decoded session for userId=${decoded.id}`);
    const user = await User.findById(decoded.id).select("+mfaCode +mfaCodeExpires +refreshTokens");
    if (!user || !user.isActive) return unauthorized(res, "Invalid session");

    if (!user.mfaCode || !user.mfaCodeExpires) {
      logger.warn(`[AUTH] MFA verify failed: no code on record for userId=${decoded.id}`);
      return badRequest(res, "No code sent. Please request a new code.");
    }
    if (new Date() > user.mfaCodeExpires) {
      logger.warn(`[AUTH] MFA verify failed: code expired for userId=${decoded.id}`);
      return badRequest(res, "Code has expired. Please request a new one.");
    }

    const isValid = await bcrypt.compare(code, user.mfaCode);
    logger.info(`[AUTH] MFA code comparison for ${user.email}: ${isValid}`);
    if (!isValid) {
      return unauthorized(res, "Incorrect code. Please try again.");
    }

    // Clear MFA code
    user.mfaCode = undefined;
    user.mfaCodeExpires = undefined;
    user.lastLogin = new Date();
    user.loginCount += 1;

    const payload = { id: user._id, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    logger.info(`[AUTH] Tokens generated for ${user.email} (role=${user.role})`);

    user.refreshTokens = [
      ...(user.refreshTokens || []).slice(-4),
      { token: refreshToken, device: userAgent?.substring(0, 100) },
    ];
    await user.save({ validateBeforeSave: false });

    const cookieOpts = remember ? COOKIE_OPTS_LONG : COOKIE_OPTS;
    res.cookie("refreshToken", refreshToken, cookieOpts);

    await createAuditLog({
      userId: user._id, userName: user.name, userEmail: user.email, userRole: user.role,
      action: "LOGIN", resource: "auth", ipAddress, userAgent,
    });

    // Notify superAdmins of successful login (skip if the user IS a superAdmin)
    if (user.role !== "superAdmin") {
      await notifyRoles(["superAdmin"], {
        type: "LOGIN",
        title: "Staff Login",
        message: `${user.name} (${user.role}) logged into the dashboard`,
        link: "/dashboard/audit",
        actorId: user._id,
        actorName: user.name,
        actorRole: user.role,
        resource: "auth",
        resourceId: String(user._id),
      });
    }

    return success(res, "Login successful", {
      accessToken,
      user: user.toJSON(),
      requiresPasswordChange: user.requiresPasswordChange || false,
    });
  } catch (err) {
    if (err.name === "TokenExpiredError") return unauthorized(res, "Session expired. Please log in again.");
    if (err.name === "JsonWebTokenError") return unauthorized(res, "Invalid session");
    logger.error("Verify MFA error:", err);
    return error(res);
  }
};

export const refresh = async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) return unauthorized(res, "No refresh token");

  try {
    const decoded = verifyRefreshToken(token);
    const user = await User.findById(decoded.id).select("+refreshTokens");
    if (!user) return unauthorized(res, "User not found");

    const stored = user.refreshTokens?.find((t) => t.token === token);
    if (!stored) return unauthorized(res, "Invalid refresh token");

    const newAccess = generateAccessToken({ id: user._id, role: user.role });
    const newRefresh = generateRefreshToken({ id: user._id, role: user.role });

    user.refreshTokens = user.refreshTokens.filter((t) => t.token !== token);
    user.refreshTokens.push({ token: newRefresh, device: stored.device });
    await user.save({ validateBeforeSave: false });

    res.cookie("refreshToken", newRefresh, COOKIE_OPTS);
    return success(res, "Token refreshed", { accessToken: newAccess });
  } catch {
    return unauthorized(res, "Invalid or expired refresh token");
  }
};

export const logout = async (req, res) => {
  const token = req.cookies?.refreshToken;
  const { ipAddress, userAgent } = getClientInfo(req);

  try {
    if (token && req.user) {
      const user = await User.findById(req.user._id).select("+refreshTokens");
      if (user) {
        user.refreshTokens = (user.refreshTokens || []).filter((t) => t.token !== token);
        await user.save({ validateBeforeSave: false });
      }
    }

    res.clearCookie("refreshToken", {
      httpOnly: true, secure: process.env.NODE_ENV === "production",
      sameSite: "strict", path: "/",
    });

    if (req.user) {
      await createAuditLog({
        userId: req.user._id, userName: req.user.name, userEmail: req.user.email, userRole: req.user.role,
        action: "LOGOUT", resource: "auth", ipAddress, userAgent,
      });
    }

    return success(res, "Logged out successfully");
  } catch (err) {
    logger.error("Logout error:", err);
    return error(res);
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const { ipAddress, userAgent } = getClientInfo(req);

  try {
    const user = await User.findOne({ email });
    if (!user) return success(res, "If that email exists, a reset link has been sent.");

    const token = generatePasswordResetToken({ id: user._id });
    const resetUrl = `${process.env.DASHBOARD_URL}/staff-portal/reset-password?token=${token}`;

    await sendPasswordResetEmail({ name: user.name, email: user.email, resetUrl });
    await createAuditLog({
      userId: user._id, userName: user.name, userEmail: user.email, userRole: user.role,
      action: "PASSWORD_RESET_REQUEST", resource: "auth", ipAddress, userAgent,
    });

    return success(res, "If that email exists, a reset link has been sent.");
  } catch (err) {
    logger.error("Forgot password error:", err);
    return error(res);
  }
};

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  const { ipAddress, userAgent } = getClientInfo(req);

  try {
    const decoded = verifyPasswordResetToken(token);
    const user = await User.findById(decoded.id);
    if (!user) return badRequest(res, "Invalid or expired reset token");

    user.password = password;
    user.requiresPasswordChange = false;
    await user.save();

    await sendPasswordChangedEmail({ name: user.name, email: user.email });
    await createAuditLog({
      userId: user._id, userName: user.name, userEmail: user.email, userRole: user.role,
      action: "PASSWORD_CHANGED", resource: "auth", ipAddress, userAgent,
    });

    await notifyRoles(["superAdmin"], {
      type: "PASSWORD_CHANGED",
      title: "Password Reset",
      message: `${user.name} reset their password via the forgot password flow`,
      link: "/dashboard/audit",
      actorId: user._id, actorName: user.name, actorRole: user.role,
      resource: "auth", resourceId: String(user._id),
    }, user._id);

    return success(res, "Password reset successfully. Please log in.");
  } catch (err) {
    if (err.name === "TokenExpiredError") return badRequest(res, "Reset link has expired. Please request a new one.");
    if (err.name === "JsonWebTokenError") return badRequest(res, "Invalid reset token");
    logger.error("Reset password error:", err);
    return error(res);
  }
};

export const getMe = async (req, res) => {
  return success(res, "Profile retrieved", { user: req.user });
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { ipAddress, userAgent } = getClientInfo(req);

  try {
    const user = await User.findById(req.user._id).select("+password");

    // First-login forced change: skip current password check if requiresPasswordChange is true
    if (!user.requiresPasswordChange) {
      const isValid = await user.comparePassword(currentPassword);
      if (!isValid) return badRequest(res, "Current password is incorrect");
    }

    user.password = newPassword;
    user.requiresPasswordChange = false;
    await user.save();

    await sendPasswordChangedEmail({ name: user.name, email: user.email });
    await createAuditLog({
      userId: user._id, userName: user.name, userEmail: user.email, userRole: user.role,
      action: "PASSWORD_CHANGED", resource: "auth", ipAddress, userAgent,
    });

    // Notify superAdmins when any staff changes their password
    if (user.role !== "superAdmin") {
      await notifyRoles(["superAdmin"], {
        type: "PASSWORD_CHANGED",
        title: "Staff Password Changed",
        message: `${user.name} (${user.role}) changed their account password`,
        link: "/dashboard/audit",
        actorId: user._id, actorName: user.name, actorRole: user.role,
        resource: "auth", resourceId: String(user._id),
      });
    }

    return success(res, "Password changed successfully");
  } catch (err) {
    logger.error("Change password error:", err);
    return error(res);
  }
};
