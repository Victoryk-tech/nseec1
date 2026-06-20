import { Router } from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { authenticate, requireRole } from "../middleware/auth.js";

const router = Router();
router.use(authenticate, requireRole("superAdmin", "admin", "editor", "viewer"));
router.get("/stats", getDashboardStats);

export default router;
