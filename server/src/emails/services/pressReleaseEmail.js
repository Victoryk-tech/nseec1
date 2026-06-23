import { emailLayout } from "../templates/layout.js";
import { sendEmail } from "../../config/resend.js";
import Subscriber from "../../models/Subscriber.js";
import Contact from "../../models/Contact.js";
import logger from "../../utils/logger.js";

const buildHtml = (post) => {
  const { title, description, slug, hashtags = [], imageUrl } = post;
  const siteUrl = process.env.CLIENT_URL || "https://nssec.gov.ng";
  const prUrl = `${siteUrl}/media/press-release/${slug}`;
  const hashtagStr = hashtags.map((h) => `#${h}`).join(" ");

  return emailLayout({
    title: `Official Press Release: ${title}`,
    preheader: `NSSEC Official Press Release — ${title}`,
    content: `
      <div style="background:#1e40af;color:#fff;padding:12px 20px;border-radius:6px 6px 0 0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:0;">
        Official Press Release &nbsp;&bull;&nbsp; National Secondary Education Commission
      </div>
      <div style="border:1px solid #bfdbfe;border-top:none;border-radius:0 0 8px 8px;padding:28px 24px;margin-bottom:24px;background:#f8faff;">
        <h1 style="font-size:22px;font-weight:700;color:#082c2c;line-height:1.35;margin-bottom:12px;">${title}</h1>
        ${description ? `<p style="font-size:15px;color:#4a5568;line-height:1.7;border-left:4px solid #3b82f6;padding-left:16px;margin:0;">${description}</p>` : ""}
      </div>

      ${imageUrl ? `<div style="margin:20px 0;border-radius:10px;overflow:hidden;"><img src="${imageUrl}" alt="${title}" style="width:100%;max-height:340px;object-fit:cover;display:block;" /></div>` : ""}

      <p class="text" style="margin-top:20px;">
        The National Secondary Education Commission (NSSEC) has issued an official press release.
        Read the full statement to stay informed on NSSEC's latest official communications.
      </p>

      <div class="btn-wrap">
        <a href="${prUrl}" class="btn" style="background:#1d4ed8;">Read Full Press Release</a>
      </div>

      ${hashtagStr ? `<p style="font-size:12px;color:#718096;text-align:center;margin-top:8px;">${hashtagStr}</p>` : ""}

      <div class="divider"></div>
      <p class="small-text">
        This is an official press release from the National Secondary Education Commission (NSSEC).
        You are receiving this because you are subscribed to NSSEC updates or have contacted us.
        Visit <a href="${siteUrl}/media/press-release" style="color:#24c2c2;">nssec.gov.ng/media/press-release</a> for all press releases.
      </p>
    `,
    footerText: `Read all press releases at <a href="${siteUrl}/media/press-release">nssec.gov.ng/media/press-release</a>`,
  });
};

export const sendPressReleaseNotifications = async (post) => {
  const html = buildHtml(post);
  const subject = `Official Press Release: ${post.title} — NSSEC`;

  const [subscribers, contactEmails] = await Promise.all([
    Subscriber.find({ status: "active" }).select("email").lean(),
    Contact.distinct("email"),
  ]);

  const emailSet = new Set();
  subscribers.forEach((s) => s.email && emailSet.add(s.email.toLowerCase()));
  contactEmails.forEach((e) => e && emailSet.add(e.toLowerCase()));

  const recipients = [...emailSet];
  if (!recipients.length) {
    logger.info("No recipients for press release notification");
    return;
  }

  logger.info(`Sending press release notification to ${recipients.length} recipients`);
  const BATCH = 50;
  for (let i = 0; i < recipients.length; i += BATCH) {
    const batch = recipients.slice(i, i + BATCH);
    await Promise.allSettled(batch.map((to) => sendEmail({ to, subject, html })));
  }
  logger.info(`Press release notifications sent: "${post.title}"`);
};
