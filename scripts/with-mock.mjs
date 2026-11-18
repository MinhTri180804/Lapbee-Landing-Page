#!/usr/bin/env node
/**
 * Chạy một lệnh trong lúc mock backend đang chạy, rồi tắt mock.
 *   node scripts/with-mock.mjs npm run build
 * Đặt USE_MOCK_API=true cho lệnh con (API_BASE_URL bỏ trống → http://localhost:4010).
 * Dùng cho build/test ở máy dev hoặc CI khi chưa có backend thật.
 */
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const [command, ...args] = process.argv.slice(2);
if (!command) {
  console.error('Cách dùng: node scripts/with-mock.mjs <lệnh> [tham số…]');
  process.exit(2);
}

const mockPath = fileURLToPath(new URL('../mocks/server.mjs', import.meta.url));
const mock = spawn(process.execPath, [mockPath], {
  env: { ...process.env, MOCK_PORT: '4010' },
  stdio: ['ignore', 'pipe', 'inherit'],
});

const ready = new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error('Mock không khởi động sau 5s')), 5000);
  mock.stdout.on('data', (chunk) => {
    if (chunk.toString().includes('listening on')) {
      clearTimeout(timer);
      resolve();
    }
  });
  mock.on('exit', (code) => reject(new Error(`Mock thoát sớm (code ${code}) — cổng 4010 bận?`)));
});

try {
  await ready;
} catch (error) {
  console.error(`[with-mock] ${error.message}`);
  mock.kill();
  process.exit(1);
}

const child = spawn(command, args, {
  stdio: 'inherit',
  env: {
    ...process.env,
    USE_MOCK_API: 'true',
    SITE_URL: process.env.SITE_URL ?? 'http://localhost:3000',
  },
});
child.on('exit', (code) => {
  mock.kill();
  process.exit(code ?? 1);
});
