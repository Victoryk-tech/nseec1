import { Router } from "express";
import { getMedia, getMediaItem, uploadMedia, updateMedia, deleteMedia, getMediaStats } from "../controllers/mediaController.js";
import { authenticate, requireRole } from "../middleware/auth.js";
import { auditMiddleware } from "../middleware/audit.js";
import { uploadSingle, handleUploadError } from "../middleware/upload.js";
import { uploadLimiter } from "../middleware/rateLimiter.js";
import { updateMediaValidator } from "../validators/mediaValidator.js";
import { validate } from "../utils/validate.js";

const router = Router();
router.use(authenticate);

router.get("/", requireRole("superAdmin", "admin", "editor", "viewer"), getMedia);
router.get("/stats", requireRole("superAdmin", "admin"), getMediaStats);
router.get("/:id", requireRole("superAdmin", "admin", "editor", "viewer"), getMediaItem);
router.post("/upload", requireRole("superAdmin", "admin", "editor"), uploadLimiter, uploadSingle("file"), handleUploadError, auditMiddleware("UPLOAD", "media"), uploadMedia);
router.patch("/:id", requireRole("superAdmin", "admin", "editor"), updateMediaValidator, validate, auditMiddleware("UPDATE", "media"), updateMedia);
router.delete("/:id", requireRole("superAdmin", "admin"), auditMiddleware("DELETE", "media"), deleteMedia);

export default router;
