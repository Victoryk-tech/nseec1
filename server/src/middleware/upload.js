import multer from "multer";
import { badRequest } from "../utils/response.js";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const ALLOWED_TYPES = {
  image: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"],
  video: ["video/mp4", "video/webm", "video/mpeg", "video/quicktime"],
  document: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ],
  audio: ["audio/mpeg", "audio/wav", "audio/ogg"],
};

const ALL_ALLOWED = Object.values(ALLOWED_TYPES).flat();

const storage = multer.memoryStorage();

const fileFilter = (allowedMimes) => (req, file, cb) => {
  const mimes = allowedMimes || ALL_ALLOWED;
  if (mimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`File type ${file.mimetype} not allowed`), false);
  }
};

export const uploadSingle = (fieldName = "file", allowedMimes) =>
  multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: fileFilter(allowedMimes),
  }).single(fieldName);

export const uploadMultiple = (fieldName = "files", maxCount = 10, allowedMimes) =>
  multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: fileFilter(allowedMimes),
  }).array(fieldName, maxCount);

export const uploadFields = (fields, allowedMimes) =>
  multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: fileFilter(allowedMimes),
  }).fields(fields);

export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return badRequest(res, "File too large. Maximum size is 50MB");
    }
    return badRequest(res, err.message);
  }
  if (err?.message?.includes("not allowed")) {
    return badRequest(res, err.message);
  }
  next(err);
};
