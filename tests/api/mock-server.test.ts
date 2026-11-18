/**
 * Chạy mocks/server.mjs thật (cổng ngẫu nhiên) và gọi qua content layer + lib/api,
 * để kiểm tra apiSource chạy được với mock và các tình huống backend lỗi.
 */
import { spawn, type ChildProcess } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { apiSource } from '@/content/adapters/api';
import { staticSource } from '@/content/adapters/static';
import { resolvePageContent } from '@/content/resolve';
import { ApiHttpError, ApiNetworkError, ApiNotFoundError, ApiTimeoutError } from '@/lib/api/errors';
import { getCategories, getPost, getPostSlugs, getPosts } from '@/lib/api/posts';

const SERVER = fileURLToPath(new URL('../../mocks/server.mjs', import.meta.url));
let child: ChildProcess;
let baseUrl: string;

async function setFail(mode: string | null) {
  const res = await fetch(`${baseUrl}/__mock/fail`, {
    method: 'POST',
    body: JSON.stringify({ mode }),
  });
  expect(res.ok).toBe(true);
}

beforeAll(async () => {
  child = spawn(process.execPath, [SERVER], { env: { ...process.env, MOCK_PORT: '0' } });
  baseUrl = await new Promise<string>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('mock server không khởi động')), 5000);
    child.stdout!.on('data', (chunk: Buffer) => {
      const match = /listening on (http:\/\/[\d.]+:\d+)/.exec(chunk.toString());
      if (match) {
        clearTimeout(timer);
        resolve(match[1]!);
      }
    });
  });
});

afterAll(() => {
  child?.kill();
});

afterEach(async () => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
  await setFail(null);
});

const homeWithHeroFromApi = () =>
  resolvePageContent(
    'home',
    { default: 'static', sections: { hero: 'api' } },
    { staticSource, apiSource },
  );

describe('apiSource + mock server', () => {
  it('home.hero lấy từ GET /pages/home của mock', async () => {
    vi.stubEnv('API_BASE_URL', baseUrl);
    const page = await homeWithHeroFromApi();
    expect(page.sections.hero.lead).toContain('[MOCK API]');
    expect(page.sections.services.title).toBe('Dịch vụ'); // các section khác vẫn static
  });

  it('trang không có trên backend → ApiNotFoundError', async () => {
    vi.stubEnv('API_BASE_URL', baseUrl);
    await expect(apiSource.getPage('team')).rejects.toBeInstanceOf(ApiNotFoundError);
  });

  it('mock trả 500 → throw ApiHttpError', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    vi.stubEnv('API_BASE_URL', baseUrl);
    await setFail('500');
    await expect(homeWithHeroFromApi()).rejects.toBeInstanceOf(ApiHttpError);
  });

  it('mock trả sai schema → throw', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    vi.stubEnv('API_BASE_URL', baseUrl);
    await setFail('bad-schema');
    await expect(homeWithHeroFromApi()).rejects.toThrow(/sai schema/);
  });

  it('mock treo → ApiTimeoutError', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    vi.stubEnv('API_BASE_URL', baseUrl);
    vi.stubEnv('BACKEND_TIMEOUT_MS', '300');
    await setFail('timeout');
    await expect(homeWithHeroFromApi()).rejects.toBeInstanceOf(ApiTimeoutError);
  });

  it('backend chết (đóng kết nối) → ApiNetworkError', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    vi.stubEnv('API_BASE_URL', baseUrl);
    await setFail('down');
    await expect(homeWithHeroFromApi()).rejects.toBeInstanceOf(ApiNetworkError);
  });
});

describe('blog API (lib/api/posts) + mock server', () => {
  it('getPosts: phân trang, lọc danh mục, tìm kiếm không dấu; bỏ bài draft', async () => {
    vi.stubEnv('API_BASE_URL', baseUrl);
    const first = await getPosts(1, 6);
    expect(first.items).toHaveLength(6);
    expect(first.total).toBe(18);
    expect(first.totalPages).toBe(3);
    expect(first.items.some((p) => p.slug === 'ban-nhap-chua-dang')).toBe(false);
    expect(first.items[0]!.cover.url).toMatch(/^http:\/\/127\.0\.0\.1:\d+\/images\//);

    const tips = await getPosts(1, 6, 'meo-hay');
    expect(tips.items.every((p) => p.category?.slug === 'meo-hay')).toBe(true);

    const search = await getPosts(1, 6, undefined, 'pin laptop');
    expect(search.items.map((p) => p.slug)).toContain('5-dau-hieu-pin-laptop-can-duoc-thay');
    const noAccent = await getPosts(1, 6, undefined, 've sinh');
    expect(noAccent.total).toBeGreaterThan(0);
  });

  it('getPost: bài markdown và bài draft (status draft — trang tự 404)', async () => {
    vi.stubEnv('API_BASE_URL', baseUrl);
    const md = await getPost('chuan-bi-gi-truoc-khi-mang-may-di-sua');
    expect(md.contentFormat).toBe('markdown');
    expect((await getPost('ban-nhap-chua-dang')).status).toBe('draft');
    await expect(getPost('khong-ton-tai')).rejects.toBeInstanceOf(ApiNotFoundError);
  });

  it('getPostSlugs chỉ có bài published; getCategories đếm đúng', async () => {
    vi.stubEnv('API_BASE_URL', baseUrl);
    const slugs = await getPostSlugs();
    expect(slugs).toHaveLength(18);
    const cats = await getCategories();
    expect(cats.map((c) => c.slug)).toEqual(['huong-dan', 'meo-hay', 'tin-tuc', 'khuyen-mai']);
    expect(cats.reduce((n, c) => n + c.count, 0)).toBe(18);
  });

  it('mock trả sai schema → getPost throw', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    vi.stubEnv('API_BASE_URL', baseUrl);
    await setFail('bad-schema');
    await expect(getPost('5-dau-hieu-pin-laptop-can-duoc-thay')).rejects.toThrow(/sai schema/);
  });
});
