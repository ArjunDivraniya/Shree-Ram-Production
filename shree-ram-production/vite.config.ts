import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite plugin that intercepts /api/send-enquiry and /api/contact in dev mode
 * and executes Nodemailer automated delivery without needing a separate backend server.
 */
function emailApiPlugin(): Plugin {
  return {
    name: 'vite-plugin-email-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const rawUrl = req.url ? req.url.split('?')[0] : '';
        if (req.method === 'POST' && (rawUrl === '/api/send-enquiry' || rawUrl === '/api/contact')) {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const payload = JSON.parse(body || '{}');
              const { sendEnquiryEmail } = await import('./server/mailer.js');
              const result = await sendEnquiryEmail(payload);
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify(result));
            } catch (err: unknown) {
              const msg = err instanceof Error ? err.message : 'Failed to send enquiry email.';
              console.error('❌ [Vite Dev Mailer Error]:', msg);
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 500;
              res.end(
                JSON.stringify({
                  success: false,
                  error: msg,
                })
              );
            }
          });
          return;
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), emailApiPlugin()],
});
