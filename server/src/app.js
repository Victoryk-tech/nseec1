import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { apiLimiter } from "./middleware/rateLimiter.js";
import { error } from "./utils/response.js";
import logger from "./utils/logger.js";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import subscriberRoutes from "./routes/subscribers.js";
import contactRoutes from "./routes/contacts.js";
import mediaRoutes from "./routes/media.js";
import auditRoutes from "./routes/audit.js";
import dashboardRoutes from "./routes/dashboard.js";
import notificationRoutes from "./routes/notifications.js";
import publicationRoutes from "./routes/publications.js";

const app = express();

// Security
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(",") || ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Body + cookies
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(compression());

// Logging
app.use(morgan("combined", { stream: { write: (msg) => logger.http(msg.trim()) } }));

// Rate limit all API routes
app.use("/api", apiLimiter);

// Health check
app.get("/health", (_req, res) => res.json({ status: "ok", env: process.env.NODE_ENV, timestamp: new Date().toISOString() }));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/subscribers", subscriberRoutes);
app.use("/api/v1/contacts", contactRoutes);
app.use("/api/v1/media", mediaRoutes);
app.use("/api/v1/audit", auditRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/publications", publicationRoutes);

// 404
app.use((_req, res) => res.status(404).json({ success: false, message: "Route not found" }));

// Global error handler
app.use((err, _req, res, _next) => {
  logger.error("Unhandled error:", err);
  return error(res, err.message || "Internal server error");
});

export default app;
