import AuditLog from "../models/AuditLog.js";
import { success, error } from "../utils/response.js";
import { paginate, paginatedResponse } from "../utils/pagination.js";
import logger from "../utils/logger.js";

export const getAuditLogs = async (req, res) => {
  try {
    const { page, limit, skip } = paginate(req.query);
    const filter = {};

    if (req.query.userId) filter.userId = req.query.userId;
    if (req.query.action) filter.action = req.query.action;
    if (req.query.resource) filter.resource = req.query.resource;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.search) {
      const re = new RegExp(req.query.search, "i");
      filter.$or = [{ userName: re }, { userEmail: re }, { resource: re }];
    }
    if (req.query.from || req.query.to) {
      filter.createdAt = {};
      if (req.query.from) filter.createdAt.$gte = new Date(req.query.from);
      if (req.query.to) filter.createdAt.$lte = new Date(req.query.to);
    }

    const [data, total] = await Promise.all([
      AuditLog.find(filter)
        .populate("userId", "name email role avatar")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      AuditLog.countDocuments(filter),
    ]);

    return success(res, "Audit logs retrieved", paginatedResponse(data, total, page, limit));
  } catch (err) {
    logger.error("Get audit logs error:", err);
    return error(res);
  }
};

export const getAuditStats = async (req, res) => {
  try {
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [total, failures, logins, topActions, topUsers] = await Promise.all([
      AuditLog.countDocuments({ createdAt: { $gte: since } }),
      AuditLog.countDocuments({ status: "failure", createdAt: { $gte: since } }),
      AuditLog.countDocuments({ action: "LOGIN", status: "success", createdAt: { $gte: since } }),
      AuditLog.aggregate([
        { $match: { createdAt: { $gte: since } } },
        { $group: { _id: "$action", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 8 },
      ]),
      AuditLog.aggregate([
        { $match: { userId: { $ne: null }, createdAt: { $gte: since } } },
        { $group: { _id: "$userId", name: { $first: "$userName" }, email: { $first: "$userEmail" }, count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]),
    ]);

    return success(res, "Audit stats", { period: "30d", total, failures, logins, topActions, topUsers });
  } catch (err) {
    logger.error("Audit stats error:", err);
    return error(res);
  }
};

export const getUserActivity = async (req, res) => {
  try {
    const { page, limit, skip } = paginate(req.query);
    const [data, total] = await Promise.all([
      AuditLog.find({ userId: req.params.userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      AuditLog.countDocuments({ userId: req.params.userId }),
    ]);
    return success(res, "User activity retrieved", paginatedResponse(data, total, page, limit));
  } catch (err) {
    return error(res);
  }
};
