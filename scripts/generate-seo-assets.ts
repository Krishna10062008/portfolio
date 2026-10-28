import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function generateSeoAssets() {
  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log('Generating SEO & Social sharing assets...');

  // 1. Generate Favicon SVG (Mystic mandala ring with crimson center)
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
    <rect width="64" height="64" rx="8" fill="#0B0B0C"/>
    <!-- Outer dashed mandala ring -->
    <circle cx="32" cy="32" r="28" stroke="#C9922B" stroke-width="2.5" stroke-dasharray="4 3"/>
    <circle cx="32" cy="32" r="23" stroke="#C9922B" stroke-width="1.2"/>
    <!-- Sacred geometry square -->
    <rect x="18" y="18" width="28" height="28" stroke="#C9922B" stroke-width="1.5" transform="rotate(45 32 32)"/>
    <!-- Inner concentric ring -->
    <circle cx="32" cy="32" r="14" stroke="#C9922B" stroke-width="1.5" stroke-dasharray="3 2"/>
    <!-- Central crimson glowing core -->
    <circle cx="32" cy="32" r="6" fill="#D4161F"/>
    <circle cx="32" cy="32" r="3" fill="#FFFFFF"/>
  </svg>`;

  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg, 'utf8');
  console.log('✓ Generated favicon.svg');

  // Convert SVG to PNG favicons
  const svgBuffer = Buffer.from(faviconSvg);
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('✓ Generated favicon-32x32.png');

  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Generated apple-touch-icon.png');

  // 2. Generate 1200x630 OpenGraph and Twitter Share Card
  // We composite the comic portrait with the diagonal split and branding
  const portraitPath = path.resolve(process.cwd(), 'public/assets/aistudio/image_3129c4f9.png');

  // Generate SVG overlay for text and comic layout
  const ogOverlaySvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#E5B25D"/>
        <stop offset="100%" stop-color="#C9922B"/>
      </linearGradient>
    </defs>

    <!-- Ink Background on left, Paper on right with diagonal split -->
    <rect width="1200" height="630" fill="#0B0B0C"/>
    <polygon points="560,0 1200,0 1200,630 460,630" fill="#F1E6D0"/>

    <!-- Decorative Web Lines on Ink Top-Left -->
    <g stroke="#D4161F" stroke-width="1.5" opacity="0.6">
      <path d="M0,0 Q120,60 240,0" fill="none"/>
      <path d="M0,0 Q60,120 0,240" fill="none"/>
      <path d="M0,0 Q180,180 300,300" fill="none"/>
      <line x1="0" y1="0" x2="320" y2="120"/>
      <line x1="0" y1="0" x2="120" y2="320"/>
    </g>

    <!-- Right Side Content in Dark Ink on Paper -->
    <!-- Open to Work Badge -->
    <rect x="620" y="90" width="130" height="30" rx="2" fill="#0B0B0C"/>
    <circle cx="636" cy="105" r="4.5" fill="#3DDC84"/>
    <text x="648" y="110" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" fill="#F1E6D0" letter-spacing="1">OPEN TO WORK</text>

    <!-- Category Kicker -->
    <text x="765" y="110" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" fill="#5A0B0F" letter-spacing="1.5">AI · COMPUTER VISION · AUTOMATION</text>

    <!-- Main Name Title -->
    <text x="620" y="210" font-family="'Anton', 'Impact', sans-serif" font-size="76" font-weight="bold" fill="#0B0B0C" letter-spacing="2">
      <tspan fill="#D4161F">/ </tspan>KRISHNA PATEL
    </text>

    <!-- Tagline -->
    <text x="620" y="270" font-family="'Anton', 'Impact', sans-serif" font-size="28" fill="#0B0B0C" letter-spacing="1">
      THINGS THAT FEEL LIKE MAGIC.
    </text>

    <text x="620" y="325" font-family="'Inter', sans-serif" font-size="20" fill="#27272A" font-weight="500">
      Real-Time Computer Vision &amp; Neural Gesture Perception.
    </text>

    <text x="620" y="355" font-family="'Inter', sans-serif" font-size="18" fill="#52525B">
      Full-Stack AI Workflows · Gesture Engines · The ZeroShot Creator
    </text>

    <!-- Tech Stack Strip -->
    <g transform="translate(620, 420)">
      <rect x="0" y="0" width="105" height="32" rx="2" fill="#FFFFFF" stroke="#0B0B0C" stroke-width="2"/>
      <text x="52" y="20" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="bold" fill="#0B0B0C" text-anchor="middle">PYTHON</text>

      <rect x="115" y="0" width="115" height="32" rx="2" fill="#FFFFFF" stroke="#0B0B0C" stroke-width="2"/>
      <text x="172" y="20" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="bold" fill="#0B0B0C" text-anchor="middle">OPENCV</text>

      <rect x="240" y="0" width="135" height="32" rx="2" fill="#FFFFFF" stroke="#0B0B0C" stroke-width="2"/>
      <text x="307" y="20" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="bold" fill="#0B0B0C" text-anchor="middle">MEDIAPIPE</text>

      <rect x="385" y="0" width="115" height="32" rx="2" fill="#FFFFFF" stroke="#0B0B0C" stroke-width="2"/>
      <text x="442" y="20" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="bold" fill="#0B0B0C" text-anchor="middle">PYTORCH</text>
    </g>

    <!-- Contact and Hire Me Button Strip -->
    <g transform="translate(620, 500)">
      <rect x="0" y="0" width="230" height="48" rx="2" fill="#D4161F" stroke="#0B0B0C" stroke-width="2"/>
      <text x="115" y="30" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">HIRE ME @KRISHNA</text>

      <text x="250" y="30" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="bold" fill="#0B0B0C">kg6940749@gmail.com</text>
    </g>
  </svg>`;

  // Resize portrait to 480x480 for compositing on the left
  const resizedPortrait = await sharp(portraitPath)
    .resize(480, 480)
    .toBuffer();

  const ogImageBuffer = await sharp(Buffer.from(ogOverlaySvg))
    .composite([
      {
        input: resizedPortrait,
        top: 75,
        left: 40,
      },
    ])
    .png({ quality: 90 })
    .toFile(path.join(publicDir, 'og-image.png'));

  console.log('✓ Generated og-image.png (1200x630)');

  // 3. Generate robots.txt (Disallows /hire and /api/)
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Private webhook/WhatsApp redirection endpoints
Disallow: /hire
Disallow: /api/

Sitemap: https://krishna-patel.vercel.app/sitemap.xml
`;
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');
  console.log('✓ Generated robots.txt');

  // 4. Generate sitemap.xml
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://krishna-patel.vercel.app/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://krishna-patel.vercel.app/#builds</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://krishna-patel.vercel.app/#work</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://krishna-patel.vercel.app/#services</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://krishna-patel.vercel.app/#about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://krishna-patel.vercel.app/#contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
  console.log('✓ Generated sitemap.xml');
}

generateSeoAssets().catch((err) => {
  console.error('Failed to generate SEO assets:', err);
  process.exit(1);
});
