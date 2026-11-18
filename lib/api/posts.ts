import 'server-only';

import { cache } from 'react';

import { apiGet } from './client';
import {
  CategoryListResponse,
  Post,
  PostListResponse,
  PostSlugsResponse,
  type TCategory,
  type TPost,
  type TPostList,
  type TPostSlug,
} from './schemas';
import { cacheTags } from './tags';

/*
 * Blog API. Tham số là giá trị nguyên thuỷ để React `cache()` gộp các lần gọi trùng trong một lần
 * render (generateMetadata + page) — `apiGet` truyền `signal` nên Next không tự gộp fetch.
 * Lỗi → throw (giữ bản cache cũ); 404 → `ApiNotFoundError` (trang gọi `notFound()`).
 */

/**
 * `GET /posts?page=&limit=&category=&q=` — mới nhất trước.
 * - Danh sách / danh mục: tag `posts`, revalidate 3600s.
 * - Có `q` (tìm kiếm): không cache — từ khoá tuỳ ý, cache sẽ phình vô hạn trên ổ đĩa.
 */
export const getPosts = cache(
  async (page = 1, limit = 10, category?: string, q?: string): Promise<TPostList> =>
    apiGet('/posts', {
      schema: PostListResponse,
      tags: [cacheTags.posts],
      revalidate: q ? 0 : undefined,
      query: { page, limit, category, q },
    }),
);

/** `GET /posts/:slug` — tags `posts`, `post:<slug>`. Trang tự kiểm tra `status`. */
export const getPost = cache(async (slug: string): Promise<TPost> =>
  apiGet(`/posts/${encodeURIComponent(slug)}`, {
    schema: Post,
    tags: [cacheTags.posts, cacheTags.post(slug)],
  }),
);

/** `GET /posts/slugs` — tag `posts`. Dùng cho generateStaticParams và sitemap (GĐ7). */
export const getPostSlugs = cache(async (): Promise<TPostSlug[]> => {
  const { items } = await apiGet('/posts/slugs', {
    schema: PostSlugsResponse,
    tags: [cacheTags.posts],
  });
  return items;
});

/**
 * `GET /categories` — tags `categories` và `posts` (số bài mỗi danh mục đổi khi đăng/xoá bài,
 * nên webhook gửi `posts` cũng làm mới danh mục).
 */
export const getCategories = cache(async (): Promise<TCategory[]> => {
  const { items } = await apiGet('/categories', {
    schema: CategoryListResponse,
    tags: [cacheTags.categories, cacheTags.posts],
  });
  return items;
});
