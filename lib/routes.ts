/**
 * Map giữa route nội bộ (thư mục tiếng Anh trong `app/`) và URL công khai (tiếng Việt không dấu).
 *
 * - `next.config.ts` sinh `rewrites` (URL công khai → route nội bộ) và `redirects` 301
 *   (route nội bộ → URL công khai) từ bảng này, để mỗi nội dung chỉ có một URL.
 * - Mọi link, canonical, sitemap phải lấy URL qua `routes`, không viết cứng.
 *
 * File này không phụ thuộc server/client, được import cả trong `next.config.ts`.
 * Thứ tự trong `ROUTE_MAP` quan trọng: pattern cụ thể đứng trước pattern chung (`:slug`).
 * Hệ quả: slug bài viết không được trùng `trang`, `danh-muc`, `tim-kiem` (ghi trong docs/ASSUMPTIONS.md).
 */

type RouteMapping = {
  /** Route nội bộ theo cấu trúc thư mục `app/`. */
  readonly internal: string;
  /** URL công khai người dùng và bot nhìn thấy. */
  readonly public: string;
};

export const ROUTE_MAP: readonly RouteMapping[] = [
  { internal: '/team', public: '/doi-ngu' },
  { internal: '/journey', public: '/hanh-trinh' },
  { internal: '/booking', public: '/dat-lich' },
  { internal: '/posts/page/:page', public: '/bai-dang/trang/:page' },
  {
    internal: '/posts/category/:category/page/:page',
    public: '/bai-dang/danh-muc/:category/trang/:page',
  },
  { internal: '/posts/category/:category', public: '/bai-dang/danh-muc/:category' },
  { internal: '/posts/search', public: '/bai-dang/tim-kiem' },
  { internal: '/posts', public: '/bai-dang' },
  { internal: '/posts/:slug', public: '/bai-dang/:slug' },
];

type PathRule = { source: string; destination: string };
type RedirectRule = PathRule & { permanent: boolean };

/** URL công khai tiếng Việt → route nội bộ tiếng Anh. */
export function getRewrites(): PathRule[] {
  return ROUTE_MAP.map((r) => ({ source: r.public, destination: r.internal }));
}

/** Route nội bộ tiếng Anh → URL công khai tiếng Việt (301), tránh trùng nội dung. */
export function getRedirects(): RedirectRule[] {
  return ROUTE_MAP.map((r) => ({ source: r.internal, destination: r.public, permanent: true }));
}

const seg = (value: string) => encodeURIComponent(value);

/** Helper tạo URL công khai. Trang 1 của danh sách luôn dùng URL gốc (không có `/trang/1`). */
export const routes = {
  home: () => '/',
  team: () => '/doi-ngu',
  journey: () => '/hanh-trinh',
  booking: () => '/dat-lich',
  posts: (page = 1) => (page <= 1 ? '/bai-dang' : `/bai-dang/trang/${page}`),
  category: (slug: string, page = 1) =>
    page <= 1 ? `/bai-dang/danh-muc/${seg(slug)}` : `/bai-dang/danh-muc/${seg(slug)}/trang/${page}`,
  search: (query?: string, page = 1) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (query && page > 1) params.set('page', String(page));
    const qs = params.toString();
    return qs ? `/bai-dang/tim-kiem?${qs}` : '/bai-dang/tim-kiem';
  },
  post: (slug: string) => `/bai-dang/${seg(slug)}`,
} as const;
