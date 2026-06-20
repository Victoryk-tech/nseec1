import { body, param, query } from "express-validator";

export const updateMediaValidator = [
  param("id").isMongoId().withMessage("Invalid media ID"),
  body("title").optional().trim().isLength({ min: 1, max: 200 }),
  body("description").optional().trim().isLength({ max: 1000 }),
  body("alt").optional().trim().isLength({ max: 200 }),
  body("tags").optional().isArray(),
  body("isPublic").optional().isBoolean(),
];

export const listMediaValidator = [
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1, max: 100 }),
  query("type").optional().isIn(["image", "video", "document", "audio"]),
  query("search").optional().trim(),
];
