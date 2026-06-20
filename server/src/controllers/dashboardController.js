import User from "../models/User.js";
import Subscriber from "../models/Subscriber.js";
import Contact from "../models/Contact.js";
import Media from "../models/Media.js";
import AuditLog from "../models/AuditLog.js";
import { success, error } from "../utils/response.js";
import logger from "../utils/logger.js";

export const getDashboardStats = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalUsers, activeUsers,
      totalSubscribers, newSubscribers, activeSubscribers,
      totalContacts, newContacts, unrepliedContacts,
      totalMedia,
      recentActivity,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isActive: true }),
      Subscriber.countDocuments(),
      Subscriber.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      Subscriber.countDocuments({ status: "active" }),
      Contact.countDocuments(),
      Contact.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      Contact.countDocuments({ status: { $in: ["new", "read"] } }),
      Media.countDocuments(),
      AuditLog.find({ createdAt: { $gte: sevenDaysAgo } })
        .populate("userId", "name avatar")
        .sort({ createdAt: -1 })
        .limit(15)
        .lean(),
    ]);

    // Subscriber growth — last 7 days per day
    const subscriberGrowth = await Subscriber.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    return success(res, "Dashboard stats retrieved", {
      users: { total: totalUsers, active: activeUsers },
      subscribers: { total: totalSubscribers, active: activeSubscribers, newThisMonth: newSubscribers, growth: subscriberGrowth },
      contacts: { total: totalContacts, newThisWeek: newContacts, unreplied: unrepliedContacts },
      media: { total: totalMedia },
      recentActivity,
    });
  } catch (err) {
    logger.error("Dashboard stats error:", err);
    return error(res);
  }
};
