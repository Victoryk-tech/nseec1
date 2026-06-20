import { validationResult } from "express-validator";
import { badRequest } from "./response.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((e) => e.msg);
    return badRequest(res, messages[0], { errors: errors.array() });
  }
  next();
};
