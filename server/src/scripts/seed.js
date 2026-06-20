import "dotenv/config";
import mongoose from "mongoose";
import User from "../models/User.js";
import connectDB from "../config/db.js";
import logger from "../utils/logger.js";

const seed = async () => {
  await connectDB();

  const email = process.env.SEED_SUPER_ADMIN_EMAIL;
  const password = process.env.SEED_SUPER_ADMIN_PASSWORD;
  const name = process.env.SEED_SUPER_ADMIN_NAME || "Super Admin";

  if (!email || !password) {
    logger.error("SEED_SUPER_ADMIN_EMAIL and SEED_SUPER_ADMIN_PASSWORD must be set in .env");
    process.exit(1);
  }

  const existing = await User.findOne({ email });
  if (existing) {
    logger.info(`SuperAdmin already exists: ${email}`);
    await mongoose.disconnect();
    return;
  }

  await User.create({ name, email, password, role: "superAdmin" });
  logger.info(`SuperAdmin created: ${email}`);
  await mongoose.disconnect();
};

seed().catch((err) => {
  logger.error("Seed failed:", err);
  process.exit(1);
});
