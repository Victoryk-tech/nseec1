import Media from "../models/Media.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";
import { success, created, error, notFound, badRequest } from "../utils/response.js";
import { paginate, paginatedResponse } from "../utils/pagination.js";
import logger from "../utils/logger.js";

const TYPE_MAP = {
  "image/jpeg": "image", "image/png": "image", "image/webp": "image", "image/gif": "image",
  "video/mp4": "video", "video/webm": "video", "video/mpeg": "video",
  "application/pdf": "document",
  "audio/mpeg": "audio", "audio/wav": "audio",
};

export const getMedia = async (req, res) => {
  try {
    const { page, limit, skip } = paginate(req.query);
    const filter = {};
    if (req.query.type) filter.type = req.query.type;
    if (req.query.isPublic !== undefined) filter.isPublic = req.query.isPublic === "true";
    if (req.query.search) {
      const re = new RegExp(req.query.search, "i");
      filter.$or = [{ title: re }, { tags: re }, { description: re }];
    }

    const [data, total] = await Promise.all([
      Media.find(filter)
        .populate("uploadedBy", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Media.countDocuments(filter),
    ]);

    return success(res, "Media retrieved", paginatedResponse(data, total, page, limit));
  } catch (err) {
    logger.error("Get media error:", err);
    return error(res);
  }
};

export const getMediaItem = async (req, res) => {
  try {
    const item = await Media.findById(req.params.id).populate("uploadedBy", "name email");
    if (!item) return notFound(res, "Media not found");
    return success(res, "Media retrieved", { media: item });
  } catch (err) {
    return error(res);
  }
};

export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) return badRequest(res, "No file uploaded");
    const { title, description, alt, tags, folder = "nssec/media" } = req.body;
    const type = TYPE_MAP[req.file.mimetype] || "document";

    const resourceType = type === "video" ? "video" : type === "audio" ? "video" : "image";
    const isRaw = type === "document";

    const result = await uploadToCloudinary(req.file.buffer, {
      folder,
      resource_type: isRaw ? "raw" : resourceType,
    });

    const media = await Media.create({
      title: title || req.file.originalname,
      description,
      type,
      cloudinaryId: result.public_id,
      url: result.url,
      secureUrl: result.secure_url,
      format: result.format,
      size: result.bytes,
      width: result.width,
      height: result.height,
      duration: result.duration,
      folder,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(",").map((t) => t.trim())) : [],
      alt,
      uploadedBy: req.user._id,
    });

    return created(res, "File uploaded successfully", { media });
  } catch (err) {
    logger.error("Upload media error:", err);
    return error(res);
  }
};

export const updateMedia = async (req, res) => {
  try {
    const allowed = ["title", "description", "alt", "tags", "isPublic"];
    const updates = {};
    allowed.forEach((f) => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });

    const media = await Media.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!media) return notFound(res, "Media not found");
    return success(res, "Media updated", { media });
  } catch (err) {
    return error(res);
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return notFound(res, "Media not found");

    await deleteFromCloudinary(media.cloudinaryId).catch(() => {});
    await media.deleteOne();

    return success(res, "Media deleted");
  } catch (err) {
    logger.error("Delete media error:", err);
    return error(res);
  }
};

export const getMediaStats = async (req, res) => {
  try {
    const [total, images, videos, documents, audio] = await Promise.all([
      Media.countDocuments(),
      Media.countDocuments({ type: "image" }),
      Media.countDocuments({ type: "video" }),
      Media.countDocuments({ type: "document" }),
      Media.countDocuments({ type: "audio" }),
    ]);
    return success(res, "Media stats", { total, images, videos, documents, audio });
  } catch (err) {
    return error(res);
  }
};
