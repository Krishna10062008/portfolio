/**
 * Privacy Verification Script (npm run check:privacy)
 *
 * Scans all built assets in dist/ for:
 * 1. The exact WHATSAPP_NUMBER value (if set in env)
 * 2. Any 10-digit Indian mobile phone number: [6-9][0-9]{9}
 *    (Ensures floating point shader decimals like 0.9478672986 are not misidentified)
 *
 * Fails the build (exit code 1) on any match to guarantee zero phone leakage.
 */

import fs from 'fs';
import path from 'path';

const distDir = path.resolve(process.cwd(), 'dist');

if (!fs.existsSync(distDir)) {
  console.error('✗ dist/ directory not found. Run npm run build first.');
  process.exit(1);
}

const envPhone = process.env.WHATSAPP_NUMBER?.replace(/[^0-9]/g, '');

// Indian mobile pattern: 10 digits starting with 6, 7, 8, or 9
// Negative lookbehind and lookahead to prevent false positives on floating point decimals (e.g. 0.9478672986 in shaders)
const indianPhoneRegex = /(?<![\.\d])[6-9]\d{9}(?![\.\d])/g;

let violationsCount = 0;

function scanDirectory(dir: string) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else {
      if (/\.(html|js|css|json|txt|svg|map)$/i.test(file)) {
        const content = fs.readFileSync(fullPath, 'utf8');

        // 1. Check for specific env variable number if present
        if (envPhone && envPhone.length >= 8 && content.includes(envPhone)) {
          console.error(
            `\n🚨 PRIVACY LEAK DETECTED in ${path.relative(process.cwd(), fullPath)}:`
          );
          console.error(`Found exact WHATSAPP_NUMBER in client bundle.`);
          violationsCount++;
        }

        // 2. Check for Indian mobile numbers
        const matches = content.match(indianPhoneRegex);
        if (matches && matches.length > 0) {
          console.error(
            `\n🚨 PRIVACY LEAK DETECTED in ${path.relative(process.cwd(), fullPath)}:`
          );
          console.error(
            `Found Indian mobile number pattern(s): ${matches.join(', ')}`
          );
          violationsCount++;
        }
      }
    }
  }
}

console.log('--- Running Privacy Audit on dist/ ---');
scanDirectory(distDir);

if (violationsCount > 0) {
  console.error(`\n✗ Privacy check failed with ${violationsCount} violation(s). Build aborted.`);
  process.exit(1);
} else {
  console.log('✓ Privacy check passed! Zero phone numbers detected in dist/.');
  process.exit(0);
}
