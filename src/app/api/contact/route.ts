import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate request inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, and message are required." },
        { status: 400 }
      );
    }

    const recipientEmail = "shavez.khanccc@gmail.com";
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    // Developer Fallback: SMTP Credentials are NOT configured yet
    if (!smtpUser || !smtpPass) {
      console.warn("====================================================================");
      console.warn("SMTP EMAIL ALERTS: Missing SMTP credentials in .env.local!");
      console.warn(`Attempted to send email from: ${name} <${email}>`);
      console.warn(`Subject: ${subject || "No Subject"}`);
      console.warn(`Message: ${message}`);
      console.warn("--------------------------------------------------------------------");
      console.warn("HOW TO CONFIGURE REAL EMAIL DELIVERY:");
      console.warn("1. Create a '.env.local' file in your project root.");
      console.warn("2. Add the following lines:");
      console.warn("   SMTP_USER=shavez.khanccc@gmail.com");
      console.warn("   SMTP_PASS=xxxx xxxx xxxx xxxx");
      console.warn("   (Note: 'SMTP_PASS' should be an App Password generated from your");
      console.warn("    Google Account security settings, NOT your regular Gmail password.)");
      console.warn("====================================================================");

      // Return a simulated success to the client so the UI flow doesn't break
      return NextResponse.json({
        success: true,
        message: "Message processed successfully (Development Mode Simulating Delivery)."
      });
    }

    // Configure SMTP Transport for Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Elegant HTML formatted email template matching your portfolio style
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #030712; color: #f3f4f6; padding: 24px; border-radius: 16px; border: 1px solid #1f2937; max-width: 600px; margin: auto;">
        <div style="border-bottom: 1px solid #1f2937; padding-bottom: 16px; margin-bottom: 24px; text-align: center;">
          <h2 style="color: #06b6d4; font-size: 22px; font-weight: bold; margin: 0; text-transform: uppercase; tracking-wider: 1px;">
            Transmission Received
          </h2>
          <p style="color: #94a3b8; font-size: 11px; margin: 4px 0 0 0; text-transform: uppercase;">
            Portfolio Contact Hub Pipeline
          </p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; font-weight: bold; width: 100px; font-size: 13px;">Sender Name:</td>
            <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; font-weight: bold; font-size: 13px;">Email Address:</td>
            <td style="padding: 8px 0; color: #3b82f6; font-size: 14px;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; font-weight: bold; font-size: 13px;">Subject:</td>
            <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: bold;">${subject || "Collaboration Opportunity"}</td>
          </tr>
        </table>
        
        <div style="background-color: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 16px; margin-bottom: 24px; min-height: 100px;">
          <p style="color: #94a3b8; font-size: 10px; font-weight: bold; uppercase; margin: 0 0 10px 0; letter-spacing: 0.5px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding-bottom: 6px;">
            Payload Message:
          </p>
          <p style="color: #e2e8f0; font-size: 13px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
        
        <div style="border-top: 1px solid #1f2937; padding-top: 16px; text-align: center; color: #64748b; font-size: 11px;">
          <p style="margin: 0;">This transmission was dispatched securely via your Next.js Portfolio API.</p>
          <p style="margin: 4px 0 0 0;">Reply directly to this email to contact <strong>${name}</strong>.</p>
        </div>
      </div>
    `;

    // Dispatch mail parameters
    await transporter.sendMail({
      from: `"${name} via Portfolio" <${smtpUser}>`, // Send via authorized SMTP email
      to: recipientEmail,
      replyTo: email, // Click 'Reply' writes directly to the sender!
      subject: `Portfolio: ${subject || "Inquiry from " + name}`,
      text: `Sender: ${name}\nEmail: ${email}\nSubject: ${subject || "None"}\n\nMessage:\n${message}`,
      html: htmlContent,
    });

    return NextResponse.json({
      success: true,
      message: "Transmission dispatched successfully. Message sent via SMTP."
    });
  } catch (error: any) {
    console.error("SMTP DISPATCH ERROR:", error);
    return NextResponse.json(
      { error: "Transmission pipeline encountered an error: " + (error?.message || error) },
      { status: 500 }
    );
  }
}
