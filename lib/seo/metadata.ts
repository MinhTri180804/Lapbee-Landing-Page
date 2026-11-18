import 'server-only';

import type { Metadata } from 'next';

import { getSiteSettings, type Seo } from '@/content';
import { getServerEnv } from '@/lib/env';

/**
 * Metadata của một trang từ `seo` (content layer hoặc blog API).
 *
 * Next gộp metadata giữa layout và page theo kiểu **nông**: page đặt `openGraph` thì toàn bộ
 * `openGraph` của layout bị thay. Vì vậy hàm này luôn trả đủ `openGraph` + `twitter` cho mỗi trang.
 *
 * - URL tương đối (canonical, ảnh) được Next ghép với `metadataBase` = SITE_URL (đặt ở layout).
 * - `path` là URL công khai (tiếng Việt) lấy từ `routes` — không dùng route nội bộ `/team`, `/posts`.
 */

/** Ảnh OG mặc định (public/og-default.png, 1200×630) — dùng khi trang/bài không có ảnh riêng. */
export const DEFAULT_OG_IMAGE = {
  url: '/og-default.png',
  width: 1200,
  height: 630,
} as const;

export type OgImage = { url: string; width?: number; height?: number; alt?: string };

export type PageMetadataInput = {
  seo: Seo;
  /** URL công khai của trang (vd. `routes.team()`); dùng làm canonical khi `seo.canonical` trống. */
  path: string;
  /** Tiêu đề dùng nguyên văn, không thêm hậu tố " · LAPBEE" (trang chủ). */
  absoluteTitle?: boolean;
  /** Ảnh chia sẻ; ưu tiên `seo.ogImage`, sau đó `images`, cuối cùng ảnh mặc định. */
  images?: OgImage[];
  /** Bài viết → `og:type=article` kèm thời gian và chuyên mục. */
  article?: { publishedTime: string; modifiedTime: string; section?: string };
};

export async function buildMetadata({
  seo,
  path,
  absoluteTitle = false,
  images,
  article,
}: PageMetadataInput): Promise<Metadata> {
  const site = await getSiteSettings();
  const fullTitle = absoluteTitle ? seo.title : `${seo.title} · ${site.name}`;
  const canonical = seo.canonical ?? path;
  const ogImages: OgImage[] = seo.ogImage
    ? [{ url: seo.ogImage, alt: seo.title }]
    : images?.length
      ? images
      : [{ ...DEFAULT_OG_IMAGE, alt: site.name }];

  return {
    title: absoluteTitle ? { absolute: seo.title } : seo.title,
    description: seo.description,
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description: seo.description,
      url: canonical,
      siteName: site.name,
      locale: 'vi_VN',
      images: ogImages,
      ...(article
        ? {
            type: 'article',
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            ...(article.section ? { section: article.section } : {}),
          }
        : { type: 'website' }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: seo.description,
      images: ogImages.map((i) => i.url),
    },
    // SITE_NOINDEX / MOCK_API_INLINE (bản preview): chặn index mọi trang.
    robots:
      seo.noindex || getServerEnv().noindex
        ? { index: false, follow: true }
        : { index: true, follow: true },
  };
}
