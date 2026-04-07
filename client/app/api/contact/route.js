import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import nodemailer from "nodemailer";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2023-09-23",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function POST(req) {
  try {
    const { email, name, message, subject } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }
    if (!subject) {
      return NextResponse.json({ error: "Subject is required" }, { status: 400 });
    }

    // 1. Save message in Sanity
    await client.create({
      _type: "contact",
      email,
      subject,
      message,
      name,
      createdAt: new Date().toISOString(),
    });

    // 2. Configure mailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Send confirmation email to the sender
    await transporter.sendMail({
      from: `"NSSEC" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We received your message ✔️",
      html: `
        <h2>Dear ${name},</h2>
        <p>Thank you for reaching out to the <strong>National Senior Secondary Education Commission (NSSEC)</strong>.</p>
        <p>Your message has been received with the subject: <em>${subject}</em>.</p>
        <blockquote>${message}</blockquote>
        <p>Our team will review it and get back to you if necessary.</p>
        <br/>
        <p>Best regards,<br/>NSSEC</p>
      `,
    });

    // 4. Send full message details to admin
    await transporter.sendMail({
      from: `"NSSEC" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📩 New Contact Message: ${subject}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <blockquote>${message}</blockquote>
        <p>Received at: ${new Date().toLocaleString()}</p>
      `,
    });

    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Message error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
