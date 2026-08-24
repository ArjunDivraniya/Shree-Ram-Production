/**
 * Central notification helpers for Shree Ram Production contact enquiries.
 * When a client submits the contact form we notify the team via BOTH:
 *  - Email to hello@shreeramproduction.com
 *  - WhatsApp to +91 98765 43210
 * This file keeps the logic in one place so future backend integration
 * (e.g. fetch to /api/contact or EmailJS / WhatsApp Cloud API) only needs
 * to be added here.
 */

export const TEAM_EMAIL = 'shreeramproduction7@gmail.com';
export const TEAM_WHATSAPP_NUMBER = '919876543210'; // E.164 without '+', used for wa.me
export const TEAM_WHATSAPP_DISPLAY = '+91 98765 43210';

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

/**
 * Trigger both notifications in the browser.
 * - Email: opens default mail client via mailto: (team receives enquiry)
 * - WhatsApp: opens wa.me in new tab (team receives WhatsApp)
 * Returns URLs so UI can show fallbacks if popups are blocked.
 */
export function triggerDualTeamNotification(payload: EnquiryPayload): { mailtoUrl: string; whatsappUrl: string; message: string } {
  const message = buildTeamEnquiryMessage(payload);
  const subject = buildTeamEmailSubject(payload);
  const mailtoUrl = buildTeamMailtoUrl(message, subject);
  const whatsappUrl = buildTeamWhatsAppUrl(message);

  // Persist for debugging / fallback (e.g. if popup blocked, user can still copy)
  try {
    localStorage.setItem('srp_last_enquiry', JSON.stringify({ ...payload, message, at: new Date().toISOString() }));
  } catch {}

  // Attempt to open both — WhatsApp first in new tab, then email in current context
  // Stagger to avoid popup blocker coalescing
  try {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  } catch {}
  // Small delay so WhatsApp tab opens before mailto navigation
  window.setTimeout(() => {
    // Using hidden anchor is more reliable than location.href for mailto in some browsers
    const a = document.createElement('a');
    a.href = mailtoUrl;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, 400);

  return { mailtoUrl, whatsappUrl, message };
}
