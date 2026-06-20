import { Resend } from "resend";
import logger from "../utils/logger.js";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html, replyTo }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "NSSEC <noreply@nssec.gov.ng>",
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      reply_to: replyTo || process.env.EMAIL_REPLY_TO,
    });

    if (error) throw new Error(error.message);
    logger.info(`Email sent to ${to}: ${subject}`);
    return data;
  } catch (err) {
    logger.error(`Email send failed: ${err.message}`);
    throw err;
  }
};
