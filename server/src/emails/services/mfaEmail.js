import { emailLayout } from "../templates/layout.js";
import { sendEmail } from "../../config/resend.js";

export const sendMfaCodeEmail = async ({ name, email, code }) => {
  const html = emailLayout({
    title: "Your NSSEC Verification Code",
    preheader: `Your one-time verification code is ${code}`,
    content: `
      <h1 class="title">Verification Code</h1>
      <p class="text">Hi ${name}, use the code below to complete your sign-in to the NSSEC Staff Portal. It expires in <strong>5 minutes</strong>.</p>
      <div style="text-align:center;margin:32px 0;">
        <div style="display:inline-block;background:#f0fdfc;border:2px dashed #24c2c2;border-radius:12px;padding:20px 40px;">
          <span style="font-size:36px;font-weight:800;letter-spacing:12px;color:#082c2c;font-family:monospace;">${code}</span>
        </div>
      </div>
      <div class="warning-box">
        <p>Never share this code with anyone. NSSEC staff will never ask for your verification code.</p>
      </div>
      <div class="divider"></div>
      <p class="small-text">If you did not attempt to log in, secure your account immediately by contacting your administrator.</p>
    `,
    footerText: "You received this because a login was attempted on your NSSEC Staff Portal account.",
  });

  return sendEmail({ to: email, subject: "Your NSSEC Verification Code", html });
};
