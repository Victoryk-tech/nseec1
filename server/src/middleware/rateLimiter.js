import rateLimit from "express-rate-limit";

const createLimiter = (windowMs, max, message) =>
  rateLimit({
    windowMs,
    max,
    message: { success: false, message },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
  });

export const authLimiter = createLimiter(
  15 * 60 * 1000,
  10,
  "Too many authentication attempts. Please try again in 15 minutes."
);

export const passwordResetLimiter = createLimiter(
  60 * 60 * 1000,
  5,
  "Too many password reset requests. Please try again in 1 hour."
);

export const apiLimiter = createLimiter(
  60 * 1000,
  100,
  "Too many requests. Please slow down."
);

export const uploadLimiter = createLimiter(
  60 * 1000,
  20,
  "Too many uploads. Please wait before uploading again."
);
