import { emailLayout } from "../templates/layout.js";
import { sendEmail } from "../../config/gmail.js";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "nssecdata2025@gmail.com";
const SITE_URL = process.env.CLIENT_URL || "https://nssec.gov.ng";

export const sendMandEConfirmationEmail = async ({ schoolName, schoolEmail, submissionId, submissionType }) => {
  if (!schoolEmail) return;

  const html = emailLayout({
    title: "M&E Form Submission Confirmed — NSSEC",
    preheader: `Your M&E submission for ${schoolName} has been received by NSSEC`,
    content: `
      <div style="background:linear-gradient(135deg,#0e4f6b,#082c2c);color:#fff;padding:14px 22px;border-radius:8px 8px 0 0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">
        Educational Quality Assurance Department &nbsp;&bull;&nbsp; M&amp;E Submission
      </div>
      <div style="border:1px solid #24c2c2;border-top:none;border-radius:0 0 8px 8px;padding:28px 24px;margin-bottom:24px;background:#f0fdfc;">
        <h2 style="font-size:20px;font-weight:700;color:#082c2c;margin-bottom:8px;">Submission Received</h2>
        <p style="font-size:15px;color:#4a5568;margin:0;">Your monitoring and evaluation ${submissionType === "pdf" ? "document" : "form"} for <strong>${schoolName}</strong> has been received.</p>
      </div>

      <p class="text">
        Thank you for submitting the NSSEC Instrument for Monitoring and Evaluation of Schools.
        The Educational Quality Assurance Department will review your submission and may contact you for follow-up.
      </p>

      <div class="info-box">
        <p><strong>School:</strong> ${schoolName}</p>
        <p style="margin-top:6px;"><strong>Submission ID:</strong> ${submissionId}</p>
        <p style="margin-top:6px;"><strong>Type:</strong> ${submissionType === "pdf" ? "PDF Upload" : "Online Web Form"}</p>
      </div>

      <p class="text">
        Please keep your Submission ID for reference. If you have questions, contact the Educational Quality Assurance Department at
        <a href="mailto:${ADMIN_EMAIL}" style="color:#24c2c2;">${ADMIN_EMAIL}</a>.
      </p>

      <div class="btn-wrap">
        <a href="${SITE_URL}/departments/quality-assurance/monitoring-evaluation" class="btn">View M&amp;E Page</a>
      </div>

      <div class="divider"></div>
      <p class="small-text">
        This is an automated confirmation from the National Secondary Education Commission.
        Do not reply to this email. For assistance, contact <a href="mailto:${ADMIN_EMAIL}" style="color:#24c2c2;">${ADMIN_EMAIL}</a>.
      </p>
    `,
    footerText: `<a href="${SITE_URL}">nssec.gov.ng</a> &mdash; Educational Quality Assurance Department`,
  });

  await sendEmail({
    to: schoolEmail,
    subject: `M&E Submission Confirmed — ${schoolName} | NSSEC`,
    html,
    replyTo: ADMIN_EMAIL,
  });
};

export const sendMandEAdminNotification = async ({ schoolName, schoolEmail, state, submissionType, submissionId }) => {
  const html = emailLayout({
    title: "New M&E Submission — NSSEC Admin",
    preheader: `New M&E submission received from ${schoolName}, ${state}`,
    content: `
      <h2 class="title">New M&amp;E Submission</h2>
      <p class="text">A new Monitoring and Evaluation form has been submitted.</p>

      <div class="info-box">
        <p><strong>School:</strong> ${schoolName}</p>
        ${state ? `<p style="margin-top:6px;"><strong>State:</strong> ${state}</p>` : ""}
        ${schoolEmail ? `<p style="margin-top:6px;"><strong>School Email:</strong> ${schoolEmail}</p>` : ""}
        <p style="margin-top:6px;"><strong>Submission ID:</strong> ${submissionId}</p>
        <p style="margin-top:6px;"><strong>Type:</strong> ${submissionType === "pdf" ? "PDF Upload" : "Online Web Form"}</p>
      </div>

      <div class="btn-wrap">
        <a href="${SITE_URL}/dashboard/mande" class="btn">Review in Dashboard</a>
      </div>
    `,
    footerText: `NSSEC Admin &mdash; <a href="${SITE_URL}">nssec.gov.ng</a>`,
  });

  await sendEmail({
    to: ADMIN_EMAIL,
    subject: `New M&E Submission — ${schoolName} | NSSEC`,
    html,
  });
};
