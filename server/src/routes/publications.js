import { Router } from "express";
import {
  getPublications, getPublicationSlugs, getPublication,
  createPublication, updatePublication, deletePublication,
  trackView, trackDownload, getPublicationStats,
} from "../controllers/publicationController.js";
import { authenticate, requireRole } from "../middleware/auth.js";
import { auditMiddleware } from "../middleware/audit.js";
import { uploadFields, handleUploadError } from "../middleware/upload.js";
import { uploadLimiter } from "../middleware/rateLimiter.js";

const router = Router();

const PUBLICATION_FIELDS = [
  { name: "file", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
];

const ALLOWED_MIMES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg", "image/png", "image/webp",
];

// ── Public routes ─────────────────────────────────────────────────────────────
router.get("/", getPublications);
router.get("/slugs", getPublicationSlugs);
router.get("/stats", authenticate, requireRole("superAdmin", "admin", "editor", "viewer"), getPublicationStats);
router.get("/:slug", getPublication);
router.post("/:id/view", trackView);
router.post("/:id/download", trackDownload);

// ── Admin routes ──────────────────────────────────────────────────────────────
router.post(
  "/",
  authenticate,
  requireRole("superAdmin", "admin", "editor"),
  uploadLimiter,
  uploadFields(PUBLICATION_FIELDS, ALLOWED_MIMES),
  handleUploadError,
  auditMiddleware("CREATE", "publication"),
  createPublication
);

router.patch(
  "/:id",
  authenticate,
  requireRole("superAdmin", "admin", "editor"),
  uploadLimiter,
  uploadFields(PUBLICATION_FIELDS, ALLOWED_MIMES),
  handleUploadError,
  auditMiddleware("UPDATE", "publication"),
  updatePublication
);

router.delete(
  "/:id",
  authenticate,
  requireRole("superAdmin", "admin"),
  auditMiddleware("DELETE", "publication"),
  deletePublication
);

export default router;
