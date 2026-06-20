import Notification from "../models/Notification.js";
import { success, error, notFound } from "../utils/response.js";
import { paginate, paginatedResponse } from "../utils/pagination.js";
import logger from "../utils/logger.js";

export const getNotifications = async (req, res) => {
  try {
    const { page, limit, skip } = paginate(req.query);
    const filter = { recipientId: req.user._id };
    if (req.query.unread === "true") filter.isRead = false;

    const [data, total, unreadCount] = await Promise.all([
      Notification.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Notification.countDocuments(filter),
      Notification.countDocuments({ recipientId: req.user._id, isRead: false }),
    ]);

    return success(res, "Notifications retrieved", {
      ...paginatedResponse(data, total, page, limit),
      unreadCount,
    });
  } catch (err) {
    logger.error("Get notifications error:", err);
    return error(res);
  }
};

export const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      recipientId: req.user._id,
      isRead: false,
    });
    return success(res, "Unread count", { count });
  } catch (err) {
    return error(res);
  }
};

export const markAsRead = async (req, res) => {
  try {
    const notif = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipientId: req.user._id },
      { isRead: true },
      { new: true }
    );
    if (!notif) return notFound(res, "Notification not found");
    return success(res, "Marked as read", { notification: notif });
  } catch (err) {
    return error(res);
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipientId: req.user._id, isRead: false },
      { isRead: true }
    );
    return success(res, "All notifications marked as read");
  } catch (err) {
    return error(res);
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const notif = await Notification.findOneAndDelete({
      _id: req.params.id,
      recipientId: req.user._id,
    });
    if (!notif) return notFound(res, "Notification not found");
    return success(res, "Notification deleted");
  } catch (err) {
    return error(res);
  }
};

export const clearReadNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({ recipientId: req.user._id, isRead: true });
    return success(res, "Read notifications cleared");
  } catch (err) {
    return error(res);
  }
};
