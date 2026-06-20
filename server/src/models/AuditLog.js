import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    userName: { type: String },
    userEmail: { type: String },
    userRole: { type: String },
    action: {
      type: String,
      required: true,
      enum: [
        "LOGIN", "LOGOUT", "FAILED_LOGIN", "PASSWORD_RESET_REQUEST", "PASSWORD_CHANGED",
        "CREATE", "READ", "UPDATE", "DELETE",
        "UPLOAD", "DOWNLOAD", "EXPORT",
        "STATUS_CHANGE", "BULK_ACTION",
        "SETTINGS_CHANGE", "USER_ACTIVATED", "USER_DEACTIVATED",
        "TOKEN_REFRESH",
      ],
    },
    resource: { type: String, required: true },
    resourceId: { type: String },
    details: { type: mongoose.Schema.Types.Mixed },
    ipAddress: { type: String },
    userAgent: { type: String },
    status: { type: String, enum: ["success", "failure"], default: "success" },
    errorMessage: { type: String },
    duration: { type: Number },
  },
  { timestamps: true }
);

auditLogSchema.index({ userId: 1 });
auditLogSchema.index({ action: 1 });
auditLogSchema.index({ resource: 1 });
auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ status: 1 });

export default mongoose.model("AuditLog", auditLogSchema);
