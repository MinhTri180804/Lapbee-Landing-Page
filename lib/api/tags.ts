/**
 * Tag revalidate — NGUỒN DUY NHẤT cho tên tag. Webhook (`POST /api/revalidate`) và docs/WEBHOOK.md
 * dùng đúng các tên này. Tag tối đa 256 ký tự, mỗi fetch tối đa 128 tag (giới hạn của Next.js).
 */
export const cacheTags = {
  /** Mọi danh sách bài viết, sitemap, khối "Bài đăng mới". */
  posts: 'posts',
  /** Một bài viết cụ thể. */
  post: (slug: string) => `post:${slug}`,
  /** Danh sách danh mục. */
  categories: 'categories',
  /** Mọi trang landing lấy từ API. */
  pages: 'pages',
  /** Một trang landing cụ thể (theo slug content layer: home, team, journey, posts, booking). */
  page: (slug: string) => `page:${slug}`,
  /** Thông tin chung của site (header, footer, liên hệ). */
  site: 'site',
} as const;

/** Thời gian revalidate dự phòng (giây) khi không có webhook. */
export const DEFAULT_REVALIDATE_SECONDS = 3600;
