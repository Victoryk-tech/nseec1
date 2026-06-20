import { Router } from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser, uploadAvatar } from "../controllers/userController.js";
import { authenticate, requireRole } from "../middleware/auth.js";
import { auditMiddleware } from "../middleware/audit.js";
import { uploadSingle, handleUploadError } from "../middleware/upload.js";
import { createUserValidator, updateUserValidator } from "../validators/userValidator.js";
import { validate } from "../utils/validate.js";

const router = Router();
router.use(authenticate);

router.get("/", requireRole("superAdmin", "admin"), auditMiddleware("READ", "users"), getUsers);
router.get("/:id", requireRole("superAdmin", "admin"), getUser);
router.post("/", requireRole("superAdmin", "admin"), createUserValidator, validate, auditMiddleware("CREATE", "users"), createUser);
router.patch("/:id", requireRole("superAdmin", "admin"), updateUserValidator, validate, auditMiddleware("UPDATE", "users"), updateUser);
router.delete("/:id", requireRole("superAdmin"), auditMiddleware("DELETE", "users"), deleteUser);
router.post("/me/avatar", uploadSingle("avatar"), handleUploadError, auditMiddleware("UPLOAD", "avatar"), uploadAvatar);

export default router;
