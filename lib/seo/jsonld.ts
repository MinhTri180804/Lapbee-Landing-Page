import type { SiteSettings } from '@/content';
import type { TPost } from '@/lib/api/schemas';
import { routes } from '@/lib/routes';

/**
 * Dữ liệu có cấu trúc (schema.org, JSON-LD). Hàm thuần: nhận dữ liệu + SITE_URL, trả object.
 * `@id` cố định (`<site>/#organization`, `<site>/#website`) để các trang tham chiếu cùng một thực thể.
 * Render bằng `components/seo/JsonLd.tsx`.
 */

type Json = Record<string, unknown>;

const abs = (path: string, siteUrl: string) => new URL(path, siteUrl).toString();
const orgId = (siteUrl: string) => abs('/#organization', siteUrl);
const websiteId = (siteUrl: string) => abs('/#website', siteUrl);

/** Logo vuông dùng cho Organization / publisher (public/brand). */
const LOGO = { path: '/brand/logo-mark.png', width: 436, height: 402 };

/** `Organization` — trang chủ. */
export function organizationJsonLd(site: SiteSettings, siteUrl: string): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': orgId(siteUrl),
    name: site.name,
    legalName: site.legalName,
    url: abs(routes.home(), siteUrl),
    logo: {
      '@type': 'ImageObject',
      url: abs(LOGO.path, siteUrl),
      width: LOGO.width,
      height: LOGO.height,
    },
    description: site.about,
    foundingDate: String(site.foundingYear),
    telephone: site.phone,
    ...(site.email ? { email: site.email } : {}),
    address: { '@type': 'PostalAddress', streetAddress: site.address, addressCountry: 'VN' },
    ...(site.social.length ? { sameAs: site.social } : {}),
  };
}

/** `WebSite` (kèm ô tìm kiếm trỏ tới /bai-dang/tim-kiem) — trang chủ. */
export function websiteJsonLd(site: SiteSettings, siteUrl: string): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId(siteUrl),
    name: site.name,
    url: abs(routes.home(), siteUrl),
    inLanguage: 'vi-VN',
    publisher: { '@id': orgId(siteUrl) },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        // Giữ nguyên `{search_term_string}` (không encode) theo cú pháp của schema.org.
        urlTemplate: `${abs(routes.search(), siteUrl)}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** `Article` — trang bài viết. Tác giả là tổ chức (API chưa có trường tác giả). */
export function articleJsonLd(
  post: TPost,
  site: SiteSettings,
  siteUrl: string,
  author: string,
): Json {
  const url = abs(routes.post(post.slug), siteUrl);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.seo.description || post.excerpt,
    image: [post.seo.ogImage ?? post.cover.url],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: 'vi-VN',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    ...(post.category ? { articleSection: post.category.name } : {}),
    author: { '@type': 'Organization', name: author, url: abs(routes.team(), siteUrl) },
    publisher: {
      '@type': 'Organization',
      '@id': orgId(siteUrl),
      name: site.name,
      logo: { '@type': 'ImageObject', url: abs(LOGO.path, siteUrl) },
    },
    isPartOf: { '@id': websiteId(siteUrl) },
  };
}

export type Crumb = { name: string; path: string };

/** `BreadcrumbList` từ danh sách (tên, URL công khai) theo thứ tự từ gốc. */
export function breadcrumbJsonLd(items: readonly Crumb[], siteUrl: string): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path, siteUrl),
    })),
  };
}
