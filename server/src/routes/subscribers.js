import { Router } from "express";
import {
  getSubscribers, getSubscriber, addSubscriber, updateSubscriber,
  deleteSubscriber, getSubscriberStats, unsubscribeByToken, exportSubscribers,
} from "../controllers/subscriberController.js";
import { authenticate, requireRole } from "../middleware/auth.js";
import { auditMiddleware } from "../middleware/audit.js";
import { addSubscriberValidator, updateSubscriberValidator } from "../validators/subscriberValidator.js";
import { validate } from "../utils/validate.js";

const router = Router();

// Public — website newsletter signup (no auth required)
router.post("/subscribe", addSubscriberValidator, validate, (req, _res, next) => {
  req.body.source = "website";
  next();
}, addSubscriber);

// Public unsubscribe
router.get("/unsubscribe/:token", unsubscribeByToken);

// Protected
router.use(authenticate);
router.get("/", requireRole("superAdmin", "admin", "editor", "viewer"), getSubscribers);
router.get("/stats", requireRole("superAdmin", "admin"), getSubscriberStats);
router.get("/export", requireRole("superAdmin", "admin"), exportSubscribers);
router.get("/:id", requireRole("superAdmin", "admin", "editor"), getSubscriber);
router.post("/", requireRole("superAdmin", "admin"), addSubscriberValidator, validate, auditMiddleware("CREATE", "subscriber"), addSubscriber);
router.patch("/:id", requireRole("superAdmin", "admin"), updateSubscriberValidator, validate, auditMiddleware("UPDATE", "subscriber"), updateSubscriber);
router.delete("/:id", requireRole("superAdmin", "admin"), auditMiddleware("DELETE", "subscriber"), deleteSubscriber);

export default router;
