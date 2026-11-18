/**
 * Logic route JSON của mock backend — dùng chung cho:
 *   - mocks/server.mjs (HTTP server cổng 4010, đọc dữ liệu từ đĩa mỗi request)
 *   - lib/api/inline-mock.ts (MOCK_API_INLINE=true: dữ liệu đóng gói sẵn, không cần mạng —
 *     dùng cho bản preview/demo như Vercel khi chưa có backend thật)
 *
 * Hàm thuần: nhận đường dẫn + dữ liệu, trả `{ status, body }`. Không phụ thuộc Node HTTP.
 * Kiểu khai báo: mocks/handler.d.mts.
 */

const SLUG = /^[a-z0-9-]+$/;
const CATEGORY_ORDER = ['huong-dan', 'meo-hay', 'tin-tuc', 'khuyen-mai'];

const ok = (body) => ({ status: 200, body });
const notFound = () => ({ status: 404, body: { error: 'Not found' } });

const normalize = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase();

/**
 * @param {object} options
 * @param {(relativePath: string) => Promise<unknown | undefined>} options.load
 *   Đọc file trong mocks/data (vd. "posts.json", "pages/home.json"); không có → undefined.
 */
export function createMockHandler({ load }) {
  /** `imageUrl` biến đường dẫn ảnh trong dữ liệu ("/images/x.webp") thành URL trả cho client. */
  const withCover = (cover, imageUrl) =>
    cover && cover.url.startsWith('/') ? { ...cover, url: imageUrl(cover.url) } : cover;

  /** Chỉ các field của PostSummary (danh sách không trả nội dung bài). */
  const toSummary = (p, imageUrl) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    cover: withCover(p.cover, imageUrl),
    category: p.category,
    featured: p.featured,
    readingMinutes: p.readingMinutes,
    publishedAt: p.publishedAt,
    updatedAt: p.updatedAt,
  });

  const toPost = (p, imageUrl) => ({
    ...toSummary(p, imageUrl),
    content: p.content,
    contentFormat: p.contentFormat,
    seo: p.seo,
    status: p.status,
  });

  const allPosts = async () => (await load('posts.json'))?.items ?? [];

  /** Bài đã đăng, mới nhất trước. */
  const publishedPosts = async () =>
    (await allPosts())
      .filter((p) => p.status === 'published')
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  async function listPosts(searchParams, imageUrl) {
    const items = await publishedPosts();
    const page = Math.max(1, Number.parseInt(searchParams.get('page') ?? '1', 10) || 1);
    const limit = Math.min(
      50,
      Math.max(1, Number.parseInt(searchParams.get('limit') ?? '10', 10) || 10),
    );
    const category = searchParams.get('category');
    const q = searchParams.get('q');

    const filtered = items
      .filter((p) => !category || p.category?.slug === category)
      .filter((p) => !q || normalize(`${p.title} ${p.excerpt}`).includes(normalize(q)));

    const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
    const slice = filtered.slice((page - 1) * limit, page * limit);
    return ok({
      items: slice.map((p) => toSummary(p, imageUrl)),
      page,
      totalPages,
      total: filtered.length,
    });
  }

  async function listCategories() {
    const counts = new Map();
    for (const p of await publishedPosts()) {
      if (!p.category) continue;
      const entry = counts.get(p.category.slug) ?? { ...p.category, count: 0 };
      entry.count += 1;
      counts.set(p.category.slug, entry);
    }
    const rank = (slug) => CATEGORY_ORDER.indexOf(slug) + 1 || 99;
    return ok({ items: [...counts.values()].sort((a, b) => rank(a.slug) - rank(b.slug)) });
  }

  /**
   * GET một đường dẫn JSON của mock.
   * @param {URL} url  chỉ dùng pathname + searchParams
   * @param {(path: string) => string} imageUrl  URL ảnh trả về cho client
   * @returns {Promise<{ status: number, body: unknown }>}
   */
  return async function handle(url, imageUrl) {
    const { pathname, searchParams } = url;

    const page = pathname.match(/^\/pages\/([^/]+)$/);
    if (page) {
      const slug = decodeURIComponent(page[1]);
      const data = SLUG.test(slug) ? await load(`pages/${slug}.json`) : undefined;
      return data ? ok(data) : notFound();
    }
    if (pathname === '/site') {
      const data = await load('site.json');
      return data ? ok(data) : notFound();
    }
    if (pathname === '/posts') return listPosts(searchParams, imageUrl);
    if (pathname === '/posts/slugs') {
      const items = (await publishedPosts()).map((p) => ({ slug: p.slug, updatedAt: p.updatedAt }));
      return ok({ items });
    }
    const post = pathname.match(/^\/posts\/([^/]+)$/);
    if (post) {
      const slug = decodeURIComponent(post[1]);
      const found = SLUG.test(slug) ? (await allPosts()).find((p) => p.slug === slug) : undefined;
      return found ? ok(toPost(found, imageUrl)) : notFound();
    }
    if (pathname === '/categories') return listCategories();
    return notFound();
  };
}
