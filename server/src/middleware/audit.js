import AuditLog from "../models/AuditLog.js";
import logger from "../utils/logger.js";

export const createAuditLog = async ({
  userId,
  userName,
  userEmail,
  userRole,
  action,
  resource,
  resourceId,
  details,
  ipAddress,
  userAgent,
  status = "success",
  errorMessage,
  duration,
}) => {
  try {
    await AuditLog.create({
      userId,
      userName,
      userEmail,
      userRole,
      action,
      resource,
      resourceId: resourceId ? String(resourceId) : undefined,
      details,
      ipAddress,
      userAgent,
      status,
      errorMessage,
      duration,
    });
  } catch (err) {
    logger.error("Failed to create audit log:", err);
  }
};

export const auditMiddleware = (action, resource, getResourceId = null) => {
  return async (req, res, next) => {
    const start = Date.now();
    const originalJson = res.json.bind(res);

    res.json = function (body) {
      const duration = Date.now() - start;
      const isSuccess = res.statusCode < 400;

      setImmediate(() => {
        createAuditLog({
          userId: req.user?._id,
          userName: req.user?.name,
          userEmail: req.user?.email,
          userRole: req.user?.role,
          action,
          resource,
          resourceId: getResourceId ? getResourceId(req, body) : req.params?.id,
          details: {
            method: req.method,
            path: req.path,
            query: req.query,
            body: sanitizeBody(req.body),
            statusCode: res.statusCode,
          },
          ipAddress: req.ip || req.connection?.remoteAddress,
          userAgent: req.headers["user-agent"],
          status: isSuccess ? "success" : "failure",
          errorMessage: !isSuccess ? body?.message : undefined,
          duration,
        });
      });

      return originalJson(body);
    };

    next();
  };
};

const SENSITIVE_FIELDS = ["password", "token", "secret", "refreshToken", "passwordResetToken"];

function sanitizeBody(body) {
  if (!body || typeof body !== "object") return body;
  const safe = { ...body };
  SENSITIVE_FIELDS.forEach((f) => {
    if (f in safe) safe[f] = "[REDACTED]";
  });
  return safe;
}
