import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import nodemailer from "nodemailer";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion:"2023-09-23",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 1. Save subscriber in Sanity
    await client.create({
      _type: "subscribers",
      email,
    });

    // 2. Configure mailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // or Outlook/Yahoo depending on your email
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Send welcome email to subscriber
    await transporter.sendMail({
      from: `"NSSEC" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to NSSEC 🎉",
      html: `
        <h2>Welcome to NSSEC!</h2>
        <p>The NSSEC remains committed to enhancing the quality of senior secondary education nationwide.</p>
        <p>In the last three years, we focused on curriculum development, teacher training, infrastructure improvement, and policy implementation to ensure our education system remains competitive and inclusive.</p>
        <p>Thank you for subscribing!</p>
      `,
    });

    // 4. Send notification email to you
    await transporter.sendMail({
      from: `"NSSEC" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // admin email
      subject: "New Subscriber 🚀",
      text: `A new user subscribed with email: ${email}`,
    });

    return NextResponse.json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
