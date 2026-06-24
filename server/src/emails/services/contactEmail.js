import { emailLayout } from "../templates/layout.js";
import { sendEmail } from "../../config/gmail.js";

export const sendContactConfirmationEmail = async ({ name, email, subject }) => {
  const html = emailLayout({
    title: "We received your message",
    preheader: "Thank you for contacting NSSEC. We'll respond shortly.",
    content: `
      <h1 class="title">We received your message</h1>
      <p class="text">Dear ${name}, thank you for reaching out to the National Secondary Education Commission.</p>
      <div class="info-box">
        <p><strong>Subject:</strong> ${subject}<br/>
        We aim to respond to all enquiries within <strong>2–3 business days</strong>.</p>
      </div>
      <p class="text">In the meantime, you can explore our website for information about our programmes, publications, and education data.</p>
      <div class="btn-wrap">
        <a href="${process.env.CLIENT_URL || "https://nssec.gov.ng"}" class="btn">Explore NSSEC</a>
      </div>
      <div class="divider"></div>
      <p class="small-text">If your matter is urgent, please call our office directly.</p>
    `,
    footerText: "This is an automated acknowledgement of your contact form submission.",
  });

  return sendEmail({ to: email, subject: "We received your message — NSSEC", html, replyTo: process.env.EMAIL_REPLY_TO });
};

export const sendContactReplyEmail = async ({ name, email, subject, replyMessage }) => {
  const html = emailLayout({
    title: `Re: ${subject}`,
    preheader: `NSSEC has responded to your enquiry: ${subject}`,
    content: `
      <h1 class="title">Response to Your Enquiry</h1>
      <p class="text">Dear ${name}, here is our response to your enquiry.</p>
      <div class="divider"></div>
      <div class="info-box">
        <p style="white-space:pre-wrap;line-height:1.8;">${replyMessage}</p>
      </div>
      <div class="divider"></div>
      <p class="small-text">This is a reply to your original message with subject: <em>${subject}</em></p>
    `,
    footerText: "Please do not reply directly to this email. Use the contact form on our website.",
  });

  return sendEmail({ to: email, subject: `Re: ${subject} — NSSEC`, html, replyTo: process.env.EMAIL_REPLY_TO });
};
