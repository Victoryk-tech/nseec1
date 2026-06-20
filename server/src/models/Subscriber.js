import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const subscriberSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    status: {
      type: String,
      enum: ["active", "unsubscribed", "bounced", "pending"],
      default: "active",
    },
    source: { type: String, default: "website", trim: true },
    tags: [{ type: String, trim: true }],
    unsubscribeToken: { type: String, default: () => uuidv4(), select: false },
    unsubscribedAt: { type: Date },
    notes: { type: String },
    ipAddress: { type: String },
    emailCount: { type: Number, default: 0 },
    lastEmailSent: { type: Date },
  },
  { timestamps: true }
);

subscriberSchema.index({ status: 1 });
subscriberSchema.index({ createdAt: -1 });

export default mongoose.model("Subscriber", subscriberSchema);
