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
    /** Timeout gọi backend (ms). Mặc định 8000; chỉ hạ thấp khi chạy test. */
    BACKEND_TIMEOUT_MS: optional(z.coerce.number().int().min(100).max(60_000)),
  })
  .refine((env) => env.USE_MOCK_API || env.API_BASE_URL, {
    message: 'Cần API_BASE_URL khi USE_MOCK_API không bật',
    path: ['API_BASE_URL'],
  })
  .transform((env) => ({
    siteUrl: env.SITE_URL.replace(/\/+$/, ''),
    apiBaseUrl: (env.API_BASE_URL ?? MOCK_API_BASE_URL).replace(/\/+$/, ''),
    apiToken: env.API_TOKEN,
    revalidateSecret: env.REVALIDATE_SECRET,
    useMockApi: env.USE_MOCK_API,
    apiTimeoutMs: env.BACKEND_TIMEOUT_MS ?? DEFAULT_BACKEND_TIMEOUT_MS,
  }));

export type ServerEnv = z.infer<typeof EnvSchema>;

export function getServerEnv(): ServerEnv {
  const result = EnvSchema.safeParse(process.env);
  if (!result.success) {
    throw new Error(`Biến môi trường không hợp lệ:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}
