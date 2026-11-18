#!/usr/bin/env node
/**
 * Chụp ảnh OG mặc định từ trang dev /_styleguide/og bằng Chrome headless (font và màu thật của site):
 *
 *   npm run dev            # terminal khác
 *   node scripts/og-image.mjs [http://localhost:3000]
 *
 * Kết quả: public/og-default.png (1200×630), được commit. Chạy lại khi đổi tiêu đề hero hoặc logo.
 * CHROME_PATH để chỉ định trình duyệt (mặc định Google Chrome trên macOS).
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = process.argv[2] ?? 'http://localhost:3000';
const CHROME =
  process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = join(ROOT, 'public/og-default.png');

const dir = mkdtempSync(join(tmpdir(), 'lapbee-og-'));
const shot = join(dir, 'shot.png');
try {
  execFileSync(
    CHROME,
    [
      '--headless=new',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--window-size=1200,630',
      // Chờ font tải xong và hiệu ứng vào trang chạy hết.
      '--virtual-time-budget=4000',
      `--user-data-dir=${join(dir, 'profile')}`,
      `--screenshot=${shot}`,
      `${BASE}/_styleguide/og`,
    ],
    { stdio: 'ignore' },
  );
  const png = await sharp(shot)
    .resize(1200, 630)
    .png({ compressionLevel: 9, palette: true, quality: 92 })
    .toBuffer();
  writeFileSync(OUT, png);
  console.log(`public/og-default.png  ${(png.length / 1024).toFixed(1)} KB`);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
