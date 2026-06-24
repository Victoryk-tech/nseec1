import nodemailer from "nodemailer";
import logger from "../utils/logger.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendEmail = async ({ to, subject, html, replyTo }) => {
  try {
    const info = await transporter.sendMail({
      from: `"NSSEC" <${process.env.GMAIL_USER}>`,
      to: Array.isArray(to) ? to.join(", ") : to,
      subject,
      html,
      replyTo: replyTo || process.env.GMAIL_USER,
    });
    logger.info(`Email sent to ${to}: ${subject}`);
    return info;
  } catch (err) {
    logger.error(`Email send failed: ${err.message}`);
    throw err;
  }
};
