import sharp from 'sharp';
import path from 'node:path';

async function generateNoisePng() {
  const width = 128;
  const height = 128;
  const channels = 4; // RGBA
  const buffer = Buffer.alloc(width * height * channels);

  for (let i = 0; i < width * height; i++) {
    // Generate subtle film grain noise
    const v = Math.floor(Math.random() * 255);
    const alpha = Math.floor(Math.random() * 30 + 15); // low alpha
    const offset = i * 4;
    buffer[offset] = v;     // R
    buffer[offset + 1] = v; // G
    buffer[offset + 2] = v; // B
    buffer[offset + 3] = alpha; // A
  }

  const outPath = path.resolve('public/assets/noise.png');
  await sharp(buffer, {
    raw: {
      width,
      height,
      channels,
    },
  })
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  console.log('✓ Generated 128x128 hardware-tiled noise PNG at', outPath);
}

generateNoisePng().catch(console.error);
