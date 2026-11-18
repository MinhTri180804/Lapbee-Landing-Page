import 'server-only';

import { z } from 'zod';

/**
 * Biến môi trường phía server, validate bằng zod.
 * Đọc lại mỗi lần gọi (không giữ state trong module) — rẻ và an toàn khi Passenger chạy nhiều instance.
 * Chuỗi rỗng trong `.env` được coi như không khai báo.
 *
 * Lưu ý: `IMAGE_UNOPTIMIZED` và `IMAGE_HOSTS` được đọc trong `next.config.ts` lúc build,
 * không đọc ở đây (xem `.env.example`).
 */

const MOCK_API_BASE_URL = 'http://localhost:4010';
const DEFAULT_BACKEND_TIMEOUT_MS = 8000;

const optional = <T extends z.ZodType>(schema: T) =>
  z.preprocess((v) => (v === '' ? undefined : v), schema.optional());

const flag = z.preprocess(
  (v) => (v === '' || v === undefined ? 'false' : v),
  z.enum(['true', 'false', '1', '0']).transform((v) => v === 'true' || v === '1'),
);

const EnvSchema = z
  .object({
    SITE_URL: z.url(),
    API_BASE_URL: optional(z.url()),
    API_TOKEN: optional(z.string().min(1)),
    REVALIDATE_SECRET: optional(z.string().min(32, 'REVALIDATE_SECRET cần tối thiểu 32 ký tự')),
    USE_MOCK_API: flag,
    /** Dữ liệu mẫu đóng gói sẵn, không gọi mạng (preview/demo — lib/api/inline-mock.ts). */
    MOCK_API_INLINE: flag,
    /** Chặn bot index toàn site (bản preview/staging). Tự bật khi MOCK_API_INLINE. */
    SITE_NOINDEX: flag,
    /** Timeout gọi backend (ms). Mặc định 8000; chỉ hạ thấp khi chạy test. */
    BACKEND_TIMEOUT_MS: optional(z.coerce.number().int().min(100).max(60_000)),
  })
  .refine((env) => env.USE_MOCK_API || env.MOCK_API_INLINE || env.API_BASE_URL, {
    message: 'Cần API_BASE_URL khi USE_MOCK_API / MOCK_API_INLINE không bật',
    path: ['API_BASE_URL'],
  })
  .transform((env) => ({
    siteUrl: env.SITE_URL.replace(/\/+$/, ''),
    apiBaseUrl: (env.API_BASE_URL ?? MOCK_API_BASE_URL).replace(/\/+$/, ''),
    apiToken: env.API_TOKEN,
    revalidateSecret: env.REVALIDATE_SECRET,
    useMockApi: env.USE_MOCK_API || env.MOCK_API_INLINE,
    mockApiInline: env.MOCK_API_INLINE,
    noindex: env.SITE_NOINDEX || env.MOCK_API_INLINE,
    apiTimeoutMs: env.BACKEND_TIMEOUT_MS ?? DEFAULT_BACKEND_TIMEOUT_MS,
  }));

export type ServerEnv = z.infer<typeof EnvSchema>;

/**
 * Trên Vercel: SITE_URL bỏ trống → dùng domain production của project (hoặc URL của deployment).
 * Hai biến VERCEL_* do Vercel tự đặt. Hosting khác (cPanel) vẫn phải khai báo SITE_URL.
 */
function vercelSiteUrl(): string | undefined {
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  return host ? `https://${host}` : undefined;
}

export function getServerEnv(): ServerEnv {
  const result = EnvSchema.safeParse({
    ...process.env,
    SITE_URL: process.env.SITE_URL || vercelSiteUrl(),
  });
  if (!result.success) {
    throw new Error(`Biến môi trường không hợp lệ:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}
