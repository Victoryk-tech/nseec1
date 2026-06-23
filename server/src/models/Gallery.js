import mongoose from "mongoose";

const toSlug = (text) =>
  text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

const imageSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    cloudinaryId: { type: String, required: true },
    caption: { type: String, default: "" },
    altText: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const videoSchema = new mongoose.Schema(
  {
    videoUrl: { type: String, required: true },
    cloudinaryId: { type: String, required: true },
    caption: { type: String, default: "" },
  },
  { _id: false }
);

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    description: { type: String, default: "", maxlength: 1000 },
    images: { type: [imageSchema], default: [] },
    videos: { type: [videoSchema], default: [] },
    thumbnailUrl: { type: String, default: "" },
    thumbnailCloudinaryId: { type: String, default: "" },
    hashtags: [{ type: String }],
    views: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    publishedAt: { type: Date, default: Date.now },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

gallerySchema.pre("validate", async function (next) {
  if (!this.isNew || this.slug) return next();
  const base = toSlug(this.title || "gallery");
  let slug = base, n = 1;
  while (await mongoose.models.Gallery?.exists({ slug })) slug = `${base}-${++n}`;
  this.slug = slug;
  next();
});

gallerySchema.pre("save", function (next) {
  // Auto-set thumbnail from first image, fall back to first video
  if (this.images && this.images.length > 0) {
    this.thumbnailUrl = this.images[0].imageUrl;
    this.thumbnailCloudinaryId = this.images[0].cloudinaryId;
  } else if (this.videos && this.videos.length > 0) {
    this.thumbnailUrl = this.videos[0].videoUrl;
    this.thumbnailCloudinaryId = this.videos[0].cloudinaryId;
  }
  next();
});

gallerySchema.index({ createdAt: -1 });
gallerySchema.index({ featured: 1 });

export default mongoose.model("Gallery", gallerySchema);
