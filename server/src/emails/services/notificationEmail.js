import { emailLayout } from "../templates/layout.js";
import { sendEmail } from "../../config/resend.js";

export const sendAdminNotification = async ({ to, subject, title, message, details = [], actionUrl, actionLabel = "View Details" }) => {
  const detailRows = details.map(
    (d) => `<tr><td style="padding:8px 0;font-size:14px;color:#4a5568;border-bottom:1px solid #edf2f7;"><strong>${d.label}:</strong></td><td style="padding:8px 0 8px 12px;font-size:14px;color:#2d3748;">${d.value}</td></tr>`
  ).join("");

  const html = emailLayout({
    title,
    preheader: message,
    content: `
      <h1 class="title">${title}</h1>
      <p class="text">${message}</p>
      ${details.length ? `
        <div class="divider"></div>
        <table style="width:100%;border-collapse:collapse;">${detailRows}</table>
      ` : ""}
      ${actionUrl ? `
        <div class="btn-wrap" style="margin-top:28px;">
          <a href="${actionUrl}" class="btn">${actionLabel}</a>
        </div>
      ` : ""}
    `,
  });

  return sendEmail({ to, subject, html });
};

export const sendNewContactNotification = async ({ to, contact }) => {
  return sendAdminNotification({
    to,
    subject: `New Contact Message: ${contact.subject}`,
    title: "New Contact Form Submission",
    message: "A new message was submitted through the NSSEC contact form.",
    details: [
      { label: "Name", value: contact.name },
      { label: "Email", value: contact.email },
      { label: "Subject", value: contact.subject },
      { label: "Message", value: contact.message?.slice(0, 200) + (contact.message?.length > 200 ? "..." : "") },
    ],
    actionUrl: `${process.env.DASHBOARD_URL}/dashboard/contacts`,
    actionLabel: "View in Dashboard",
  });
};

export const sendNewSubscriberNotification = async ({ to, subscriber }) => {
  return sendAdminNotification({
    to,
    subject: "New Newsletter Subscriber",
    title: "New Subscriber",
    message: "Someone just subscribed to the NSSEC newsletter.",
    details: [
      { label: "Name", value: subscriber.name || "Not provided" },
      { label: "Email", value: subscriber.email },
      { label: "Source", value: subscriber.source || "Website" },
    ],
    actionUrl: `${process.env.DASHBOARD_URL}/dashboard/subscribers`,
    actionLabel: "View Subscribers",
  });
};

export const sendSecurityAlertEmail = async ({ to, name, action, ipAddress, userAgent }) => {
  const html = emailLayout({
    title: "Security Alert",
    preheader: `Security event detected on your NSSEC account.`,
    content: `
      <h1 class="title">Security Alert</h1>
      <p class="text">Hi ${name || "there"}, a security event was detected on your NSSEC Dashboard account.</p>
      <div class="warning-box">
        <p><strong>Action:</strong> ${action}<br/>
        <strong>IP Address:</strong> ${ipAddress || "Unknown"}<br/>
        <strong>Device:</strong> ${userAgent?.substring(0, 80) || "Unknown"}</p>
      </div>
      <p class="text">If this was you, no action is needed. If not, please change your password immediately and contact your administrator.</p>
    `,
  });

  return sendEmail({ to, subject: "NSSEC Dashboard Security Alert", html });
};
