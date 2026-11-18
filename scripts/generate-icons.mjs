#!/usr/bin/env node
/**
 * Sinh icon của site từ public/brand/logo-mark.png (chạy tay khi logo đổi, kết quả được commit):
 *
 *   node scripts/generate-icons.mjs
 *
 *   app/icon.png        192×192, nền trong suốt     → <link rel="icon" type="image/png">
 *   app/apple-icon.png  180×180, nền giấy #faf9f5   → <link rel="apple-touch-icon"> (iOS cần nền đặc)
 *   app/favicon.ico     16 + 32 px (PNG trong ICO)  → /favicon.ico cho trình duyệt/bot cũ
 *
 * Dùng `sharp` (đi kèm Next). Next tự gắn thẻ <link> cho các file trên (file convention).
 */
import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = join(ROOT, 'public/brand/logo-mark.png');
const PAPER = '#faf9f5';
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

/** Logo đặt giữa khung vuông `size`, chừa lề `padding` (tỉ lệ cạnh). */
async function square(size, padding, background) {
  const inner = Math.round(size * (1 - 2 * padding));
  const mark = await sharp(SOURCE)
    .resize(inner, inner, { fit: 'contain', background: TRANSPARENT })
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: mark, gravity: 'center' }])
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toBuffer();
}

/** File ICO chứa ảnh PNG (hỗ trợ từ Windows Vista, mọi trình duyệt hiện đại). */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + 16 * images.length;
  const entries = images.map(({ size, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // color planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const outputs = {
  'app/icon.png': await square(192, 0.04, TRANSPARENT),
  'app/apple-icon.png': await square(180, 0.12, PAPER),
  'app/favicon.ico': ico([
    { size: 16, data: await square(16, 0, TRANSPARENT) },
    { size: 32, data: await square(32, 0.02, TRANSPARENT) },
  ]),
};

for (const [file, data] of Object.entries(outputs)) {
  await writeFile(join(ROOT, file), data);
  console.log(`${file}  ${(data.length / 1024).toFixed(1)} KB`);
}
