import { body, param, query } from "express-validator";

export const addSubscriberValidator = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
  body("name").optional().trim().isLength({ min: 2, max: 100 }),
  body("source").optional().trim().isLength({ max: 50 }),
];

export const updateSubscriberValidator = [
  param("id").isMongoId().withMessage("Invalid subscriber ID"),
  body("status")
    .optional()
    .isIn(["active", "unsubscribed", "bounced", "pending"])
    .withMessage("Invalid status"),
  body("tags").optional().isArray(),
  body("notes").optional().trim().isLength({ max: 500 }),
];

export const listSubscribersValidator = [
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1, max: 100 }),
  query("status").optional().isIn(["active", "unsubscribed", "bounced", "pending"]),
  query("search").optional().trim(),
];
