import { Router } from "express";
import { getAuditLogs, getAuditStats, getUserActivity } from "../controllers/auditController.js";
import { authenticate, requireRole } from "../middleware/auth.js";

const router = Router();
router.use(authenticate, requireRole("superAdmin"));

router.get("/", getAuditLogs);
router.get("/stats", getAuditStats);
router.get("/user/:userId", getUserActivity);

export default router;
