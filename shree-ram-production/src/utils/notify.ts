/**
 * Central notification helpers for Shree Ram Production contact enquiries.
 * When a client submits the contact form we notify the team via BOTH:
 *  - Email to shreeramproduction.in@gmail.com
 *  - WhatsApp / Call to +91 93131 19830
 * This file keeps the logic in one place so future backend integration
 * (e.g. fetch to /api/contact or EmailJS / WhatsApp Cloud API) only needs
 * to be added here.
 */

export const TEAM_EMAIL = 'shreeramproduction.in@gmail.com';
export const TEAM_WHATSAPP_NUMBER = '919313119830'; // E.164 without '+', used for wa.me
export const TEAM_WHATSAPP_DISPLAY = '+91 93131 19830';
export const TEAM_PHONE_NUMBER = '+919313119830';
export const TEAM_PHONE_DISPLAY = '+91 93131 19830';
export const TEAM_INSTAGRAM_URL = 'https://www.instagram.com/ram_production___?stkn=NWRnYWM5YTVta3hy';
export const TEAM_INSTAGRAM_HANDLE = '@ram_production___';

export interface EnquiryPayload {
  services: string[];
  name: string;
  business: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  goal: string;
  budgetLabel: string;
  preferences: string[];
}

function line(label: string, value: string): string {
  return `${label}: ${value || '—'}`;
}

export function buildTeamEnquiryMessage(data: EnquiryPayload): string {
  const services = data.services.length ? data.services.join(', ') : 'Not specified';
  const prefs = data.preferences.length ? data.preferences.join(', ') : 'Not specified';
  return [
    '🔔 New Enquiry — Shree Ram Production',
    '',
    line('Services', services),
    line('Name', data.name),
    line('Business', data.business),
    line('Email', data.email),
    line('Phone / WhatsApp', data.phone),
    line('Website / Instagram', data.website),
    line('Industry', data.industry),
    line('Goal', data.goal),
    line('Investment range', data.budgetLabel || 'Not specified'),
    line('Preferred contact', prefs),
    '',
    `Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`,
  ].join('\n');
}

export function buildTeamEmailSubject(data: Pick<EnquiryPayload, 'business' | 'name'>): string {
  const who = data.business ? `${data.business} — ${data.name}` : data.name || 'New Enquiry';
  return `New Enquiry: ${who}`;
}

export function buildTeamMailtoUrl(message: string, subject: string): string {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(message);
  return `mailto:${TEAM_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;
}

export function buildTeamWhatsAppUrl(message: string): string {
  return `https://wa.me/${TEAM_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export interface SendEnquiryResult {
  success: boolean;
  messageId?: string;
  simulated?: boolean;
  clientConfirmed?: boolean;
  error?: string;
}

/**
 * Send enquiry data automatically via backend API powered by Nodemailer.
 * This sends the enquiry directly in the background without needing the user
 * to open their email client or click send.
 */
export async function sendEnquiryViaNodemailer(payload: EnquiryPayload): Promise<SendEnquiryResult> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 18000); // 18s timeout

    const response = await fetch('/api/send-enquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData?.error || `Server responded with status ${response.status}`);
    }

    const data: SendEnquiryResult = await response.json();

    // Cache locally for reference
    try {
      localStorage.setItem('srp_last_enquiry', JSON.stringify({
        ...payload,
        at: new Date().toISOString(),
        result: data,
      }));
    } catch {}

    return data;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error or backend unavailable.';
    console.error('❌ [Enquiry API Error]:', message);
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Fallback dual notification in browser (WhatsApp link + mailto)
 * Kept for optional direct-click triggers if needed.
 */
export function triggerDualTeamNotification(payload: EnquiryPayload): { mailtoUrl: string; whatsappUrl: string; message: string } {
  const message = buildTeamEnquiryMessage(payload);
  const subject = buildTeamEmailSubject(payload);
  const mailtoUrl = buildTeamMailtoUrl(message, subject);
  const whatsappUrl = buildTeamWhatsAppUrl(message);

  try {
    localStorage.setItem('srp_last_enquiry', JSON.stringify({ ...payload, message, at: new Date().toISOString() }));
  } catch {}

  return { mailtoUrl, whatsappUrl, message };
}
