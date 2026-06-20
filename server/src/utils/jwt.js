import jwt from "jsonwebtoken";

export const generateAccessToken = (payload) =>
  jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m",
  });

export const generateRefreshToken = (payload) =>
  jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES || "7d",
  });

export const verifyAccessToken = (token) =>
  jwt.verify(token, process.env.JWT_ACCESS_SECRET);

export const verifyRefreshToken = (token) =>
  jwt.verify(token, process.env.JWT_REFRESH_SECRET);

export const generatePasswordResetToken = (payload) =>
  jwt.sign(payload, process.env.JWT_ACCESS_SECRET + "_reset", { expiresIn: "1h" });

export const verifyPasswordResetToken = (token) =>
  jwt.verify(token, process.env.JWT_ACCESS_SECRET + "_reset");

export const generateMfaSessionToken = (payload) =>
  jwt.sign(payload, process.env.JWT_ACCESS_SECRET + "_mfa", { expiresIn: "10m" });

export const verifyMfaSessionToken = (token) =>
  jwt.verify(token, process.env.JWT_ACCESS_SECRET + "_mfa");
