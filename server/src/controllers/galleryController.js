import Gallery from "../models/Gallery.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";
import { success, created, error, notFound, badRequest } from "../utils/response.js";
import { paginate, paginatedResponse } from "../utils/pagination.js";
import logger from "../utils/logger.js";

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;  // 10 MB per image
const MAX_VIDEO_BYTES = 100 * 1024 * 1024; // 100 MB per video

// ── Public ──────────────────────────────────────────────────────────────────

export const getAlbums = async (req, res) => {
  try {
    const { page, limit, skip } = paginate(req.query);
    const filter = {};
    if (req.query.search) {
      const re = new RegExp(req.query.search, "i");
      filter.$or = [{ title: re }, { description: re }];
    }
    if (req.query.featured === "true") filter.featured = true;

    const [data, total] = await Promise.all([
      Gallery.find(filter)
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-__v")
        .lean(),
      Gallery.countDocuments(filter),
    ]);

    return success(res, "Albums retrieved", paginatedResponse(data, total, page, limit));
  } catch (err) {
    logger.error("Get albums error:", err);
    return error(res);
  }
};

export const getAlbumSlugs = async (_req, res) => {
  try {
    const slugs = await Gallery.find({}).select("slug").lean();
    return success(res, "Slugs retrieved", { slugs: slugs.map((a) => a.slug) });
  } catch (err) {
    return error(res);
  }
};

export const getAlbum = async (req, res) => {
  try {
    const album = await Gallery.findOne({ slug: req.params.slug }).lean();
    if (!album) return notFound(res, "Album not found");
    return success(res, "Album retrieved", { album });
  } catch (err) {
    logger.error("Get album error:", err);
    return error(res);
  }
};

export const trackView = async (req, res) => {
  try {
    await Gallery.findOneAndUpdate({ slug: req.params.slug }, { $inc: { views: 1 } });
    return success(res, "View tracked");
  } catch (err) {
    return error(res);
  }
};

// ── Admin ────────────────────────────────────────────────────────────────────

export const createAlbum = async (req, res) => {
  try {
    const { title, description, hashtags, featured } = req.body;
    if (!title?.trim()) return badRequest(res, "Title is required");

    const imageFiles = req.files?.images || [];
    const videoFiles = req.files?.videos || [];

    if (imageFiles.length === 0 && videoFiles.length === 0) {
      return badRequest(res, "Upload at least one image or video");
    }

    // Validate sizes
    for (const f of imageFiles) {
      if (f.size > MAX_IMAGE_BYTES) return badRequest(res, `Image "${f.originalname}" exceeds 10 MB`);
    }
    for (const f of videoFiles) {
      if (f.size > MAX_VIDEO_BYTES) return badRequest(res, `Video "${f.originalname}" exceeds 100 MB`);
    }

    // Parse captions/altText arrays from body (may be string or array)
    const parseArray = (val) => {
      if (!val) return [];
      return Array.isArray(val) ? val : [val];
    };
    const imageCaptions = parseArray(req.body.imageCaptions);
    const imageAltTexts = parseArray(req.body.imageAltTexts);
    const videoCaptions = parseArray(req.body.videoCaptions);

    // Upload images in parallel
    const imageResults = await Promise.all(
      imageFiles.map((f, i) =>
        uploadToCloudinary(f.buffer, {
          folder: "nssec/gallery",
          resource_type: "image",
          quality: "auto:good",
          fetch_format: "auto",
        }).then((r) => ({
          imageUrl: r.secure_url,
          cloudinaryId: r.public_id,
          caption: imageCaptions[i] || "",
          altText: imageAltTexts[i] || "",
          order: i,
        }))
      )
    );

    // Upload videos in parallel
    const videoResults = await Promise.all(
      videoFiles.map((f, i) =>
        uploadToCloudinary(f.buffer, {
          folder: "nssec/gallery",
          resource_type: "video",
        }).then((r) => ({
          videoUrl: r.secure_url,
          cloudinaryId: r.public_id,
          caption: videoCaptions[i] || "",
        }))
      )
    );

    const album = await Gallery.create({
      title: title.trim(),
      description: description?.trim() || "",
      images: imageResults,
      videos: videoResults,
      hashtags: parseArray(hashtags).map((h) => h.trim().replace(/^#/, "")),
      featured: featured === "true" || featured === true,
      uploadedBy: req.user?._id,
    });

    return created(res, "Album created", { album });
  } catch (err) {
    logger.error("Create album error:", err);
    return error(res, err.message);
  }
};

export const updateAlbum = async (req, res) => {
  try {
    const album = await Gallery.findById(req.params.id);
    if (!album) return notFound(res, "Album not found");

    const { title, description, hashtags, featured } = req.body;
    if (title?.trim()) album.title = title.trim();
    if (description !== undefined) album.description = description.trim();
    if (hashtags !== undefined) {
      const parseArray = (val) => (Array.isArray(val) ? val : [val]);
      album.hashtags = parseArray(hashtags).map((h) => h.trim().replace(/^#/, ""));
    }
    if (featured !== undefined) album.featured = featured === "true" || featured === true;

    const imageFiles = req.files?.images || [];
    const videoFiles = req.files?.videos || [];

    const parseArray = (val) => {
      if (!val) return [];
      return Array.isArray(val) ? val : [val];
    };
    const imageCaptions = parseArray(req.body.imageCaptions);
    const imageAltTexts = parseArray(req.body.imageAltTexts);
    const videoCaptions = parseArray(req.body.videoCaptions);

    if (imageFiles.length > 0) {
      for (const f of imageFiles) {
        if (f.size > MAX_IMAGE_BYTES) return badRequest(res, `Image "${f.originalname}" exceeds 10 MB`);
      }
      const newImages = await Promise.all(
        imageFiles.map((f, i) =>
          uploadToCloudinary(f.buffer, {
            folder: "nssec/gallery",
            resource_type: "image",
            quality: "auto:good",
            fetch_format: "auto",
          }).then((r) => ({
            imageUrl: r.secure_url,
            cloudinaryId: r.public_id,
            caption: imageCaptions[i] || "",
            altText: imageAltTexts[i] || "",
            order: album.images.length + i,
          }))
        )
      );
      album.images.push(...newImages);
    }

    if (videoFiles.length > 0) {
      for (const f of videoFiles) {
        if (f.size > MAX_VIDEO_BYTES) return badRequest(res, `Video "${f.originalname}" exceeds 100 MB`);
      }
      const newVideos = await Promise.all(
        videoFiles.map((f, i) =>
          uploadToCloudinary(f.buffer, {
            folder: "nssec/gallery",
            resource_type: "video",
          }).then((r) => ({
            videoUrl: r.secure_url,
            cloudinaryId: r.public_id,
            caption: videoCaptions[i] || "",
          }))
        )
      );
      album.videos.push(...newVideos);
    }

    await album.save();
    return success(res, "Album updated", { album });
  } catch (err) {
    logger.error("Update album error:", err);
    return error(res, err.message);
  }
};

export const deleteAlbum = async (req, res) => {
  try {
    const album = await Gallery.findById(req.params.id);
    if (!album) return notFound(res, "Album not found");

    // Delete all Cloudinary assets
    const deletions = [
      ...album.images.map((img) => deleteFromCloudinary(img.cloudinaryId, "image")),
      ...album.videos.map((vid) => deleteFromCloudinary(vid.cloudinaryId, "video")),
    ];
    await Promise.allSettled(deletions);
    await album.deleteOne();

    return success(res, "Album deleted");
  } catch (err) {
    logger.error("Delete album error:", err);
    return error(res);
  }
};

export const removeImage = async (req, res) => {
  try {
    const { id, cloudinaryId } = req.params;
    const album = await Gallery.findById(id);
    if (!album) return notFound(res, "Album not found");

    await deleteFromCloudinary(decodeURIComponent(cloudinaryId), "image").catch(() => {});
    album.images = album.images.filter((img) => img.cloudinaryId !== decodeURIComponent(cloudinaryId));
    await album.save();

    return success(res, "Image removed", { album });
  } catch (err) {
    return error(res);
  }
};

export const getGalleryStats = async (_req, res) => {
  try {
    const [total, totalViews] = await Promise.all([
      Gallery.countDocuments(),
      Gallery.aggregate([{ $group: { _id: null, views: { $sum: "$views" } } }]),
    ]);
    const imageCount = await Gallery.aggregate([
      { $project: { count: { $size: "$images" } } },
      { $group: { _id: null, total: { $sum: "$count" } } },
    ]);
    return success(res, "Stats retrieved", {
      totalAlbums: total,
      totalViews: totalViews[0]?.views || 0,
      totalImages: imageCount[0]?.total || 0,
    });
  } catch (err) {
    return error(res);
  }
};
