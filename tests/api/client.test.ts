import { afterEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

import { apiGet } from '@/lib/api/client';
import {
  ApiHttpError,
  ApiInvalidResponseError,
  ApiNetworkError,
  ApiNotFoundError,
  ApiTimeoutError,
} from '@/lib/api/errors';

const Schema = z.object({ ok: z.boolean() });

function stubFetch(impl: (url: string, init: RequestInit) => Promise<Response>) {
  const fn = vi.fn(impl);
  vi.stubGlobal('fetch', fn);
  return fn;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe('apiGet', () => {
  it('gọi đúng URL, gắn tags + revalidate 3600 + force-cache + signal', async () => {
    vi.stubEnv('API_BASE_URL', 'https://api.example.com/v1/');
    const fetchMock = stubFetch(async () => json({ ok: true }));
    const data = await apiGet('/pages/home', { schema: Schema, tags: ['pages', 'page:home'] });

    expect(data).toEqual({ ok: true });
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe('https://api.example.com/v1/pages/home');
    expect(init.cache).toBe('force-cache');
    expect(init.next).toEqual({ revalidate: 3600, tags: ['pages', 'page:home'] });
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it('gửi Bearer token khi có API_TOKEN', async () => {
    vi.stubEnv('API_TOKEN', 'secret-token');
    const fetchMock = stubFetch(async () => json({ ok: true }));
    await apiGet('/x', { schema: Schema, tags: ['t'] });
    const headers = fetchMock.mock.calls[0]![1].headers as Record<string, string>;
    expect(headers.Authorization).toBe('Bearer secret-token');
  });

  it('revalidate 0 → no-store, không gắn next', async () => {
    const fetchMock = stubFetch(async () => json({ ok: true }));
    await apiGet('/x', {
      schema: Schema,
      tags: [],
      revalidate: 0,
      query: { q: 'pin', page: 2, x: undefined },
    });
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe('http://localhost:4010/x?q=pin&page=2');
    expect(init.cache).toBe('no-store');
    expect(init.next).toBeUndefined();
  });

  it('404 → ApiNotFoundError', async () => {
    stubFetch(async () => json({ error: 'nf' }, 404));
    await expect(apiGet('/x', { schema: Schema, tags: [] })).rejects.toBeInstanceOf(
      ApiNotFoundError,
    );
  });

  it('500 → ApiHttpError (throw, không trả dữ liệu rỗng)', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    stubFetch(async () => json({ error: 'boom' }, 500));
    const error = await apiGet('/x', { schema: Schema, tags: [] }).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(ApiHttpError);
    expect((error as ApiHttpError).status).toBe(500);
  });

  it('sai schema → ApiInvalidResponseError', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    stubFetch(async () => json({ ok: 'yes' }));
    await expect(apiGet('/x', { schema: Schema, tags: [] })).rejects.toBeInstanceOf(
      ApiInvalidResponseError,
    );
  });

  it('không phải JSON → ApiInvalidResponseError', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    stubFetch(async () => new Response('<html>', { status: 200 }));
    await expect(apiGet('/x', { schema: Schema, tags: [] })).rejects.toBeInstanceOf(
      ApiInvalidResponseError,
    );
  });

  it('lỗi mạng → ApiNetworkError', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    stubFetch(async () => {
      throw new TypeError('fetch failed');
    });
    await expect(apiGet('/x', { schema: Schema, tags: [] })).rejects.toBeInstanceOf(
      ApiNetworkError,
    );
  });

  it('timeout → ApiTimeoutError, kể cả khi fetch bỏ qua signal', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    vi.stubEnv('BACKEND_TIMEOUT_MS', '150');
    // fetch không bao giờ trả lời và không nghe signal (giống lúc Next revalidate nền)
    stubFetch(() => new Promise<Response>(() => undefined));
    const started = Date.now();
    await expect(apiGet('/x', { schema: Schema, tags: [] })).rejects.toBeInstanceOf(
      ApiTimeoutError,
    );
    expect(Date.now() - started).toBeLessThan(2000);
  });

  it('không log token', async () => {
    vi.stubEnv('API_TOKEN', 'super-secret-token-value');
    const log = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    stubFetch(async () => json({}, 500));
    await apiGet('/x', { schema: Schema, tags: [] }).catch(() => undefined);
    expect(log).toHaveBeenCalled();
    expect(JSON.stringify(log.mock.calls)).not.toContain('super-secret-token-value');
  });
});
