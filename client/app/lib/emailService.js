import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "NSSEC <notifications@nssec.gov.ng>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "infonssec@gmail.com";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://nssec.gov.ng";

function baseTemplate(title, bodyHtml) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head>
<body style="margin:0;padding:0;background:#f4f7f9;font-family:'Segoe UI',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f9;padding:40px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.06)">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0e4f6b,#1a6b8a);padding:28px 36px;text-align:center">
            <img src="${BASE_URL}/nssec.jpeg" alt="NSSEC" height="48" style="border-radius:6px;margin-bottom:10px;display:block;margin-left:auto;margin-right:auto"/>
            <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700;letter-spacing:.4px">National Senior Secondary Education Commission</h1>
            <p style="color:rgba(255,255,255,.7);margin:4px 0 0;font-size:13px">nssec.gov.ng</p>
          </td>
        </tr>
        <!-- Body -->
        <tr><td style="padding:32px 36px">${bodyHtml}</td></tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f9fbfc;padding:20px 36px;border-top:1px solid #e8ecf0;text-align:center">
            <p style="margin:0;font-size:12px;color:#8fa3b0">
              This email was sent by the NSSEC notification system.<br/>
              <a href="${BASE_URL}" style="color:#24c2c2;text-decoration:none">nssec.gov.ng</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

// ─── Templates ────────────────────────────────────────────────────────────────

export function newPressReleaseHtml({ title, sourceUrl, sourceName, description }) {
  return baseTemplate(`New Press Release: ${title}`, `
    <h2 style="color:#0e4f6b;font-size:18px;margin:0 0 8px">New Press Release Published</h2>
    <div style="height:3px;width:40px;background:#24c2c2;border-radius:2px;margin-bottom:20px"></div>
    <h3 style="color:#1a1a2e;font-size:16px;margin:0 0 10px">${title}</h3>
    ${description ? `<p style="color:#555;font-size:14px;line-height:1.7;margin:0 0 16px">${description}</p>` : ""}
    ${sourceName ? `<p style="color:#777;font-size:13px;margin:0 0 16px">Source: <strong style="color:#0e4f6b">${sourceName}</strong></p>` : ""}
    ${sourceUrl ? `<a href="${sourceUrl}" style="display:inline-block;background:#24c2c2;color:#fff;padding:10px 22px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;margin-bottom:16px">Read Full Release →</a>` : ""}
  `);
}

export function newNssecNewsHtml({ title, slug, excerpt }) {
  const url = `${BASE_URL}/media/nssec-news/${slug}`;
  return baseTemplate(`New Article: ${title}`, `
    <h2 style="color:#0e4f6b;font-size:18px;margin:0 0 8px">New NSSEC News Article</h2>
    <div style="height:3px;width:40px;background:#24c2c2;border-radius:2px;margin-bottom:20px"></div>
    <h3 style="color:#1a1a2e;font-size:16px;margin:0 0 10px">${title}</h3>
    ${excerpt ? `<p style="color:#555;font-size:14px;line-height:1.7;margin:0 0 16px">${excerpt}</p>` : ""}
    <a href="${url}" style="display:inline-block;background:#24c2c2;color:#fff;padding:10px 22px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">Read Article →</a>
  `);
}

export function newPublicationHtml({ title, description, fileUrl }) {
  return baseTemplate(`New Publication: ${title}`, `
    <h2 style="color:#0e4f6b;font-size:18px;margin:0 0 8px">New Publication Added</h2>
    <div style="height:3px;width:40px;background:#24c2c2;border-radius:2px;margin-bottom:20px"></div>
    <h3 style="color:#1a1a2e;font-size:16px;margin:0 0 10px">${title}</h3>
    ${description ? `<p style="color:#555;font-size:14px;line-height:1.7;margin:0 0 16px">${description}</p>` : ""}
    ${fileUrl ? `<a href="${fileUrl}" style="display:inline-block;background:#24c2c2;color:#fff;padding:10px 22px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">Download Publication →</a>` : ""}
  `);
}

export function newSubscriberHtml({ email, name }) {
  return baseTemplate("New Subscriber", `
    <h2 style="color:#0e4f6b;font-size:18px;margin:0 0 8px">New Newsletter Subscriber</h2>
    <div style="height:3px;width:40px;background:#24c2c2;border-radius:2px;margin-bottom:20px"></div>
    <p style="color:#555;font-size:14px;line-height:1.7;margin:0 0 8px"><strong>Email:</strong> ${email}</p>
    ${name ? `<p style="color:#555;font-size:14px;line-height:1.7;margin:0 0 8px"><strong>Name:</strong> ${name}</p>` : ""}
    <p style="color:#777;font-size:13px;margin:16px 0 0">They will receive future NSSEC updates.</p>
  `);
}

export function contactFormHtml({ name, email, subject, message }) {
  return baseTemplate(`Contact Form: ${subject || "New Message"}`, `
    <h2 style="color:#0e4f6b;font-size:18px;margin:0 0 8px">New Contact Form Submission</h2>
    <div style="height:3px;width:40px;background:#24c2c2;border-radius:2px;margin-bottom:20px"></div>
    <table style="width:100%;border-collapse:collapse">
      <tr><td style="padding:8px 0;color:#777;font-size:13px;width:100px">Name:</td><td style="padding:8px 0;color:#1a1a2e;font-size:14px;font-weight:600">${name}</td></tr>
      <tr><td style="padding:8px 0;color:#777;font-size:13px">Email:</td><td style="padding:8px 0;color:#24c2c2;font-size:14px"><a href="mailto:${email}" style="color:#24c2c2">${email}</a></td></tr>
      ${subject ? `<tr><td style="padding:8px 0;color:#777;font-size:13px">Subject:</td><td style="padding:8px 0;color:#1a1a2e;font-size:14px">${subject}</td></tr>` : ""}
    </table>
    <div style="background:#f7fafc;border-left:3px solid #24c2c2;padding:16px;margin:16px 0;border-radius:0 8px 8px 0">
      <p style="color:#333;font-size:14px;line-height:1.7;margin:0;white-space:pre-wrap">${message}</p>
    </div>
    <a href="mailto:${email}" style="display:inline-block;background:#0e4f6b;color:#fff;padding:10px 22px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">Reply to ${name} →</a>
  `);
}

// ─── Send helpers ────────────────────────────────────────────────────────────

async function send({ to, subject, html }) {
  try {
    await resend.emails.send({ from: FROM, to, subject, html });
  } catch (err) {
    console.error("[emailService] send failed:", err?.message);
  }
}

export async function notifyNewPressRelease(data) {
  await send({
    to: ADMIN_EMAIL,
    subject: `[NSSEC] New Press Release: ${data.title}`,
    html: newPressReleaseHtml(data),
  });
}

export async function notifyNewNssecNews(data) {
  await send({
    to: ADMIN_EMAIL,
    subject: `[NSSEC] New Article: ${data.title}`,
    html: newNssecNewsHtml(data),
  });
}

export async function notifyNewPublication(data) {
  await send({
    to: ADMIN_EMAIL,
    subject: `[NSSEC] New Publication: ${data.title}`,
    html: newPublicationHtml(data),
  });
}

export async function notifyNewSubscriber(data) {
  await send({
    to: ADMIN_EMAIL,
    subject: `[NSSEC] New Subscriber: ${data.email}`,
    html: newSubscriberHtml(data),
  });
}

export async function notifyContactForm(data) {
  await send({
    to: ADMIN_EMAIL,
    subject: `[NSSEC Contact] ${data.subject || "New Message"} from ${data.name}`,
    html: contactFormHtml(data),
  });
}
