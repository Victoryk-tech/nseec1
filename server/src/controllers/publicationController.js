import Publication from "../models/Publication.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";
import { sendPublicationNotifications } from "../emails/services/publicationEmail.js";
import { success, created, error, notFound, badRequest } from "../utils/response.js";
import { paginate, paginatedResponse } from "../utils/pagination.js";
import logger from "../utils/logger.js";

const MAX_PUB_BYTES = 50 * 1024 * 1024;  // 50 MB
const MAX_COVER_BYTES = 10 * 1024 * 1024; // 10 MB

const fmtSize = (bytes) => {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// ── Public ────────────────────────────────────────────────────────────────────

export const getPublications = async (req, res) => {
  try {
    const { page, limit, skip } = paginate(req.query);
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.featured === "true") filter.featured = true;
    if (req.query.search) {
      const re = new RegExp(req.query.search, "i");
      filter.$or = [{ title: re }, { description: re }, { author: re }];
    }

    const [data, total] = await Promise.all([
      Publication.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Publication.countDocuments(filter),
    ]);

    return success(res, "Publications retrieved", paginatedResponse(data, total, page, limit));
  } catch (err) {
    logger.error("Get publications error:", err);
    return error(res);
  }
};

export const getPublicationSlugs = async (_req, res) => {
  try {
    const slugs = await Publication.find({}).select("slug").lean();
    return success(res, "Slugs retrieved", { slugs: slugs.map((p) => p.slug) });
  } catch (err) {
    return error(res);
  }
};

export const getPublication = async (req, res) => {
  try {
    const pub = await Publication.findOne({ slug: req.params.slug }).lean();
    if (!pub) return notFound(res, "Publication not found");
    return success(res, "Publication retrieved", { publication: pub });
  } catch (err) {
    return error(res);
  }
};

export const trackView = async (req, res) => {
  try {
    const pub = await Publication.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true, select: "views" }
    );
    if (!pub) return notFound(res, "Publication not found");
    return success(res, "View tracked", { views: pub.views });
  } catch (err) {
    return error(res);
  }
};

export const trackDownload = async (req, res) => {
  try {
    const pub = await Publication.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloadCount: 1 } },
      { new: true, select: "downloadCount" }
    );
    if (!pub) return notFound(res, "Publication not found");
    return success(res, "Download tracked", { downloadCount: pub.downloadCount });
  } catch (err) {
    return error(res);
  }
};

// ── Admin ─────────────────────────────────────────────────────────────────────

export const createPublication = async (req, res) => {
  try {
    const pubFile = req.files?.file?.[0];
    const coverFile = req.files?.coverImage?.[0];

    if (!pubFile) return badRequest(res, "Publication file is required");
    if (pubFile.size > MAX_PUB_BYTES) {
      return badRequest(res, `File too large. Maximum allowed size is ${MAX_PUB_BYTES / (1024 * 1024)}MB`);
    }
    if (coverFile && coverFile.size > MAX_COVER_BYTES) {
      return badRequest(res, `Cover image too large. Maximum allowed size is ${MAX_COVER_BYTES / (1024 * 1024)}MB`);
    }

    const {
      title, description, category, author,
      yearOfPublication, monthOfPublication, pageCount,
      featured, tags,
    } = req.body;

    const fileExt = pubFile.originalname.split(".").pop()?.toLowerCase() || "pdf";

    const [fileResult, coverResult] = await Promise.all([
      uploadToCloudinary(pubFile.buffer, {
        folder: "nssec/publications/files",
        resource_type: "raw",
        format: fileExt,
      }),
      coverFile
        ? uploadToCloudinary(coverFile.buffer, {
            folder: "nssec/publications/covers",
            resource_type: "image",
            quality: "auto:good",
            fetch_format: "auto",
          })
        : Promise.resolve(null),
    ]);

    const publication = await Publication.create({
      title,
      description,
      category,
      author: author || undefined,
      yearOfPublication: yearOfPublication ? parseInt(yearOfPublication) : undefined,
      monthOfPublication: monthOfPublication ? parseInt(monthOfPublication) : undefined,
      pageCount: pageCount ? parseInt(pageCount) : undefined,
      featured: featured === "true" || featured === true,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(",").map((t) => t.trim()).filter(Boolean)) : [],
      fileUrl: fileResult.secure_url,
      fileCloudinaryId: fileResult.public_id,
      fileSizeBytes: fileResult.bytes,
      fileSize: fmtSize(fileResult.bytes),
      fileFormat: fileExt,
      coverImageUrl: coverResult?.secure_url,
      coverImageCloudinaryId: coverResult?.public_id,
      uploadedBy: req.user._id,
    });

    sendPublicationNotifications(publication).catch((err) =>
      logger.error("Publication email notification failed:", err)
    );

    return created(res, "Publication created successfully", { publication });
  } catch (err) {
    logger.error("Create publication error:", err);
    return error(res, err.message || "Failed to create publication");
  }
};

export const updatePublication = async (req, res) => {
  try {
    const pub = await Publication.findById(req.params.id);
    if (!pub) return notFound(res, "Publication not found");

    const pubFile = req.files?.file?.[0];
    const coverFile = req.files?.coverImage?.[0];

    if (pubFile && pubFile.size > MAX_PUB_BYTES) {
      return badRequest(res, `File too large. Maximum allowed size is ${MAX_PUB_BYTES / (1024 * 1024)}MB`);
    }
    if (coverFile && coverFile.size > MAX_COVER_BYTES) {
      return badRequest(res, `Cover image too large. Maximum allowed size is ${MAX_COVER_BYTES / (1024 * 1024)}MB`);
    }

    const allowed = ["title", "description", "category", "author", "yearOfPublication",
      "monthOfPublication", "pageCount", "featured", "tags"];
    const updates = {};
    allowed.forEach((f) => {
      if (req.body[f] !== undefined) updates[f] = req.body[f];
    });
    if (updates.yearOfPublication) updates.yearOfPublication = parseInt(updates.yearOfPublication) || undefined;
    if (updates.monthOfPublication) updates.monthOfPublication = parseInt(updates.monthOfPublication) || undefined;
    if (updates.pageCount) updates.pageCount = parseInt(updates.pageCount) || undefined;
    if (updates.featured !== undefined) updates.featured = updates.featured === "true" || updates.featured === true;
    if (updates.tags && !Array.isArray(updates.tags)) {
      updates.tags = updates.tags.split(",").map((t) => t.trim()).filter(Boolean);
    }

    if (pubFile) {
      await deleteFromCloudinary(pub.fileCloudinaryId, "raw").catch(() => {});
      const fileExt = pubFile.originalname.split(".").pop()?.toLowerCase() || "pdf";
      const fileResult = await uploadToCloudinary(pubFile.buffer, {
        folder: "nssec/publications/files",
        resource_type: "raw",
        format: fileExt,
      });
      updates.fileUrl = fileResult.secure_url;
      updates.fileCloudinaryId = fileResult.public_id;
      updates.fileSizeBytes = fileResult.bytes;
      updates.fileSize = fmtSize(fileResult.bytes);
      updates.fileFormat = fileExt;
    }

    if (coverFile) {
      if (pub.coverImageCloudinaryId) {
        await deleteFromCloudinary(pub.coverImageCloudinaryId, "image").catch(() => {});
      }
      const coverResult = await uploadToCloudinary(coverFile.buffer, {
        folder: "nssec/publications/covers",
        resource_type: "image",
        quality: "auto:good",
        fetch_format: "auto",
      });
      updates.coverImageUrl = coverResult.secure_url;
      updates.coverImageCloudinaryId = coverResult.public_id;
    }

    const publication = await Publication.findByIdAndUpdate(req.params.id, updates, { new: true });
    return success(res, "Publication updated", { publication });
  } catch (err) {
    logger.error("Update publication error:", err);
    return error(res);
  }
};

export const deletePublication = async (req, res) => {
  try {
    const pub = await Publication.findById(req.params.id);
    if (!pub) return notFound(res, "Publication not found");

    await Promise.allSettled([
      deleteFromCloudinary(pub.fileCloudinaryId, "raw"),
      pub.coverImageCloudinaryId
        ? deleteFromCloudinary(pub.coverImageCloudinaryId, "image")
        : Promise.resolve(),
    ]);

    await pub.deleteOne();
    return success(res, "Publication deleted");
  } catch (err) {
    logger.error("Delete publication error:", err);
    return error(res);
  }
};

export const getPublicationStats = async (_req, res) => {
  try {
    const [total, byCategory] = await Promise.all([
      Publication.countDocuments(),
      Publication.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
    ]);
    return success(res, "Stats retrieved", { total, byCategory });
  } catch (err) {
    return error(res);
  }
};
