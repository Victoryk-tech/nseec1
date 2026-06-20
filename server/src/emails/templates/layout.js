export const emailLayout = ({ title, preheader = "", content, footerText = "" }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #1a202c; }
    .wrapper { max-width: 600px; margin: 0 auto; padding: 32px 16px; }
    .card { background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
    .header { background: linear-gradient(135deg, #082c2c 0%, #0e4a4a 100%); padding: 36px 40px; text-align: center; }
    .header-logo { font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: 0.04em; }
    .header-logo span { color: #24c2c2; }
    .header-tagline { font-size: 12px; color: rgba(255,255,255,0.6); margin-top: 6px; letter-spacing: 0.08em; text-transform: uppercase; }
    .accent-bar { height: 4px; background: linear-gradient(90deg, #24c2c2, #0e4a4a); }
    .body { padding: 40px; }
    .title { font-size: 24px; font-weight: 700; color: #082c2c; margin-bottom: 16px; line-height: 1.3; }
    .text { font-size: 15px; color: #4a5568; line-height: 1.7; margin-bottom: 16px; }
    .btn-wrap { text-align: center; margin: 32px 0; }
    .btn { display: inline-block; background: #24c2c2; color: #ffffff; text-decoration: none; padding: 14px 36px; border-radius: 8px; font-size: 15px; font-weight: 600; letter-spacing: 0.02em; transition: background 0.2s; }
    .btn-outline { display: inline-block; background: transparent; color: #24c2c2; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-size: 14px; font-weight: 500; border: 2px solid #24c2c2; }
    .divider { height: 1px; background: #e8ecef; margin: 28px 0; }
    .info-box { background: #f0fdfc; border-left: 4px solid #24c2c2; border-radius: 0 8px 8px 0; padding: 16px 20px; margin: 20px 0; }
    .info-box p { font-size: 14px; color: #2d3748; line-height: 1.6; }
    .warning-box { background: #fffbeb; border-left: 4px solid #f6ad55; border-radius: 0 8px 8px 0; padding: 16px 20px; margin: 20px 0; }
    .warning-box p { font-size: 14px; color: #744210; }
    .small-text { font-size: 13px; color: #718096; line-height: 1.6; }
    .footer { padding: 28px 40px; text-align: center; border-top: 1px solid #e8ecef; }
    .footer p { font-size: 12px; color: #a0aec0; line-height: 1.7; }
    .footer a { color: #24c2c2; text-decoration: none; }
    .social-links { margin: 12px 0; }
    .social-links a { display: inline-block; margin: 0 6px; font-size: 12px; color: #718096; text-decoration: none; }
    @media (max-width: 480px) {
      .body { padding: 28px 24px; }
      .header { padding: 28px 24px; }
      .footer { padding: 20px 24px; }
      .title { font-size: 20px; }
    }
  </style>
</head>
<body>
  ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${preheader}</div>` : ""}
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <div class="header-logo">NSS<span>EC</span></div>
        <div class="header-tagline">National Secondary Education Commission</div>
      </div>
      <div class="accent-bar"></div>
      <div class="body">
        ${content}
      </div>
      <div class="footer">
        ${footerText ? `<p>${footerText}</p><br/>` : ""}
        <p>National Secondary Education Commission (NSSEC)<br/>
        Abuja, Nigeria &bull; <a href="mailto:info@nssec.gov.ng">info@nssec.gov.ng</a></p>
        <div class="social-links">
          <a href="#">Twitter</a> &bull;
          <a href="#">Facebook</a> &bull;
          <a href="#">LinkedIn</a>
        </div>
        <p style="margin-top:12px;font-size:11px;color:#cbd5e0;">
          &copy; ${new Date().getFullYear()} NSSEC. All rights reserved.<br/>
          This email was sent to you because you are associated with NSSEC.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;
