import { Router } from "express";
import { authenticate, requireRole } from "../middleware/auth.js";
import { uploadSingle, handleUploadError } from "../middleware/upload.js";
import {
  submitWebForm,
  submitPdf,
  listSubmissions,
  getSubmission,
  updateSubmissionStatus,
} from "../controllers/mandEController.js";

const router = Router();

// Public routes
router.post("/submit", submitWebForm);
router.post(
  "/submit-pdf",
  uploadSingle("pdf", ["application/pdf"]),
  handleUploadError,
  submitPdf
);

// Admin routes
router.use(authenticate);
router.get("/", requireRole("superAdmin", "admin", "editor", "viewer"), listSubmissions);
router.get("/:id", requireRole("superAdmin", "admin", "editor", "viewer"), getSubmission);
router.patch("/:id/status", requireRole("superAdmin", "admin"), updateSubmissionStatus);

export default router;
