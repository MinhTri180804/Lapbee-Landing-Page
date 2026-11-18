import type { MetadataRoute } from 'next';

import { getCategories, getPostSlugs } from '@/lib/api/posts';
import { getServerEnv } from '@/lib/env';
import { routes } from '@/lib/routes';

/**
 * /sitemap.xml — trang landing, danh mục và toàn bộ bài viết (từ `GET /posts/slugs`, `lastModified`
 * = `updatedAt`). URL công khai tiếng Việt từ `lib/routes.ts`.
 *
 * Fetch gắn tag `posts` (và `categories`) → webhook revalidate `posts` làm mới sitemap; dự phòng 3600s.
 * Trang phân trang và tìm kiếm không đưa vào (tìm kiếm noindex; phân trang bot tự theo link).
 * Trang landing không có `lastModified` vì không biết ngày sửa thật (ghi sai còn tệ hơn bỏ trống).
 */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { siteUrl } = getServerEnv();
  const abs = (path: string) => new URL(path, siteUrl).toString();
  const [slugs, categories] = await Promise.all([getPostSlugs(), getCategories()]);

  const latestPost = slugs.reduce<string | undefined>(
    (max, s) => (!max || s.updatedAt > max ? s.updatedAt : max),
    undefined,
  );

  return [
    { url: abs(routes.home()), changeFrequency: 'weekly', priority: 1 },
    { url: abs(routes.team()), changeFrequency: 'monthly', priority: 0.6 },
    { url: abs(routes.journey()), changeFrequency: 'monthly', priority: 0.6 },
    { url: abs(routes.booking()), changeFrequency: 'monthly', priority: 0.8 },
    {
      url: abs(routes.posts()),
      ...(latestPost ? { lastModified: latestPost } : {}),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...categories.map((c) => ({
      url: abs(routes.category(c.slug)),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })),
    ...slugs.map((s) => ({
      url: abs(routes.post(s.slug)),
      lastModified: s.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
