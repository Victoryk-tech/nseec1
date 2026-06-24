import { emailLayout } from "../templates/layout.js";
import { sendEmail } from "../../config/gmail.js";

export const sendSubscriberWelcomeEmail = async ({ name, email, unsubscribeUrl }) => {
  const html = emailLayout({
    title: "Thanks for subscribing to NSSEC",
    preheader: "You're now subscribed to NSSEC updates and news.",
    content: `
      <h1 class="title">Welcome${name ? `, ${name}` : ""}!</h1>
      <p class="text">Thank you for subscribing to the National Secondary Education Commission newsletter. You'll receive updates on our programmes, publications, research, and news.</p>
      <div class="info-box">
        <p>As a subscriber, you'll be among the first to receive:</p>
        <ul style="margin-top:8px;padding-left:20px;font-size:14px;color:#4a5568;line-height:2;">
          <li>Policy updates and education news</li>
          <li>New publications and research reports</li>
          <li>Programme announcements and events</li>
          <li>Statistics and education data releases</li>
        </ul>
      </div>
      <div class="btn-wrap">
        <a href="${process.env.CLIENT_URL || "https://nssec.gov.ng"}" class="btn">Visit NSSEC Website</a>
      </div>
      <div class="divider"></div>
      <p class="small-text">
        You can <a href="${unsubscribeUrl}" style="color:#24c2c2;">unsubscribe at any time</a> if you no longer wish to receive our updates.
      </p>
    `,
    footerText: `You subscribed at <a href="${process.env.CLIENT_URL || "https://nssec.gov.ng"}">nssec.gov.ng</a>`,
  });

  return sendEmail({ to: email, subject: "Welcome to NSSEC Updates", html });
};

export const sendUnsubscribeConfirmationEmail = async ({ name, email }) => {
  const html = emailLayout({
    title: "You've been unsubscribed",
    preheader: "You have been removed from the NSSEC mailing list.",
    content: `
      <h1 class="title">You've been unsubscribed</h1>
      <p class="text">Hi ${name || "there"}, you have been successfully removed from the NSSEC newsletter.</p>
      <p class="text">We're sorry to see you go. If this was a mistake, you can re-subscribe at any time on our website.</p>
      <div class="btn-wrap">
        <a href="${process.env.CLIENT_URL || "https://nssec.gov.ng"}" class="btn-outline">Re-subscribe</a>
      </div>
    `,
  });

  return sendEmail({ to: email, subject: "You've been unsubscribed from NSSEC", html });
};
