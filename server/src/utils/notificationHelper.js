import User from "../models/User.js";
import Notification from "../models/Notification.js";
import logger from "./logger.js";

export const notifyUser = async (userId, data) => {
  if (!userId) return;
  try {
    await Notification.create({ recipientId: userId, ...data });
  } catch (err) {
    logger.error("notifyUser failed:", err.message);
  }
};

export const notifyRoles = async (roles, data, excludeUserId = null) => {
  try {
    const query = { role: { $in: roles }, isActive: true };
    if (excludeUserId) query._id = { $ne: excludeUserId };
    const users = await User.find(query).select("_id").lean();
    if (!users.length) return;
    await Notification.insertMany(
      users.map((u) => ({ recipientId: u._id, ...data })),
      { ordered: false }
    );
  } catch (err) {
    logger.error("notifyRoles failed:", err.message);
  }
};
