import { sendEnquiryEmail } from '../server/mailer.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!payload) {
      return res.status(400).json({ success: false, error: 'Missing enquiry data.' });
    }

    const result = await sendEnquiryEmail(payload);
    return res.status(200).json(result);
  } catch (err) {
    console.error('❌ [Vercel API] Error sending enquiry email:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Failed to deliver enquiry email.',
    });
  }
}
