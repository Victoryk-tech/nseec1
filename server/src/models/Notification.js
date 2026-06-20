import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        "LOGIN",
        "FAILED_LOGIN",
        "PASSWORD_CHANGED",
        "FIRST_LOGIN_PENDING",
        "USER_CREATED",
        "USER_UPDATED",
        "USER_DELETED",
        "USER_ACTIVATED",
        "USER_DEACTIVATED",
        "CONTACT_RECEIVED",
        "SUBSCRIBER_JOINED",
        "MEDIA_UPLOADED",
        "SYSTEM",
      ],
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    link: { type: String },
    actorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    actorName: { type: String },
    actorRole: { type: String },
    resource: { type: String },
    resourceId: { type: String },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

notificationSchema.index({ recipientId: 1, createdAt: -1 });
notificationSchema.index({ recipientId: 1, isRead: 1 });

export default mongoose.model("Notification", notificationSchema);
