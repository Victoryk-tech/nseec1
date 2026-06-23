import { body, param } from "express-validator";

export const createUserValidator = [
  body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
  body("role")
    .isIn(["superAdmin", "admin", "editor", "viewer"])
    .withMessage("Invalid role"),
  body("department").optional().trim().isLength({ max: 100 }),
  body("phone").optional().trim().isMobilePhone().withMessage("Invalid phone number"),
];

export const updateUserValidator = [
  param("id").isMongoId().withMessage("Invalid user ID"),
  body("name").optional().trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  body("role").optional().isIn(["superAdmin", "admin", "editor", "viewer"]).withMessage("Invalid role"),
  body("department").optional().trim().isLength({ max: 100 }),
  body("phone").optional().trim().isMobilePhone().withMessage("Invalid phone number"),
  body("isActive").optional().isBoolean(),
];
