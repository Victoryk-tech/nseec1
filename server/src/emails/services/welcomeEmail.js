import { emailLayout } from "../templates/layout.js";
import { sendEmail } from "../../config/gmail.js";

export const sendWelcomeEmail = async ({ name, email, loginUrl, temporaryPassword }) => {
  const html = emailLayout({
    title: "Welcome to NSSEC Dashboard",
    preheader: "Your NSSEC staff account is ready.",
    content: `
      <h1 class="title">Welcome, ${name}!</h1>
      <p class="text">Your NSSEC staff account has been created. You now have access to the NSSEC Dashboard.</p>
      <div class="info-box">
        <p><strong>Your login credentials:</strong><br/>
        Email: <strong>${email}</strong><br/>
        Temporary Password: <strong style="font-family:monospace;font-size:16px;letter-spacing:2px;">${temporaryPassword}</strong></p>
      </div>
      <div class="warning-box">
        <p><strong>Important:</strong> You will be required to change this password on your first login. Keep this email confidential.</p>
      </div>
      <div class="btn-wrap">
        <a href="${loginUrl}" class="btn">Access Dashboard</a>
      </div>
      <div class="divider"></div>
      <p class="small-text">If you did not expect this email, contact your administrator immediately.</p>
    `,
    footerText: "You received this because a new account was created for you on the NSSEC Dashboard.",
  });

  return sendEmail({ to: email, subject: "Welcome to NSSEC Dashboard — Your Credentials", html });
};
