import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

async function processAssets() {
  console.log('--- Processing Thanos Gauntlet & ZeroStreamz Logo ---');

  // 1. Process ZeroStreamz logo: trim transparent padding and save high-res trimmed logo
  const logoPath = path.resolve('public/assets/aistudio/image_b368b05c.png');
  const logoOutPath = path.resolve('public/assets/aistudio/zerostreamz_logo.png');
  await sharp(logoPath)
    .trim()
    .png({ quality: 100 })
    .toFile(logoOutPath);
  console.log('✓ Trimmed ZeroStreamz logo saved to', logoOutPath);

  // 2. Process Thanos Gauntlet: remove the tan/yellow background
  const thanosPath = path.resolve('public/assets/aistudio/image_d35acc77.png');
  const thanosOutPath = path.resolve('public/assets/aistudio/thanos_gauntlet.png');

  const { data, info } = await sharp(thanosPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  // Background color is approximately [233, 207, 141]
  // We'll perform a flood fill starting from all 4 borders to avoid affecting any internal golden highlights inside the gauntlet.
  const visited = new Uint8Array(width * height);
  const queue: number[] = [];

  const isBgColor = (idx: number) => {
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    // Color distance to [233, 207, 141]
    const dr = r - 233;
    const dg = g - 207;
    const db = b - 141;
    const distSq = dr * dr + dg * dg + db * db;
    // The background is very uniform, distSq < 1500 covers all subtle compression artifacts of the yellow bg
    return distSq < 1800;
  };

  // Push seed points along perimeter (with 4px inset to bypass any edge line artifacts)
  for (let x = 0; x < width; x++) {
    for (const y of [0, 1, 2, 3, 4, height - 5, height - 4, height - 3, height - 2, height - 1]) {
      const p = y * width + x;
      if (!visited[p] && isBgColor(p * 4)) {
        visited[p] = 1;
        queue.push(p);
      }
    }
  }

  for (let y = 0; y < height; y++) {
    for (const x of [0, 1, 2, 3, 4, width - 5, width - 4, width - 3, width - 2, width - 1]) {
      const p = y * width + x;
      if (!visited[p] && isBgColor(p * 4)) {
        visited[p] = 1;
        queue.push(p);
      }
    }
  }

  // Also clear any 1-2px border artifact on the rightmost 3 columns
  for (let y = 0; y < height; y++) {
    for (let x = width - 3; x < width; x++) {
      const p = y * width + x;
      visited[p] = 1;
      queue.push(p);
    }
  }


  // BFS Flood Fill
  let head = 0;
  while (head < queue.length) {
    const curr = queue[head++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    // Make transparent
    data[curr * 4 + 3] = 0;

    // Check 4-connected neighbors
    const neighbors = [
      cx > 0 ? curr - 1 : -1,
      cx < width - 1 ? curr + 1 : -1,
      cy > 0 ? curr - width : -1,
      cy < height - 1 ? curr + width : -1,
    ];

    for (const n of neighbors) {
      if (n !== -1 && !visited[n]) {
        if (isBgColor(n * 4)) {
          visited[n] = 1;
          queue.push(n);
        }
      }
    }
  }

  // Clean anti-aliased edge: for any boundary pixel right next to visited bg, feather alpha slightly if it was near bg
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      if (!visited[idx]) {
        // check if neighbor was visited
        const hasBgNeighbor =
          visited[idx - 1] || visited[idx + 1] || visited[idx - width] || visited[idx + width];
        if (hasBgNeighbor) {
          const r = data[idx * 4];
          const g = data[idx * 4 + 1];
          const b = data[idx * 4 + 2];
          const dr = r - 233;
          const dg = g - 207;
          const db = b - 141;
          const distSq = dr * dr + dg * dg + db * db;
          if (distSq < 2500) {
            data[idx * 4 + 3] = 0;
          }
        }
      }
    }
  }

  // Save the raw buffer with transparent background, then trim to the gauntlet
  const rawPng = await sharp(data, {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .trim()
    .png({ quality: 100 })
    .toFile(thanosOutPath);

  console.log('✓ Trimmed Transparent Thanos Gauntlet saved to', thanosOutPath);
}

processAssets().catch(console.error);
