import mongoose from "mongoose";

const toSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const publicationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    category: {
      type: String,
      required: true,
      enum: [
        "reports",
        "digest",
        "research-journals",
        "nssec-establishment-act",
        "national-policy-sse",
        "minimum-standards",
        "implementation-guidelines",
      ],
    },
    author: { type: String, trim: true },
    yearOfPublication: { type: Number },
    monthOfPublication: { type: Number, min: 1, max: 12 },
    publishedAt: { type: Date, default: Date.now },
    fileUrl: { type: String, required: true },
    fileCloudinaryId: { type: String, required: true },
    fileSize: { type: String },
    fileSizeBytes: { type: Number },
    fileFormat: { type: String },
    pageCount: { type: Number },
    coverImageUrl: { type: String },
    coverImageCloudinaryId: { type: String },
    views: { type: Number, default: 0 },
    downloadCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    tags: [{ type: String, trim: true }],
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

publicationSchema.index({ category: 1 });
publicationSchema.index({ createdAt: -1 });
publicationSchema.index({ featured: 1 });
publicationSchema.index({ title: "text", description: "text" });

publicationSchema.pre("validate", async function (next) {
  if (!this.isNew || this.slug) return next();
  const base = toSlug(this.title || "publication");
  let slug = base;
  let n = 1;
  while (await mongoose.models.Publication?.exists({ slug })) {
    slug = `${base}-${++n}`;
  }
  this.slug = slug;
  next();
});

export default mongoose.model("Publication", publicationSchema);
