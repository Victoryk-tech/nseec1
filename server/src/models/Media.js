import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    type: {
      type: String,
      enum: ["image", "video", "document", "audio"],
      required: true,
    },
    cloudinaryId: { type: String, required: true },
    url: { type: String, required: true },
    secureUrl: { type: String },
    format: { type: String },
    size: { type: Number },
    width: { type: Number },
    height: { type: Number },
    duration: { type: Number },
    folder: { type: String, default: "nssec" },
    tags: [{ type: String }],
    alt: { type: String },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isPublic: { type: Boolean, default: true },
    usageCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

mediaSchema.index({ type: 1 });
mediaSchema.index({ uploadedBy: 1 });
mediaSchema.index({ tags: 1 });
mediaSchema.index({ createdAt: -1 });

export default mongoose.model("Media", mediaSchema);
