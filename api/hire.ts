import type { IncomingMessage, ServerResponse } from 'http';

/**
 * Vercel Serverless Function: /api/hire
 * Reads WHATSAPP_NUMBER from environment variables.
 * Redirects via 302 to wa.me with prefilled inquiry message.
 * Never exposes the number in client bundle or DOM.
 */
export default function handler(req: IncomingMessage, res: ServerResponse) {
  const whatsappNumber = process.env.WHATSAPP_NUMBER?.replace(/[^0-9]/g, '');
  const message = encodeURIComponent("Hi Krishna, I found you through your portfolio and I'd like to discuss a project.");

  if (!whatsappNumber) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Contact Channel Pending Configuration</title>
          <style>
            body {
              font-family: 'Inter', system-ui, -apple-system, sans-serif;
              background-color: #0B0B0C;
              color: #F1E6D0;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              padding: 24px;
              box-sizing: border-box;
            }
            .card {
              max-width: 480px;
              width: 100%;
              border: 3px solid #C9922B;
              box-shadow: 6px 6px 0px #C9922B;
              padding: 32px;
              border-radius: 2px;
              background-color: #121214;
            }
            h1 {
              font-family: 'Anton', sans-serif;
              color: #D4161F;
              letter-spacing: 0.05em;
              margin-top: 0;
              font-size: 28px;
            }
            p {
              color: #F1E6D0;
              line-height: 1.6;
              font-size: 15px;
            }
            .btn {
              display: inline-block;
              margin-top: 16px;
              background-color: #D4161F;
              color: #FFFFFF;
              text-decoration: none;
              padding: 12px 20px;
              border: 2px solid #0B0B0C;
              box-shadow: 4px 4px 0px #0B0B0C;
              font-weight: 600;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>DIRECT LINK PENDING</h1>
            <p>Direct WhatsApp routing is currently initializing or awaiting environment configuration.</p>
            <p>You can reach Krishna directly at: <br/><strong style="color: #C9922B;">kg6940749@gmail.com</strong></p>
            <a href="/" class="btn">Return to Portfolio</a>
          </div>
        </body>
      </html>
    `);
    return;
  }

  const targetUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
  res.statusCode = 302;
  res.setHeader('Location', targetUrl);
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.end();
}
