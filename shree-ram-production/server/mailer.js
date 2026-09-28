import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Load environment variables from .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config(); // Fallback to current working directory

const TEAM_EMAIL = process.env.EMAIL_TO || process.env.SMTP_USER || 'shreeramproduction.in@gmail.com';
const TEAM_PHONE_DISPLAY = '+91 93131 19830';
const TEAM_WHATSAPP_NUMBER = '919313119830';

/**
 * Clean phone numbers to raw digits for wa.me / tel links
 */
function cleanDigits(phone) {
  if (!phone) return '';
  const digits = String(phone).replace(/\D/g, '');
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

/**
 * Escapes HTML characters to prevent HTML injection in emails
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Create Nodemailer transporter
 */
function createTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE !== undefined
    ? process.env.SMTP_SECURE === 'true'
    : port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

/**
 * Generate HTML email template for the Shree Ram Production internal team
 */
function generateTeamEmailHtml(data) {
  const rawPhone = cleanDigits(data.phone);
  const waUrl = rawPhone ? `https://wa.me/${rawPhone}` : `https://wa.me/${TEAM_WHATSAPP_NUMBER}`;
  const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const servicesHtml = Array.isArray(data.services) && data.services.length > 0
    ? data.services.map(s => `<span style="display:inline-block;background:#1A1C20;border:1px solid #FF6A2A;color:#FFFFFF;padding:6px 14px;border-radius:20px;font-size:12px;margin:3px 4px 3px 0;font-weight:600;">${escapeHtml(s)}</span>`).join(' ')
    : '<span style="color:#8A8B90;">None specified</span>';

  const prefsHtml = Array.isArray(data.preferences) && data.preferences.length > 0
    ? data.preferences.map(p => `<span style="display:inline-block;background:#24272C;color:#FF6A2A;padding:4px 10px;border-radius:6px;font-size:12px;margin-right:6px;font-weight:600;">${escapeHtml(p)}</span>`).join(' ')
    : '<span style="color:#8A8B90;">Any channel</span>';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Project Enquiry — Shree Ram Production</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#08090A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#E0E0E0;line-height:1.6;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#08090A;padding:32px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;background:#0F1115;border:1px solid #20242B;border-radius:14px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,0.6);">
          
          <!-- Orange Accent Banner -->
          <tr>
            <td style="height:4px;background:linear-gradient(90deg, #FF6A2A 0%, #FFA875 100%);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding:28px 32px 20px 32px;border-bottom:1px solid #1C2027;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <div style="font-size:11px;font-weight:800;letter-spacing:0.18em;color:#FF6A2A;text-transform:uppercase;margin-bottom:6px;">
                      ⚡ INCOMING CLIENT ENQUIRY
                    </div>
                    <h1 style="margin:0;font-size:22px;font-weight:800;color:#FFFFFF;letter-spacing:-0.02em;">
                      ${escapeHtml(data.business ? `${data.business} — ${data.name}` : data.name || 'New Client')}
                    </h1>
                  </td>
                  <td align="right" style="vertical-align:top;">
                    <div style="font-size:11px;color:#787A82;font-family:monospace;">
                      ${now} IST
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick Action Buttons -->
          <tr>
            <td style="padding:18px 32px;background:#14171D;border-bottom:1px solid #1C2027;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  ${data.phone ? `
                    <td style="padding-right:10px;">
                      <a href="tel:${escapeHtml(data.phone)}" style="display:inline-block;background:#FF6A2A;color:#FFFFFF;text-decoration:none;font-weight:700;font-size:12px;padding:9px 16px;border-radius:8px;">
                        📞 Call Client
                      </a>
                    </td>
                    <td style="padding-right:10px;">
                      <a href="${waUrl}" target="_blank" style="display:inline-block;background:#25D366;color:#0B1A0E;text-decoration:none;font-weight:700;font-size:12px;padding:9px 16px;border-radius:8px;">
                        💬 WhatsApp
                      </a>
                    </td>
                  ` : ''}
                  ${data.email ? `
                    <td>
                      <a href="mailto:${escapeHtml(data.email)}" style="display:inline-block;background:#20252E;color:#FFFFFF;border:1px solid #323A46;text-decoration:none;font-weight:600;font-size:12px;padding:9px 16px;border-radius:8px;">
                        ✉️ Reply Email
                      </a>
                    </td>
                  ` : ''}
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding:28px 32px;">

              <!-- Client Information Section -->
              <div style="margin-bottom:26px;">
                <h2 style="font-size:12px;font-weight:800;letter-spacing:0.14em;color:#9B9DA4;text-transform:uppercase;margin:0 0 14px 0;">
                  CLIENT PROFILE
                </h2>
                <table width="100%" cellpadding="6" cellspacing="0" border="0" style="font-size:13px;border-collapse:collapse;">
                  <tr style="border-bottom:1px solid #1C2027;">
                    <td width="35%" style="color:#7D8088;padding:8px 0;font-weight:500;">Contact Name</td>
                    <td style="color:#FFFFFF;padding:8px 0;font-weight:700;">${escapeHtml(data.name || '—')}</td>
                  </tr>
                  <tr style="border-bottom:1px solid #1C2027;">
                    <td style="color:#7D8088;padding:8px 0;font-weight:500;">Business / Brand</td>
                    <td style="color:#FFFFFF;padding:8px 0;font-weight:600;">${escapeHtml(data.business || '—')}</td>
                  </tr>
                  <tr style="border-bottom:1px solid #1C2027;">
                    <td style="color:#7D8088;padding:8px 0;font-weight:500;">Email Address</td>
                    <td style="color:#FFFFFF;padding:8px 0;">
                      ${data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color:#FF854D;text-decoration:none;font-weight:600;">${escapeHtml(data.email)}</a>` : '—'}
                    </td>
                  </tr>
                  <tr style="border-bottom:1px solid #1C2027;">
                    <td style="color:#7D8088;padding:8px 0;font-weight:500;">Phone / WhatsApp</td>
                    <td style="color:#FFFFFF;padding:8px 0;font-weight:600;">
                      ${data.phone ? `<a href="tel:${escapeHtml(data.phone)}" style="color:#FFFFFF;text-decoration:none;">${escapeHtml(data.phone)}</a>` : '—'}
                    </td>
                  </tr>
                  <tr style="border-bottom:1px solid #1C2027;">
                    <td style="color:#7D8088;padding:8px 0;font-weight:500;">Website / Social</td>
                    <td style="color:#FFFFFF;padding:8px 0;">
                      ${data.website ? `<a href="${escapeHtml(data.website.startsWith('http') ? data.website : `https://${data.website}`)}" target="_blank" style="color:#FF854D;text-decoration:underline;">${escapeHtml(data.website)}</a>` : '—'}
                    </td>
                  </tr>
                  <tr>
                    <td style="color:#7D8088;padding:8px 0;font-weight:500;">Industry</td>
                    <td style="color:#FFFFFF;padding:8px 0;font-weight:600;">${escapeHtml(data.industry || '—')}</td>
                  </tr>
                </table>
              </div>

              <!-- Scope & Investment Section -->
              <div style="margin-bottom:26px;">
                <h2 style="font-size:12px;font-weight:800;letter-spacing:0.14em;color:#9B9DA4;text-transform:uppercase;margin:0 0 14px 0;">
                  PROJECT SCOPE &amp; INVESTMENT
                </h2>
                <div style="background:#13161C;border:1px solid #1F242C;border-radius:10px;padding:16px;">
                  <div style="margin-bottom:12px;">
                    <div style="font-size:11px;color:#787A82;text-transform:uppercase;font-weight:700;margin-bottom:6px;">Requested Capabilities</div>
                    <div>${servicesHtml}</div>
                  </div>
                  <div style="border-top:1px solid #1F242C;padding-top:12px;margin-top:12px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:13px;">
                      <tr>
                        <td width="50%">
                          <span style="color:#787A82;font-size:11px;text-transform:uppercase;font-weight:700;display:block;margin-bottom:4px;">Investment Range</span>
                          <span style="color:#25D366;font-weight:700;font-size:14px;">${escapeHtml(data.budgetLabel || 'Not specified')}</span>
                        </td>
                        <td width="50%">
                          <span style="color:#787A82;font-size:11px;text-transform:uppercase;font-weight:700;display:block;margin-bottom:4px;">Preferred Contact</span>
                          <div>${prefsHtml}</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>

              <!-- Client Goal & Details -->
              <div style="margin-bottom:16px;">
                <h2 style="font-size:12px;font-weight:800;letter-spacing:0.14em;color:#9B9DA4;text-transform:uppercase;margin:0 0 12px 0;">
                  PROJECT BRIEF &amp; OBJECTIVES
                </h2>
                <div style="background:#13161C;border-left:3px solid #FF6A2A;border-radius:0 8px 8px 0;padding:16px 20px;font-size:14px;color:#F0F0F2;line-height:1.65;white-space:pre-wrap;">${escapeHtml(data.goal || 'No description provided.')}</div>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;background:#0A0C0E;border-top:1px solid #1C2027;font-size:12px;color:#5D6068;text-align:center;">
              Shree Ram Production · Automated Enquiry Delivery via Nodemailer<br />
              <span style="font-size:11px;color:#45484E;">This message was generated automatically when the client submitted the enquiry form on shreeramproduction.in</span>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generate plain text email template for the internal team
 */
function generateTeamEmailText(data) {
  const services = Array.isArray(data.services) && data.services.length > 0 ? data.services.join(', ') : 'Not specified';
  const prefs = Array.isArray(data.preferences) && data.preferences.length > 0 ? data.preferences.join(', ') : 'Any channel';

  return `
🔥 NEW PROJECT ENQUIRY — SHREE RAM PRODUCTION

CLIENT PROFILE:
• Name: ${data.name || '—'}
• Business / Brand: ${data.business || '—'}
• Email: ${data.email || '—'}
• Phone / WhatsApp: ${data.phone || '—'}
• Website / Social: ${data.website || '—'}
• Industry: ${data.industry || '—'}

PROJECT SCOPE & INVESTMENT:
• Capabilities: ${services}
• Investment Range: ${data.budgetLabel || 'Not specified'}
• Preferred Contact Method: ${prefs}

PROJECT BRIEF & OBJECTIVES:
${data.goal || 'No description provided.'}

---
Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
Automated Enquiry Delivery · Shree Ram Production
  `.trim();
}

/**
 * Generate HTML auto-reply confirmation email to send to the client
 */
function generateClientConfirmationHtml(data) {
  const firstName = data.name ? data.name.trim().split(' ')[0] : 'there';
  const servicesList = Array.isArray(data.services) && data.services.length > 0
    ? data.services.map(s => `<li style="margin-bottom:6px;">${escapeHtml(s)}</li>`).join('')
    : '<li>Custom creative &amp; production requirements</li>';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>We’ve received your enquiry — Shree Ram Production</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#08090A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#E0E0E0;line-height:1.6;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#08090A;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;background:#0F1115;border:1px solid #20242B;border-radius:14px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,0.6);">
          
          <!-- Orange Accent Banner -->
          <tr>
            <td style="height:4px;background:linear-gradient(90deg, #FF6A2A 0%, #FFA875 100%);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding:28px 32px 20px 32px;border-bottom:1px solid #1C2027;">
              <div style="font-size:11px;font-weight:800;letter-spacing:0.18em;color:#FF6A2A;text-transform:uppercase;margin-bottom:8px;">
                SHREE RAM PRODUCTION
              </div>
              <h1 style="margin:0;font-size:22px;font-weight:800;color:#FFFFFF;letter-spacing:-0.02em;">
                We’ve received your enquiry.
              </h1>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding:28px 32px;font-size:14px;color:#D8D8DC;line-height:1.7;">
              <p style="margin:0 0 16px 0;font-size:15px;color:#FFFFFF;">
                Hi <strong>${escapeHtml(firstName)}</strong>,
              </p>
              <p style="margin:0 0 16px 0;">
                Thank you for reaching out to <strong>Shree Ram Production</strong>${data.business ? ` regarding <strong>${escapeHtml(data.business)}</strong>` : ''}. We have successfully received your project details and our team is already reviewing your requirements.
              </p>
              <p style="margin:0 0 20px 0;">
                Whether you need one specific capability or a complete growth solution, our creative team will connect with you shortly to discuss next steps.
              </p>

              <!-- Summary Box -->
              <div style="background:#13161C;border:1px solid #1E232B;border-radius:10px;padding:18px;margin-bottom:24px;">
                <div style="font-size:11px;font-weight:800;letter-spacing:0.12em;color:#FF6A2A;text-transform:uppercase;margin-bottom:10px;">
                  SUMMARY OF YOUR INQUIRY
                </div>
                <div style="font-size:13px;color:#C0C0C4;margin-bottom:8px;">
                  <strong style="color:#FFFFFF;">Services:</strong>
                  <ul style="margin:6px 0 12px 18px;padding:0;color:#E0E0E4;">
                    ${servicesList}
                  </ul>
                </div>
                ${data.budgetLabel ? `<div style="font-size:13px;color:#C0C0C4;margin-bottom:8px;"><strong style="color:#FFFFFF;">Investment Range:</strong> ${escapeHtml(data.budgetLabel)}</div>` : ''}
                ${data.goal ? `<div style="font-size:13px;color:#C0C0C4;"><strong style="color:#FFFFFF;">Your Notes:</strong><br/><span style="color:#A0A0A5;font-style:italic;">“${escapeHtml(data.goal)}”</span></div>` : ''}
              </div>

              <p style="margin:0 0 12px 0;">
                Need to speak right away? Reach us directly anytime:
              </p>

              <!-- Direct Buttons -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
                <tr>
                  <td style="padding-right:10px;">
                    <a href="https://wa.me/${TEAM_WHATSAPP_NUMBER}?text=Hi%20Shree%20Ram%20Production%2C%20following%20up%20on%20my%20enquiry" target="_blank" style="display:inline-block;background:#25D366;color:#0B1A0E;text-decoration:none;font-weight:700;font-size:12px;padding:9px 16px;border-radius:8px;">
                      💬 Chat on WhatsApp
                    </a>
                  </td>
                  <td>
                    <a href="tel:${TEAM_WHATSAPP_NUMBER}" style="display:inline-block;background:#20252E;color:#FFFFFF;border:1px solid #323A46;text-decoration:none;font-weight:600;font-size:12px;padding:9px 16px;border-radius:8px;">
                      📞 ${TEAM_PHONE_DISPLAY}
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:13px;color:#85878E;">
                Best regards,<br/>
                <strong style="color:#FFFFFF;">Shree Ram Production Team</strong><br/>
                Films · Campaigns · Visual Identity · Digital Growth
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 32px;background:#0A0C0E;border-top:1px solid #1C2027;font-size:11px;color:#5D6068;text-align:center;">
              Shree Ram Production · <a href="https://www.instagram.com/ram_production___?stkn=NWRnYWM5YTVta3hy" style="color:#FF6A2A;text-decoration:none;">@ram_production___</a> · +91 93131 19830
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generate plain text confirmation for client
 */
function generateClientConfirmationText(data) {
  const firstName = data.name ? data.name.trim().split(' ')[0] : 'there';
  return `
Hi ${firstName},

Thank you for reaching out to Shree Ram Production. We have successfully received your project inquiry and our team is already reviewing your requirements.

We will connect with you shortly to discuss next steps.

Summary of your request:
• Services: ${Array.isArray(data.services) ? data.services.join(', ') : 'Not specified'}
• Investment: ${data.budgetLabel || 'Not specified'}

If you need immediate assistance:
• WhatsApp: https://wa.me/${TEAM_WHATSAPP_NUMBER}
• Phone: ${TEAM_PHONE_DISPLAY}
• Instagram: https://www.instagram.com/ram_production___?stkn=NWRnYWM5YTVta3hy

Best regards,
Shree Ram Production Team
Films · Campaigns · Visual Identity · Digital Growth
  `.trim();
}

/**
 * Central function to send the enquiry via Nodemailer
 */
export async function sendEnquiryEmail(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid enquiry payload.');
  }

  const transporter = createTransporter();
  const teamHtml = generateTeamEmailHtml(payload);
  const teamText = generateTeamEmailText(payload);

  const subject = `🔥 New Project Enquiry: ${payload.business ? `${payload.business} — ` : ''}${payload.name || 'Client'}`;
  const senderEmail = process.env.SMTP_USER || 'shreeramproduction.in@gmail.com';
  const fromHeader = process.env.EMAIL_FROM || `"Shree Ram Production" <${senderEmail}>`;

  if (!transporter) {
    // If SMTP credentials are not yet configured in .env, log simulated email for local dev testing
    console.warn('\n⚠️ [Nodemailer] SMTP_USER and SMTP_PASS are not configured in your .env file.');
    console.warn('👉 Please create or update .env with your Gmail/SMTP credentials to send live emails.');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`[SIMULATED EMAIL DISPATCH]`);
    console.log(`To: ${TEAM_EMAIL}`);
    console.log(`From: ${fromHeader}`);
    console.log(`Subject: ${subject}`);
    console.log(`Client Email: ${payload.email || 'None'}`);
    console.log(`Client Phone: ${payload.phone || 'None'}`);
    console.log(`Services: ${payload.services?.join(', ')}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    return {
      success: true,
      simulated: true,
      message: 'Enquiry received in development simulation mode. Set SMTP_USER and SMTP_PASS in .env to deliver real emails.',
    };
  }

  // 1. Send Notification Email to the Shree Ram Production internal team
  const teamMailOptions = {
    from: fromHeader,
    to: TEAM_EMAIL,
    replyTo: payload.email ? `${payload.name || 'Client'} <${payload.email}>` : undefined,
    subject,
    text: teamText,
    html: teamHtml,
  };

  const teamResult = await transporter.sendMail(teamMailOptions);
  console.log(`✅ [Nodemailer] Team notification delivered: ${teamResult.messageId}`);

  // 2. Optionally send confirmation email to the client if they gave a valid email
  let clientResult = null;
  if (payload.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) {
    try {
      const clientMailOptions = {
        from: fromHeader,
        to: payload.email.trim(),
        subject: 'We’ve received your enquiry — Shree Ram Production',
        text: generateClientConfirmationText(payload),
        html: generateClientConfirmationHtml(payload),
      };
      clientResult = await transporter.sendMail(clientMailOptions);
      console.log(`✅ [Nodemailer] Client auto-confirmation sent to ${payload.email}: ${clientResult.messageId}`);
    } catch (clientErr) {
      console.warn(`⚠️ [Nodemailer] Client auto-confirmation skipped or failed:`, clientErr?.message);
    }
  }

  return {
    success: true,
    messageId: teamResult.messageId,
    clientConfirmed: Boolean(clientResult),
  };
}
