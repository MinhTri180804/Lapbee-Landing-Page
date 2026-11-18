import type { NextConfig } from 'next';

import { getRedirects, getRewrites } from './lib/routes';

/**
 * Các biến dưới đây được đọc LÚC BUILD (giá trị được đóng gói vào bản standalone).
 * Đổi chúng trên hosting không có tác dụng — phải build lại.
 */
const imageUnoptimized = process.env.IMAGE_UNOPTIMIZED === 'true';
const logFetches = process.env.LOG_FETCHES === 'true';
/** Chế độ mock (chỉ dev/test): cho phép ảnh từ mock server trên localhost. */
const useMockApi = process.env.USE_MOCK_API === 'true';
const MOCK_ORIGINS = ['http://localhost:4010', 'http://127.0.0.1:4010'];

/** Host ảnh từ backend: host của API_BASE_URL + danh sách IMAGE_HOSTS (phân tách bằng dấu phẩy). */
function imageRemotePatterns(): URL[] {
  const origins = [
    process.env.API_BASE_URL,
    ...(process.env.IMAGE_HOSTS ?? '').split(','),
    ...(useMockApi ? MOCK_ORIGINS : []),
  ]
    .map((v) => v?.trim())
    .filter((v): v is string => Boolean(v));
  const unique = new Set<string>();
  for (const origin of origins) {
    try {
      unique.add(new URL(origin).origin);
    } catch {
      throw new Error(`IMAGE_HOSTS/API_BASE_URL không phải URL hợp lệ: ${origin}`);
    }
  }
  return [...unique].map((origin) => new URL(`${origin}/**`));
}

// Cố định thư mục gốc dự án (máy dev có thể có package-lock.json ở thư mục cha).
const projectRoot = __dirname;

const nextConfig: NextConfig = {
  output: 'standalone',
  turbopack: { root: projectRoot },
  outputFileTracingRoot: projectRoot,
  // Tắt cache trong bộ nhớ: mọi instance Passenger dùng chung cache trên ổ đĩa.
  cacheMaxMemorySize: 0,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: imageUnoptimized,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: imageRemotePatterns(),
    // Bộ tối ưu ảnh mặc định chặn IP nội bộ (chống SSRF). Chỉ mở khi chạy với mock trên localhost.
    ...(useMockApi ? { dangerouslyAllowLocalIP: true } : {}),
  },
  ...(logFetches ? { logging: { fetches: { fullUrl: true } } } : {}),
  rewrites: async () => getRewrites(),
  redirects: async () => getRedirects(),
};

export default nextConfig;
