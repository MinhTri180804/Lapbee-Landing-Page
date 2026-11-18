import 'server-only';

import { z } from 'zod';

import { getServerEnv } from '@/lib/env';

import {
  ApiHttpError,
  ApiInvalidResponseError,
  ApiNetworkError,
  ApiNotFoundError,
  ApiTimeoutError,
} from './errors';
import { inlineMockResponse } from './inline-mock';
import { DEFAULT_REVALIDATE_SECONDS } from './tags';

export type ApiGetOptions<T> = {
  /** Schema zod để validate response. Sai schema → throw. */
  schema: z.ZodType<T>;
  /** Tag cache để revalidate theo yêu cầu (xem `cacheTags`). Bắt buộc khi có cache. */
  tags: readonly string[];
  /**
   * Thời gian cache (giây). Mặc định 3600.
   * `0` → không cache (`no-store`), dùng cho kết quả tìm kiếm.
   */
  revalidate?: number;
  /** Query string; giá trị undefined bị bỏ qua. */
  query?: Record<string, string | number | undefined>;
};

/**
 * GET JSON từ backend — mọi request tới backend đi qua đây.
 *
 * - Base URL, token, timeout lấy từ env (lib/env.ts).
 * - Cache: `force-cache` + `next.revalidate` + `next.tags` (Next 16: cache là opt-in).
 * - Timeout 8s: `AbortSignal.timeout` + một bộ hẹn giờ riêng — Next bỏ `signal` khi revalidate nền
 *   bản cache đã cũ, nên chỉ `signal` là không đủ.
 * - Lỗi (status ≠ 2xx, timeout, mạng, JSON hỏng, sai schema) → throw; 404 → `ApiNotFoundError`.
 *
 * Lưu ý: truyền `signal` làm Next tắt memoization của fetch; các hàm gọi API nên bọc React `cache()`
 * để không gọi trùng trong một lần render (vd. generateMetadata + page).
 */
export async function apiGet<T>(path: string, options: ApiGetOptions<T>): Promise<T> {
  const env = getServerEnv();
  const url = buildUrl(env.apiBaseUrl, path, options.query);
  const revalidate = options.revalidate ?? DEFAULT_REVALIDATE_SECONDS;

  const headers: Record<string, string> = { Accept: 'application/json' };
  if (env.apiToken) headers.Authorization = `Bearer ${env.apiToken}`;

  const init: RequestInit =
    revalidate === 0
      ? { headers, cache: 'no-store' }
      : { headers, cache: 'force-cache', next: { revalidate, tags: [...options.tags] } };

  // Preview/demo (MOCK_API_INLINE): dữ liệu mẫu trong tiến trình, không fetch → trang thành SSG thuần.
  const response = env.mockApiInline
    ? await inlineMockResponse(new URL(url))
    : await fetchBackend(url, init, env.apiTimeoutMs);

  if (response.status === 404) {
    // Không log: 404 là tình huống bình thường (bài viết không tồn tại).
    throw new ApiNotFoundError(`Không tìm thấy: ${url}`, url);
  }
  if (!response.ok) throw logged(new ApiHttpError(response.status, url));

  let json: unknown;
  try {
    json = await response.json();
  } catch (error) {
    throw logged(
      new ApiInvalidResponseError(`Response không phải JSON: ${url}`, url, { cause: error }),
    );
  }

  const parsed = options.schema.safeParse(json);
  if (!parsed.success) {
    throw logged(
      new ApiInvalidResponseError(
        `Response sai schema: ${url}\n${z.prettifyError(parsed.error)}`,
        url,
      ),
    );
  }
  return parsed.data;
}

/** fetch tới backend kèm timeout; lỗi mạng/timeout → ApiNetworkError / ApiTimeoutError (đã log). */
async function fetchBackend(url: string, init: RequestInit, timeoutMs: number): Promise<Response> {
  try {
    return await withTimeout((signal) => fetch(url, { ...init, signal }), timeoutMs, url);
  } catch (error) {
    if (error instanceof ApiTimeoutError) throw logged(error);
    if (isAbortTimeout(error)) {
      throw logged(new ApiTimeoutError(`Hết thời gian chờ ${timeoutMs}ms: ${url}`, url));
    }
    throw logged(new ApiNetworkError(`Không kết nối được backend: ${url}`, url, { cause: error }));
  }
}

function buildUrl(base: string, path: string, query?: ApiGetOptions<unknown>['query']): string {
  const url = new URL(`${base}${path.startsWith('/') ? path : `/${path}`}`);
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== '') url.searchParams.set(key, String(value));
  }
  return url.toString();
}

/** Chạy `run` với AbortSignal hết hạn sau `ms`, đồng thời tự reject sau `ms` (phòng khi signal bị bỏ). */
async function withTimeout<T>(
  run: (signal: AbortSignal) => Promise<T>,
  ms: number,
  url: string,
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const guard = new Promise<never>((_, reject) => {
    timer = setTimeout(
      () => reject(new ApiTimeoutError(`Hết thời gian chờ ${ms}ms: ${url}`, url)),
      ms,
    );
  });
  try {
    return await Promise.race([run(AbortSignal.timeout(ms)), guard]);
  } finally {
    clearTimeout(timer);
  }
}

function isAbortTimeout(error: unknown): boolean {
  return error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError');
}

/** Ghi một dòng log ngắn (không có token) rồi trả lại lỗi để throw. */
function logged<E extends Error>(error: E): E {
  console.error(`[api] ${error.name}: ${error.message.split('\n')[0]}`);
  return error;
}
