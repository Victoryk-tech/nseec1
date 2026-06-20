import { Router } from "express";
import {
  login, refresh, logout,
  forgotPassword, resetPassword,
  getMe, changePassword,
  sendMfaCode, verifyMfa,
} from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.js";
import { authLimiter, passwordResetLimiter } from "../middleware/rateLimiter.js";
import { loginValidator, forgotPasswordValidator, resetPasswordValidator, changePasswordValidator } from "../validators/authValidator.js";
import { validate } from "../utils/validate.js";

const router = Router();

router.post("/login", authLimiter, loginValidator, validate, login);
router.post("/mfa/send", sendMfaCode);
router.post("/mfa/verify", verifyMfa);
router.post("/refresh", refresh);
router.post("/logout", authenticate, logout);
router.post("/forgot-password", passwordResetLimiter, forgotPasswordValidator, validate, forgotPassword);
router.post("/reset-password", resetPasswordValidator, validate, resetPassword);
router.get("/me", authenticate, getMe);
router.patch("/change-password", authenticate, changePasswordValidator, validate, changePassword);

export default router;
