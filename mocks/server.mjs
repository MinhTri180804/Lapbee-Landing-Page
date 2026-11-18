#!/usr/bin/env node
/**
 * Mock backend cho dev/test — Node thuần, không dependency.
 *
 *   node mocks/server.mjs                 # cổng 4010 (MOCK_PORT để đổi; 0 = cổng ngẫu nhiên)
 *
 * Endpoint (hợp đồng: docs/CONTENT_LAYER.md, mục 7 của brief):
 *   GET  /health                → { ok: true }
 *   GET  /pages/:slug           → mocks/data/pages/<slug>.json, 404 nếu không có
 *   GET  /site                  → mocks/data/site.json, 404 nếu không có
 *   GET  /posts?page=&limit=&category=&q=  → { items: PostSummary[], page, totalPages, total }
 *   GET  /posts/slugs           → { items: { slug, updatedAt }[] } (chỉ bài published)
 *   GET  /posts/:slug           → Post (kể cả bài draft — frontend phải tự 404), 404 nếu không có
 *   GET  /categories            → { items: { slug, name, count }[] } (đếm bài published)
 *   GET  /images/<file>.webp    → ảnh trong mocks/data/images/
 *
 * Dữ liệu mẫu đặc biệt trong posts.json: `chuan-bi-gi-truoc-khi-mang-may-di-sua` (markdown),
 * `mau-kiem-tra-sanitize-html` (HTML độc hại để thử sanitize), `ban-nhap-chua-dang` (draft).
 *
 * Giả lập sự cố (dùng để kiểm tra "API lỗi → giữ cache cũ"):
 *   MOCK_FAIL=500|timeout|bad-schema|down   khi khởi động, hoặc lúc đang chạy:
 *   curl -X POST localhost:4010/__mock/fail -d '{"mode":"500"}'   (mode null = bình thường)
 *   MOCK_DELAY_MS=300                       thêm độ trễ cho mọi response
 *
 * Dữ liệu đọc lại từ đĩa mỗi request → sửa file JSON là thấy ngay (để thử revalidate).
 */
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA_DIR = join(dirname(fileURLToPath(import.meta.url)), 'data');
const PORT = Number(process.env.MOCK_PORT ?? 4010);
const DELAY_MS = Number(process.env.MOCK_DELAY_MS ?? 0);
const FAIL_MODES = new Set(['500', 'timeout', 'bad-schema', 'down']);

let failMode = FAIL_MODES.has(process.env.MOCK_FAIL ?? '') ? process.env.MOCK_FAIL : null;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function send(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

async function readJson(relativePath) {
  try {
    return JSON.parse(await readFile(join(DATA_DIR, relativePath), 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return undefined;
    throw error;
  }
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf8');
}

const SLUG = /^[a-z0-9-]+$/;

async function route(req, res, url) {
  if (req.method === 'POST' && url.pathname === '/__mock/fail') {
    const { mode = null } = JSON.parse((await readBody(req)) || '{}');
    if (mode !== null && !FAIL_MODES.has(mode))
      return send(res, 400, { error: 'mode không hợp lệ' });
    failMode = mode;
    return send(res, 200, { failMode });
  }
  if (req.method !== 'GET') return send(res, 405, { error: 'Method not allowed' });
  if (url.pathname === '/health') return send(res, 200, { ok: true, failMode });

  if (failMode === 'down') {
    req.socket.destroy(); // giả lập backend chết: đóng kết nối không trả lời
    return;
  }
  if (failMode === 'timeout') return; // không bao giờ trả lời
  if (failMode === '500') return send(res, 500, { error: 'Mock lỗi 500' });
  if (failMode === 'bad-schema') return send(res, 200, { sections: { hero: { title: 42 } } });

  const page = url.pathname.match(/^\/pages\/([^/]+)$/);
  if (page) {
    const slug = decodeURIComponent(page[1]);
    const data = SLUG.test(slug) ? await readJson(`pages/${slug}.json`) : undefined;
    return data ? send(res, 200, data) : send(res, 404, { error: 'Not found' });
  }
  if (url.pathname === '/site') {
    const data = await readJson('site.json');
    return data ? send(res, 200, data) : send(res, 404, { error: 'Not found' });
  }
  if (url.pathname === '/posts') return listPosts(req, res, url);
  if (url.pathname === '/posts/slugs') {
    const items = (await publishedPosts()).map((p) => ({ slug: p.slug, updatedAt: p.updatedAt }));
    return send(res, 200, { items });
  }
  const post = url.pathname.match(/^\/posts\/([^/]+)$/);
  if (post) {
    const slug = decodeURIComponent(post[1]);
    const { items } = (await readJson('posts.json')) ?? { items: [] };
    const found = SLUG.test(slug) ? items.find((p) => p.slug === slug) : undefined;
    return found ? send(res, 200, toPost(req, found)) : send(res, 404, { error: 'Not found' });
  }
  if (url.pathname === '/categories') return listCategories(res);

  const image = url.pathname.match(/^\/images\/([a-z0-9-]+\.webp)$/);
  if (image) {
    try {
      const file = await readFile(join(DATA_DIR, 'images', image[1]));
      res.writeHead(200, { 'Content-Type': 'image/webp', 'Cache-Control': 'public, max-age=3600' });
      return res.end(file);
    } catch {
      return send(res, 404, { error: 'Not found' });
    }
  }
  return send(res, 404, { error: 'Not found' });
}

/** Origin mà client dùng để gọi mock — để trả URL ảnh tuyệt đối như backend thật. */
const originOf = (req) => `http://${req.headers.host ?? `127.0.0.1:${PORT}`}`;

const absolutize = (req, cover) =>
  cover && cover.url.startsWith('/') ? { ...cover, url: `${originOf(req)}${cover.url}` } : cover;

/** Chỉ các field của PostSummary (danh sách không trả nội dung bài). */
const toSummary = (req, p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  cover: absolutize(req, p.cover),
  category: p.category,
  featured: p.featured,
  readingMinutes: p.readingMinutes,
  publishedAt: p.publishedAt,
  updatedAt: p.updatedAt,
});

/** Bài chi tiết: đủ field của Post (ảnh tuyệt đối). */
const toPost = (req, p) => ({
  ...toSummary(req, p),
  content: p.content,
  contentFormat: p.contentFormat,
  seo: p.seo,
  status: p.status,
});

/** Bài đã đăng, mới nhất trước. */
async function publishedPosts() {
  const { items } = (await readJson('posts.json')) ?? { items: [] };
  return items
    .filter((p) => p.status === 'published')
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** GET /categories → { items: { slug, name, count }[] } theo thứ tự xuất hiện. */
async function listCategories(res) {
  const counts = new Map();
  for (const p of await publishedPosts()) {
    if (!p.category) continue;
    const entry = counts.get(p.category.slug) ?? { ...p.category, count: 0 };
    entry.count += 1;
    counts.set(p.category.slug, entry);
  }
  const order = ['huong-dan', 'meo-hay', 'tin-tuc', 'khuyen-mai'];
  const items = [...counts.values()].sort(
    (a, b) => (order.indexOf(a.slug) + 1 || 99) - (order.indexOf(b.slug) + 1 || 99),
  );
  return send(res, 200, { items });
}

const normalize = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase();

/** GET /posts?page=&limit=&category=&q= → { items, page, totalPages } (mới nhất trước). */
async function listPosts(req, res, url) {
  const items = await publishedPosts();
  const page = Math.max(1, Number.parseInt(url.searchParams.get('page') ?? '1', 10) || 1);
  const limit = Math.min(
    50,
    Math.max(1, Number.parseInt(url.searchParams.get('limit') ?? '10', 10) || 10),
  );
  const category = url.searchParams.get('category');
  const q = url.searchParams.get('q');

  const filtered = items
    .filter((p) => !category || p.category?.slug === category)
    .filter((p) => !q || normalize(`${p.title} ${p.excerpt}`).includes(normalize(q)));

  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
  const slice = filtered.slice((page - 1) * limit, page * limit);
  return send(res, 200, {
    items: slice.map((p) => toSummary(req, p)),
    page,
    totalPages,
    total: filtered.length,
  });
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  const started = Date.now();
  res.on('finish', () => {
    console.log(
      `[mock] ${req.method} ${url.pathname}${url.search} → ${res.statusCode} ${Date.now() - started}ms`,
    );
  });
  try {
    if (DELAY_MS > 0) await sleep(DELAY_MS);
    await route(req, res, url);
  } catch (error) {
    console.error('[mock] lỗi:', error);
    if (!res.headersSent) send(res, 500, { error: 'Mock server error' });
  }
});

server.listen(PORT, '127.0.0.1', () => {
  const { port } = server.address();
  // Dòng này được test đọc để biết cổng khi MOCK_PORT=0.
  console.log(
    `[mock] listening on http://127.0.0.1:${port}${failMode ? ` (fail=${failMode})` : ''}`,
  );
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
