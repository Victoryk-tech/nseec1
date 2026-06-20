import { Router } from "express";
import { getContacts, getContact, updateContact, replyToContact, deleteContact, getContactStats, submitContact } from "../controllers/contactController.js";
import { authenticate, requireRole } from "../middleware/auth.js";
import { auditMiddleware } from "../middleware/audit.js";
import { submitContactValidator, updateContactValidator, replyContactValidator } from "../validators/contactValidator.js";
import { validate } from "../utils/validate.js";

const router = Router();

// Public — website contact form
router.post("/submit", submitContactValidator, validate, submitContact);

router.use(authenticate);

router.get("/", requireRole("superAdmin", "admin", "editor", "viewer"), getContacts);
router.get("/stats", requireRole("superAdmin", "admin"), getContactStats);
router.get("/:id", requireRole("superAdmin", "admin", "editor", "viewer"), auditMiddleware("READ", "contact"), getContact);
router.patch("/:id", requireRole("superAdmin", "admin", "editor"), updateContactValidator, validate, auditMiddleware("UPDATE", "contact"), updateContact);
router.post("/:id/reply", requireRole("superAdmin", "admin", "editor"), replyContactValidator, validate, auditMiddleware("STATUS_CHANGE", "contact"), replyToContact);
router.delete("/:id", requireRole("superAdmin", "admin"), auditMiddleware("DELETE", "contact"), deleteContact);

export default router;
