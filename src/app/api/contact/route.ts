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

    const transmissionTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short"
    }) + " (IST)";

    // High-fidelity HTML formatted email template styled in dark Obsidian themes
    const htmlContent = `
      <div style="background-color: #030712; padding: 32px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <div style="max-width: 580px; margin: 0 auto; background-color: #0b0f19; border: 1px solid #1f2937; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);">
          
          <!-- Top Gradient Accent Line -->
          <div style="height: 4px; background: linear-gradient(90deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%); background-color: #06b6d4;"></div>
          
          <!-- Header Area -->
          <div style="padding: 28px 32px 20px 32px; text-align: center; border-bottom: 1px solid #1f2937;">
            <div style="display: inline-block; background-color: #0c4a6e; border: 1px solid #0284c7; border-radius: 6px; padding: 4px 10px; margin-bottom: 12px;">
              <span style="color: #38bdf8; font-family: monospace; font-size: 10px; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase;">
                transmission_pipeline: active
              </span>
            </div>
            <h2 style="color: #ffffff; font-size: 20px; font-weight: 800; margin: 0; text-transform: uppercase; letter-spacing: 1.5px; font-family: 'Outfit', sans-serif;">
              Transmission Received
            </h2>
            <p style="color: #64748b; font-size: 12.5px; margin: 6px 0 0 0; font-family: 'Inter', sans-serif;">
              Secure contact form inquiry from your professional portfolio
            </p>
          </div>
          
          <!-- Body / Metadata Table -->
          <div style="padding: 32px 32px 24px 32px; font-family: 'Inter', sans-serif;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
              <tr>
                <td style="padding: 12px 0; color: #64748b; font-size: 11.5px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; width: 120px;">Sender Name:</td>
                <td style="padding: 12px 0; color: #ffffff; font-size: 14.5px; font-weight: 600;">${name}</td>
              </tr>
              <tr style="border-top: 1px solid #1f2937;">
                <td style="padding: 12px 0; color: #64748b; font-size: 11.5px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">Email Address:</td>
                <td style="padding: 12px 0; color: #3b82f6; font-size: 14.5px; font-weight: 600;">
                  <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr style="border-top: 1px solid #1f2937;">
                <td style="padding: 12px 0; color: #64748b; font-size: 11.5px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">Subject:</td>
                <td style="padding: 12px 0; color: #c084fc; font-size: 14.5px; font-weight: 700;">${subject || "General Inquiry"}</td>
              </tr>
            </table>
            
            <!-- Message Content Block -->
            <div style="background-color: #030712; border: 1px solid #1f2937; border-left: 4px solid #8b5cf6; border-radius: 0 12px 12px 0; padding: 20px; margin-bottom: 28px;">
              <p style="color: #8b5cf6; font-size: 10px; font-weight: bold; text-transform: uppercase; margin: 0 0 10px 0; letter-spacing: 1px; font-family: monospace;">
                Payload Message:
              </p>
              <div style="color: #e2e8f0; font-size: 13.5px; line-height: 1.6; margin: 0; white-space: pre-wrap; font-style: italic;">
                "${message}"
              </div>
            </div>
            
            <!-- Action Button -->
            <div style="text-align: center; margin: 12px 0 8px 0;">
              <a href="mailto:${email}" style="display: inline-block; background-color: #06b6d4; color: #ffffff; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 12px rgba(6, 182, 212, 0.25);">
                Direct Reply to Sender
              </a>
            </div>
          </div>
          
          <!-- System Metadata / Footer -->
          <div style="padding: 20px 32px; background-color: #030712; border-top: 1px solid #1f2937; font-size: 11px; color: #475569; font-family: 'Inter', sans-serif;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 4px 0; font-weight: 600;">System Dispatch:</td>
                <td style="padding: 4px 0; text-align: right; color: #94a3b8; font-family: monospace;">Next.js API Route (Nodemailer)</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: 600;">Timestamp (IST):</td>
                <td style="padding: 4px 0; text-align: right; color: #94a3b8; font-family: monospace;">${transmissionTime}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: 600;">Security Integrity:</td>
                <td style="padding: 4px 0; text-align: right; color: #10b981; font-family: monospace; font-weight: bold;">SECURE_SSL_465</td>
              </tr>
            </table>
          </div>
          
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
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("SMTP DISPATCH ERROR:", err);
    return NextResponse.json(
      { error: "Transmission pipeline encountered an error: " + (err.message || err) },
      { status: 500 }
    );
  }
}
