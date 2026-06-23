// import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import compression from "compression";
// import cookieParser from "cookie-parser";
// import morgan from "morgan";
// import { apiLimiter } from "./middleware/rateLimiter.js";
// import { error } from "./utils/response.js";
// import logger from "./utils/logger.js";

// import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";
// import subscriberRoutes from "./routes/subscribers.js";
// import contactRoutes from "./routes/contacts.js";
// import mediaRoutes from "./routes/media.js";
// import auditRoutes from "./routes/audit.js";
// import dashboardRoutes from "./routes/dashboard.js";
// import notificationRoutes from "./routes/notifications.js";
// import publicationRoutes from "./routes/publications.js";
// import galleryRoutes from "./routes/gallery.js";
// import mandERoutes from "./routes/mandE.js";

// const app = express();

// // Security
// app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGINS?.split(",") ||
//       process.env.CORS_ORIGINS2?.split(",") || [
//         "http://localhost:3000",
//         "http://localhost:3001",
//         "https://www.nssec.gov.ng",
//       ],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );

// // Body + cookies
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true, limit: "10mb" }));
// app.use(cookieParser());
// app.use(compression());

// // Logging
// app.use(
//   morgan("combined", { stream: { write: (msg) => logger.http(msg.trim()) } }),
// );

// // Rate limit all API routes
// app.use("/api", apiLimiter);

// // Health check
// app.get("/health", (_req, res) =>
//   res.json({
//     status: "ok",
//     env: process.env.NODE_ENV,
//     timestamp: new Date().toISOString(),
//   }),
// );

// // Routes
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/users", userRoutes);
// app.use("/api/v1/subscribers", subscriberRoutes);
// app.use("/api/v1/contacts", contactRoutes);
// app.use("/api/v1/media", mediaRoutes);
// app.use("/api/v1/audit", auditRoutes);
// app.use("/api/v1/dashboard", dashboardRoutes);
// app.use("/api/v1/notifications", notificationRoutes);
// app.use("/api/v1/publications", publicationRoutes);
// app.use("/api/v1/gallery", galleryRoutes);
// app.use("/api/v1/mande", mandERoutes);

// // 404
// app.use((_req, res) =>
//   res.status(404).json({ success: false, message: "Route not found" }),
// );

// // Global error handler
// app.use((err, _req, res, _next) => {
//   logger.error("Unhandled error:", err);
//   return error(res, err.message || "Internal server error");
// });

// export default app;


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
import galleryRoutes from "./routes/gallery.js";
import mandERoutes from "./routes/mandE.js";

const app = express();

/* -------------------------------------------------------------------------- */
/*                                  SECURITY                                  */
/* -------------------------------------------------------------------------- */

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

// Comma-separated env variable:
// CORS_ORIGINS=https://www.nssec.gov.ng,https://nssec.gov.ng,http://localhost:3000,http://localhost:3001

const allowedOrigins = (
  process.env.CORS_ORIGINS ||
  "https://www.nssec.gov.ng,https://nssec.gov.ng,http://localhost:3000,http://localhost:3001"
)
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin(origin, callback) {
      // Allow Postman, curl, server-to-server
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error("❌ Blocked by CORS:", origin);

      return callback(
        new Error(`Origin ${origin} is not allowed by CORS`)
      );
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// Handle preflight requests
app.options("*", cors());

/* -------------------------------------------------------------------------- */
/*                              BODY + COOKIES                                */
/* -------------------------------------------------------------------------- */

app.use(express.json({ limit: "10mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

app.use(cookieParser());

app.use(compression());

/* -------------------------------------------------------------------------- */
/*                                  LOGGING                                   */
/* -------------------------------------------------------------------------- */

app.use(
  morgan("combined", {
    stream: {
      write: (msg) => logger.http(msg.trim()),
    },
  })
);

/* -------------------------------------------------------------------------- */
/*                               RATE LIMITING                                */
/* -------------------------------------------------------------------------- */

app.use("/api", apiLimiter);

/* -------------------------------------------------------------------------- */
/*                               HEALTH CHECK                                 */
/* -------------------------------------------------------------------------- */

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    allowedOrigins,
  });
});

/* -------------------------------------------------------------------------- */
/*                                   ROUTES                                   */
/* -------------------------------------------------------------------------- */

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/subscribers", subscriberRoutes);

app.use("/api/v1/contacts", contactRoutes);

app.use("/api/v1/media", mediaRoutes);

app.use("/api/v1/audit", auditRoutes);

app.use("/api/v1/dashboard", dashboardRoutes);

app.use("/api/v1/notifications", notificationRoutes);

app.use("/api/v1/publications", publicationRoutes);

app.use("/api/v1/gallery", galleryRoutes);

app.use("/api/v1/mande", mandERoutes);

/* -------------------------------------------------------------------------- */
/*                              ROOT API ROUTE                                */
/* -------------------------------------------------------------------------- */

app.get("/api/v1", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "NSSEC Dashboard API is running",
    version: "v1",
    timestamp: new Date().toISOString(),
  });
});

/* -------------------------------------------------------------------------- */
/*                                    404                                     */
/* -------------------------------------------------------------------------- */

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* -------------------------------------------------------------------------- */
/*                            GLOBAL ERROR HANDLER                            */
/* -------------------------------------------------------------------------- */

app.use((err, _req, res, _next) => {
  logger.error("Unhandled error:", err);

  return error(
    res,
    err.message || "Internal server error"
  );
});

export default app;