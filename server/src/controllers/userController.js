import User from "../models/User.js";
import { success, created, error, notFound, badRequest, forbidden } from "../utils/response.js";
import { paginate, paginatedResponse } from "../utils/pagination.js";
import { sendWelcomeEmail } from "../emails/services/welcomeEmail.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";
import { notifyRoles, notifyUser } from "../utils/notificationHelper.js";
import logger from "../utils/logger.js";

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#!";
const generateTempPassword = () =>
  Array.from({ length: 12 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join("");

export const getUsers = async (req, res) => {
  try {
    const { page, limit, skip } = paginate(req.query);
    const filter = {};
    if (req.query.role) filter.role = req.query.role;
    if (req.query.isActive !== undefined) filter.isActive = req.query.isActive === "true";
    if (req.query.search) {
      const re = new RegExp(req.query.search, "i");
      filter.$or = [{ name: re }, { email: re }];
    }

    const [data, total] = await Promise.all([
      User.find(filter).select("-password -refreshTokens").sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(filter),
    ]);

    return success(res, "Users retrieved", paginatedResponse(data, total, page, limit));
  } catch (err) {
    logger.error("Get users error:", err);
    return error(res);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -refreshTokens");
    if (!user) return notFound(res, "User not found");
    return success(res, "User retrieved", { user });
  } catch (err) {
    logger.error("Get user error:", err);
    return error(res);
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, role, department, phone } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return badRequest(res, "Email already in use");

    if (role === "superAdmin" && req.user.role !== "superAdmin") {
      return forbidden(res, "Only superAdmins can create other superAdmins");
    }

    // Always generate a temp password — staff must change on first login
    const temporaryPassword = generateTempPassword();

    const user = await User.create({
      name, email, password: temporaryPassword,
      role, department, phone,
      requiresPasswordChange: true,
    });

    const loginUrl = `${process.env.DASHBOARD_URL}/staff-portal/login`;
    await sendWelcomeEmail({ name: user.name, email: user.email, loginUrl, temporaryPassword }).catch(() => {});

    // Notify all superAdmins (except the creator if they are one)
    await notifyRoles(["superAdmin"], {
      type: "USER_CREATED",
      title: "New Staff Account Created",
      message: `${req.user.name} created a new ${role} account for ${name} (${email})`,
      link: "/dashboard/users",
      actorId: req.user._id,
      actorName: req.user.name,
      actorRole: req.user.role,
      resource: "users",
      resourceId: String(user._id),
    }, req.user.role === "superAdmin" ? req.user._id : null);

    return created(res, "User created successfully", { user });
  } catch (err) {
    logger.error("Create user error:", err);
    return error(res);
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return notFound(res, "User not found");

    if (user.role === "superAdmin" && req.user.role !== "superAdmin") {
      return forbidden(res, "Only superAdmins can modify other superAdmins");
    }
    if (req.body.role === "superAdmin" && req.user.role !== "superAdmin") {
      return forbidden(res, "Only superAdmins can assign superAdmin role");
    }

    const prevIsActive = user.isActive;
    const allowed = ["name", "role", "department", "phone", "isActive"];
    allowed.forEach((f) => { if (req.body[f] !== undefined) user[f] = req.body[f]; });

    await user.save({ validateBeforeSave: false });

    // Detect activation/deactivation for specific notification type
    const statusChanged = req.body.isActive !== undefined && req.body.isActive !== prevIsActive;
    const notifType = statusChanged
      ? (user.isActive ? "USER_ACTIVATED" : "USER_DEACTIVATED")
      : "USER_UPDATED";
    const notifTitle = statusChanged
      ? `Staff Account ${user.isActive ? "Activated" : "Deactivated"}`
      : "Staff Account Updated";
    const notifMsg = statusChanged
      ? `${req.user.name} ${user.isActive ? "activated" : "deactivated"} ${user.name}'s account`
      : `${req.user.name} updated ${user.name}'s profile`;

    await notifyRoles(["superAdmin"], {
      type: notifType,
      title: notifTitle,
      message: notifMsg,
      link: "/dashboard/users",
      actorId: req.user._id,
      actorName: req.user.name,
      actorRole: req.user.role,
      resource: "users",
      resourceId: String(user._id),
    }, req.user.role === "superAdmin" ? req.user._id : null);

    // Also notify the affected user if their account was toggled
    if (statusChanged) {
      await notifyUser(user._id, {
        type: notifType,
        title: `Your account has been ${user.isActive ? "activated" : "deactivated"}`,
        message: `Your NSSEC staff account was ${user.isActive ? "activated" : "deactivated"} by ${req.user.name}`,
        link: "/dashboard",
        actorId: req.user._id,
        actorName: req.user.name,
        actorRole: req.user.role,
        resource: "users",
        resourceId: String(user._id),
      });
    }

    return success(res, "User updated", { user });
  } catch (err) {
    logger.error("Update user error:", err);
    return error(res);
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (req.params.id === String(req.user._id)) {
      return badRequest(res, "You cannot delete your own account");
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return notFound(res, "User not found");

    await notifyRoles(["superAdmin"], {
      type: "USER_DELETED",
      title: "Staff Account Deleted",
      message: `${req.user.name} permanently deleted ${user.name}'s account (${user.email})`,
      link: "/dashboard/audit",
      actorId: req.user._id,
      actorName: req.user.name,
      actorRole: req.user.role,
      resource: "users",
      resourceId: String(user._id),
    }, req.user._id);

    return success(res, "User deleted");
  } catch (err) {
    logger.error("Delete user error:", err);
    return error(res);
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return badRequest(res, "No file uploaded");

    const user = await User.findById(req.user._id);
    if (user.avatar) {
      const oldId = user.avatar.split("/").pop().split(".")[0];
      await deleteFromCloudinary(`nssec/avatars/${oldId}`).catch(() => {});
    }

    const result = await uploadToCloudinary(req.file.buffer, {
      folder: "nssec/avatars",
      transformation: [{ width: 200, height: 200, crop: "fill", gravity: "face" }],
    });

    user.avatar = result.secure_url;
    await user.save({ validateBeforeSave: false });

    return success(res, "Avatar uploaded", { avatar: result.secure_url });
  } catch (err) {
    logger.error("Upload avatar error:", err);
    return error(res);
  }
};
