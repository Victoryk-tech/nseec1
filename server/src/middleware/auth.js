import { verifyAccessToken } from "../utils/jwt.js";
import User from "../models/User.js";
import { unauthorized, forbidden } from "../utils/response.js";
import logger from "../utils/logger.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      logger.warn(`[AUTH MIDDLEWARE] No Bearer token on ${req.method} ${req.path}`);
      return unauthorized(res, "No token provided");
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (verifyErr) {
      logger.warn(`[AUTH MIDDLEWARE] Token verification failed on ${req.method} ${req.path}: ${verifyErr.name}`);
      throw verifyErr;
    }

    const user = await User.findById(decoded.id).select("+isActive");
    if (!user || !user.isActive) {
      logger.warn(`[AUTH MIDDLEWARE] User not found or deactivated: id=${decoded.id}`);
      return unauthorized(res, "Account not found or deactivated");
    }

    logger.info(`[AUTH MIDDLEWARE] Authenticated: ${user.email} (${user.role}) on ${req.method} ${req.path}`);
    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return unauthorized(res, "Token expired");
    }
    return unauthorized(res, "Invalid token");
  }
};

const ROLE_HIERARCHY = { superAdmin: 4, admin: 3, editor: 2, viewer: 1 };

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return unauthorized(res);
    const userLevel = ROLE_HIERARCHY[req.user.role] || 0;
    const allowed = roles.some((r) => ROLE_HIERARCHY[r] <= userLevel);
    if (!allowed) return forbidden(res, "Insufficient permissions");
    next();
  };
};

export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return unauthorized(res);
    if (!roles.includes(req.user.role)) {
      return forbidden(res, "Insufficient permissions");
    }
    next();
  };
};
