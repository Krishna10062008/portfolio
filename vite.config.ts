import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

const hireRedirectPlugin: Plugin = {
  name: 'hire-redirect-plugin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = req.url ? req.url.split('?')[0] : '';
      if (url === '/hire' || url === '/api/hire') {
        const whatsappNumber = process.env.WHATSAPP_NUMBER?.replace(/[^0-9]/g, '');
        const message = encodeURIComponent(
          "Hi Krishna, I found you through your portfolio and I'd like to discuss a project."
        );
        if (whatsappNumber) {
          res.writeHead(302, {
            Location: `https://wa.me/${whatsappNumber}?text=${message}`,
            'Cache-Control': 'no-store',
          });
          res.end();
        } else {
          res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8"/>
    <title>Contact Channel Pending Configuration</title>
    <style>
      body { background: #0B0B0C; color: #F1E6D0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 32px; display: flex; justify-content: center; align-items: center; min-height: 80vh; }
      .card { max-width: 460px; border: 3px solid #C9922B; box-shadow: 6px 6px 0px #C9922B; padding: 30px; border-radius: 2px; background: #121214; }
      h2 { color: #D4161F; font-size: 24px; margin-top: 0; font-weight: 800; letter-spacing: 0.05em; }
      p { font-size: 15px; line-height: 1.6; }
      .btn { display: inline-block; background: #D4161F; color: #fff; padding: 10px 18px; text-decoration: none; margin-top: 14px; font-weight: 700; border: 2px solid #0B0B0C; box-shadow: 4px 4px 0px #0B0B0C; }
    </style>
  </head>
  <body>
    <div class="card">
      <h2>DIRECT LINK PENDING</h2>
      <p>Direct WhatsApp routing is awaiting environment configuration (<code>WHATSAPP_NUMBER</code>).</p>
      <p>Reach Krishna directly at: <br/><strong style="color: #C9922B;">kg6940749@gmail.com</strong></p>
      <a href="/" class="btn">Return to Portfolio</a>
    </div>
  </body>
</html>`);
        }
        return;
      }
      next();
    });
  },
};

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), hireRedirectPlugin],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
