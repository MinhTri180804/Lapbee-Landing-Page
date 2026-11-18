/**
 * Lỗi khi gọi backend. Mọi lỗi đều được THROW (không trả dữ liệu rỗng) để Next.js
 * giữ bản cache tốt gần nhất. Riêng `ApiNotFoundError` → trang gọi `notFound()`.
 * Không đưa token/secret vào message.
 */
export class ApiError extends Error {
  readonly url: string;
  constructor(message: string, url: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = new.target.name;
    this.url = url;
  }
}

/** Backend trả 404. */
export class ApiNotFoundError extends ApiError {}

/** Backend trả status không phải 2xx (khác 404). */
export class ApiHttpError extends ApiError {
  readonly status: number;
  constructor(status: number, url: string) {
    super(`Backend trả HTTP ${status}: ${url}`, url);
    this.status = status;
  }
}

/** Quá thời gian chờ (mặc định 8 giây). */
export class ApiTimeoutError extends ApiError {}

/** Không kết nối được (DNS, từ chối kết nối, mạng). */
export class ApiNetworkError extends ApiError {}

/** Response không phải JSON hoặc sai schema. */
export class ApiInvalidResponseError extends ApiError {}

export function isApiNotFound(error: unknown): error is ApiNotFoundError {
  return error instanceof ApiNotFoundError;
}
