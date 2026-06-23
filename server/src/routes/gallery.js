import { Router } from "express";
import {
  getAlbums,
  getAlbumSlugs,
  getAlbum,
  trackView,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  removeImage,
  getGalleryStats,
} from "../controllers/galleryController.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { uploadFields, handleUploadError } from "../middleware/upload.js";
import { uploadLimiter } from "../middleware/rateLimiter.js";
import { auditMiddleware } from "../middleware/audit.js";

const router = Router();

const GALLERY_FIELDS = [
  { name: "images", maxCount: 20 },
  { name: "videos", maxCount: 5 },
];

const galleryUpload = uploadFields(GALLERY_FIELDS);

// Public
router.get("/slugs", getAlbumSlugs);
router.get("/stats", authenticate, authorize("admin"), getGalleryStats);
router.get("/", getAlbums);
router.get("/:slug", getAlbum);
router.post("/:slug/view", trackView);

// Admin
router.post(
  "/",
  authenticate,
  authorize("editor"),
  uploadLimiter,
  galleryUpload,
  handleUploadError,
  auditMiddleware("create", "gallery"),
  createAlbum
);

router.patch(
  "/:id",
  authenticate,
  authorize("editor"),
  uploadLimiter,
  galleryUpload,
  handleUploadError,
  auditMiddleware("update", "gallery"),
  updateAlbum
);

router.delete(
  "/:id/images/:cloudinaryId",
  authenticate,
  authorize("editor"),
  auditMiddleware("removeImage", "gallery"),
  removeImage
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  auditMiddleware("delete", "gallery"),
  deleteAlbum
);

export default router;
