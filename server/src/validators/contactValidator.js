import { body, param } from "express-validator";

export const submitContactValidator = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Full name must be at least 2 characters"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("A valid email address is required"),
  body("subject")
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Subject must be at least 3 characters"),
  body("message")
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage("Message must be at least 10 characters"),
];

export const updateContactValidator = [
  param("id").isMongoId().withMessage("Invalid contact ID"),
  body("status")
    .optional()
    .isIn(["new", "read", "replied", "archived"])
    .withMessage("Invalid status"),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority"),
  body("notes").optional().trim().isLength({ max: 1000 }),
  body("assignedTo").optional().isMongoId(),
];

export const replyContactValidator = [
  param("id").isMongoId().withMessage("Invalid contact ID"),
  body("message")
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage("Reply must be 10-5000 characters"),
];
