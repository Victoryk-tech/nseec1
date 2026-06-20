import { emailLayout } from "../templates/layout.js";
import { sendEmail } from "../../config/resend.js";
import Subscriber from "../../models/Subscriber.js";
import Contact from "../../models/Contact.js";
import logger from "../../utils/logger.js";

const CATEGORY_LABELS = {
  reports: "Reports",
  digest: "Digest",
  "research-journals": "Research / Journals",
  "nssec-establishment-act": "Establishment Act",
  "national-policy-sse": "National Policy on SSE",
  "minimum-standards": "Minimum Standards",
  "implementation-guidelines": "Implementation Guidelines",
};

const buildHtml = (publication) => {
  const { title, description, slug, category, author, yearOfPublication } = publication;
  const siteUrl = process.env.CLIENT_URL || "https://nssec.gov.ng";
  const pubUrl = `${siteUrl}/publications/${slug}`;
  const catLabel = CATEGORY_LABELS[category] || category || "Publication";

  return emailLayout({
    title: `New NSSEC Publication: ${title}`,
    preheader: `NSSEC has published a new ${catLabel}: ${title}`,
    content: `
      <h1 class="title">New Publication Available</h1>
      <p class="text">The National Secondary Education Commission has published a new <strong>${catLabel}</strong>.</p>
      <div class="info-box">
        <h2 style="font-size:18px;font-weight:700;color:#082c2c;margin-bottom:8px;line-height:1.3;">${title}</h2>
        ${author || yearOfPublication ? `<p style="font-size:13px;color:#718096;margin-bottom:10px;">${[author, yearOfPublication].filter(Boolean).join(" &bull; ")}</p>` : ""}
        <p style="font-size:14px;color:#4a5568;line-height:1.7;">${description}</p>
      </div>
      <div class="btn-wrap">
        <a href="${pubUrl}" class="btn">View & Download Publication</a>
      </div>
      <div class="divider"></div>
      <p class="small-text">
        You are receiving this because you are subscribed to NSSEC updates or have contacted us previously.
        Visit <a href="${siteUrl}/publications" style="color:#24c2c2;">nssec.gov.ng/publications</a> for all publications.
      </p>
    `,
    footerText: `Browse all publications at <a href="${siteUrl}/publications">nssec.gov.ng/publications</a>`,
  });
};

export const sendPublicationNotifications = async (publication) => {
  const html = buildHtml(publication);
  const subject = `New NSSEC Publication: ${publication.title}`;

  const [subscribers, contactEmails] = await Promise.all([
    Subscriber.find({ status: "active" }).select("email").lean(),
    Contact.distinct("email"),
  ]);

  const emailSet = new Set();
  subscribers.forEach((s) => s.email && emailSet.add(s.email.toLowerCase()));
  contactEmails.forEach((e) => e && emailSet.add(e.toLowerCase()));

  const recipients = [...emailSet];
  if (!recipients.length) {
    logger.info("No recipients for publication notification");
    return;
  }

  logger.info(`Sending publication notification to ${recipients.length} recipients`);

  const BATCH = 50;
  for (let i = 0; i < recipients.length; i += BATCH) {
    const batch = recipients.slice(i, i + BATCH);
    await Promise.allSettled(batch.map((to) => sendEmail({ to, subject, html })));
  }

  logger.info(`Publication notifications sent: "${publication.title}"`);
};
