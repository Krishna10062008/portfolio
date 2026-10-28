/**
 * Image processing pipeline.
 * Converts new cropped portrait image to AVIF and WebP formats at 3 standard widths (480w, 800w, 1200w).
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputImagePath = path.resolve(process.cwd(), 'public/assets/aistudio/image_3129c4f9.png');
const outputDir = path.resolve(process.cwd(), 'public/assets/generated');

const WIDTHS = [480, 800, 1200];

async function processImages() {
  if (!fs.existsSync(inputImagePath)) {
    console.error(`Input image not found at ${inputImagePath}`);
    process.exit(1);
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Starting image processing pipeline for new cropped comic portrait...');

  for (const width of WIDTHS) {
    // Generate WebP
    const webpOutput = path.join(outputDir, `portrait-${width}.webp`);
    await sharp(inputImagePath)
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(webpOutput);
    console.log(`✓ Generated ${path.basename(webpOutput)}`);

    // Generate AVIF
    const avifOutput = path.join(outputDir, `portrait-${width}.avif`);
    await sharp(inputImagePath)
      .resize(width, null, { withoutEnlargement: true })
      .avif({ quality: 78, effort: 4 })
      .toFile(avifOutput);
    console.log(`✓ Generated ${path.basename(avifOutput)}`);
  }

  console.log('✓ Image pipeline completed successfully with new cropped portrait.');
}

processImages().catch((err) => {
  console.error('Image processing failed:', err);
  process.exit(1);
});
