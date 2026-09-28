import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sendEnquiryEmail } from './server/mailer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Shree Ram Production Mailer API',
  });
});

// Enquiry submission endpoint
app.post('/api/send-enquiry', async (req, res) => {
  try {
    const payload = req.body;
    if (!payload) {
      return res.status(400).json({ success: false, error: 'Missing enquiry data.' });
    }

    const result = await sendEnquiryEmail(payload);
    return res.json(result);
  } catch (err) {
    console.error('❌ [API Error] Failed to send enquiry:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Failed to send enquiry email.',
    });
  }
});

// Alias endpoint for backwards compatibility
app.post('/api/contact', async (req, res) => {
  try {
    const result = await sendEnquiryEmail(req.body);
    return res.json(result);
  } catch (err) {
    console.error('❌ [API Error] Failed to send enquiry:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Failed to send enquiry email.',
    });
  }
});

// Optionally serve static dist in production if running as standalone server
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.status(200).send('Shree Ram Production API is active.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Shree Ram Production Mailer Server listening on http://localhost:${PORT}`);
});
