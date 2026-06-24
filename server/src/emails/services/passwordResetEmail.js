import { emailLayout } from "../templates/layout.js";
import { sendEmail } from "../../config/gmail.js";

export const sendPasswordResetEmail = async ({ name, email, resetUrl, expiresIn = "1 hour" }) => {
  const html = emailLayout({
    title: "Reset Your Password",
    preheader: "You requested a password reset for your NSSEC account.",
    content: `
      <h1 class="title">Reset Your Password</h1>
      <p class="text">Hi ${name || "there"}, we received a request to reset the password for your NSSEC Dashboard account.</p>
      <div class="btn-wrap">
        <a href="${resetUrl}" class="btn">Reset Password</a>
      </div>
      <div class="warning-box">
        <p><strong>This link expires in ${expiresIn}.</strong> If you did not request a password reset, you can safely ignore this email — your password will not change.</p>
      </div>
      <div class="divider"></div>
      <p class="small-text">If the button above doesn't work, copy and paste this URL into your browser:<br/>
      <a href="${resetUrl}" style="color:#24c2c2;word-break:break-all;">${resetUrl}</a></p>
    `,
    footerText: "This password reset link will expire in " + expiresIn + ".",
  });

  return sendEmail({ to: email, subject: "Reset Your NSSEC Dashboard Password", html });
};

export const sendPasswordChangedEmail = async ({ name, email }) => {
  const html = emailLayout({
    title: "Password Changed Successfully",
    preheader: "Your NSSEC account password was changed.",
    content: `
      <h1 class="title">Password Changed</h1>
      <p class="text">Hi ${name || "there"}, your NSSEC Dashboard password was successfully changed.</p>
      <div class="warning-box">
        <p>If you did not make this change, please contact your administrator immediately and reset your password.</p>
      </div>
    `,
  });

  return sendEmail({ to: email, subject: "Your NSSEC Password Was Changed", html });
};
