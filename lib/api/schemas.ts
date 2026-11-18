import { z } from 'zod';

/**
 * Schema response của blog API — hợp đồng ở mục 7 của brief, cộng các trường mở rộng ở
 * docs/PLAN.md mục 2.7 (`category`, `featured`, `readingMinutes`, `total`, `GET /categories`).
 * Mọi response đều qua zod: sai cấu trúc → `apiGet` throw, không render nửa vời.
 */

const IsoDate = z.iso.datetime({ offset: true });
const HttpUrl = z.url({ protocol: /^https?$/ });

/** Slug tiếng Việt không dấu: chữ thường, số, gạch ngang. */
export const PostSlug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug không hợp lệ');

export const PostCover = z.object({
  url: HttpUrl,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: z.string(),
});

export const PostCategory = z.object({
  slug: PostSlug,
  name: z.string().min(1),
});

/**
 * `Seo` của bài viết (cùng hình dạng với `Seo` của content layer). Không giới hạn độ dài như nội dung
 * tĩnh: tiêu đề dài từ backend không nên làm hỏng trang — chỉ cần đúng kiểu.
 */
export const PostSeo = z.object({
  title: z.string().min(1),
  description: z.string(),
  ogImage: HttpUrl.optional(),
  canonical: HttpUrl.optional(),
  noindex: z.boolean().optional(),
});

const PostBase = z.object({
  slug: PostSlug,
  title: z.string().min(1),
  excerpt: z.string(),
  cover: PostCover,
  /** Mở rộng (PLAN 2.7). */
  category: PostCategory.optional(),
  featured: z.boolean().default(false),
  /** Thời gian đọc (phút). Thiếu → trang chi tiết tự tính từ nội dung; danh sách không hiển thị. */
  readingMinutes: z.number().int().positive().optional(),
  publishedAt: IsoDate,
  updatedAt: IsoDate,
});

/** Một mục trong `GET /posts`. */
export const PostSummary = PostBase;

/** `GET /posts?page=&limit=&category=&q=` */
export const PostListResponse = z.object({
  items: z.array(PostSummary),
  page: z.number().int().min(1),
  totalPages: z.number().int().min(1),
  /** Mở rộng (tuỳ chọn): tổng số bài khớp bộ lọc — có thì hiện "1–6 / 16 bài viết". */
  total: z.number().int().min(0).optional(),
});

/** `GET /posts/:slug` */
export const Post = PostBase.extend({
  content: z.string(),
  contentFormat: z.enum(['html', 'markdown']),
  seo: PostSeo,
  /** Chỉ `published` được hiển thị; giá trị khác (draft, hidden…) → 404. */
  status: z.string().min(1),
});

/** `GET /posts/slugs` */
export const PostSlugsResponse = z.object({
  items: z.array(z.object({ slug: PostSlug, updatedAt: IsoDate })),
});

/** `GET /categories` (mở rộng, PLAN 2.7). */
export const CategoryListResponse = z.object({
  items: z.array(PostCategory.extend({ count: z.number().int().min(0) })),
});

export type TPostSummary = z.infer<typeof PostSummary>;
export type TPostList = z.infer<typeof PostListResponse>;
export type TPost = z.infer<typeof Post>;
export type TPostSeo = z.infer<typeof PostSeo>;
export type TPostSlug = z.infer<typeof PostSlugsResponse>['items'][number];
export type TCategory = z.infer<typeof CategoryListResponse>['items'][number];
