import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { JsonLd } from '@/components/seo/JsonLd';
import { getSiteSettings } from '@/content';
import type { TPost } from '@/lib/api/schemas';
import { articleJsonLd, breadcrumbJsonLd, organizationJsonLd } from '@/lib/seo/jsonld';
import { buildMetadata, DEFAULT_OG_IMAGE } from '@/lib/seo/metadata';

const seo = { title: 'Đội ngũ', description: 'Mô tả' };

describe('buildMetadata', () => {
  it('canonical = URL công khai, title có hậu tố trong og/twitter, ảnh mặc định, index', async () => {
    const m = await buildMetadata({ seo, path: '/doi-ngu' });
    expect(m.title).toBe('Đội ngũ');
    expect(m.alternates?.canonical).toBe('/doi-ngu');
    expect(m.openGraph).toMatchObject({
      title: 'Đội ngũ · LAPBEE',
      url: '/doi-ngu',
      type: 'website',
      locale: 'vi_VN',
      images: [{ url: DEFAULT_OG_IMAGE.url, width: 1200, height: 630 }],
    });
    expect(m.twitter).toMatchObject({ card: 'summary_large_image', images: ['/og-default.png'] });
    expect(m.robots).toEqual({ index: true, follow: true });
  });

  it('absoluteTitle, seo.canonical và seo.ogImage được ưu tiên; noindex', async () => {
    const m = await buildMetadata({
      seo: {
        ...seo,
        canonical: 'https://x.vn/a',
        ogImage: 'https://cdn.x.vn/og.png',
        noindex: true,
      },
      path: '/doi-ngu',
      absoluteTitle: true,
      images: [{ url: 'https://cdn.x.vn/cover.webp' }],
    });
    expect(m.title).toEqual({ absolute: 'Đội ngũ' });
    expect(m.alternates?.canonical).toBe('https://x.vn/a');
    expect(m.openGraph?.images).toEqual([{ url: 'https://cdn.x.vn/og.png', alt: 'Đội ngũ' }]);
    expect(m.robots).toEqual({ index: false, follow: true });
  });

  it('bài viết: og:type article + thời gian; ảnh bìa khi không có ogImage', async () => {
    const m = await buildMetadata({
      seo,
      path: '/bai-dang/a',
      images: [{ url: 'https://cdn.x.vn/cover.webp', width: 1200, height: 800 }],
      article: { publishedTime: '2026-01-01T00:00:00Z', modifiedTime: '2026-01-02T00:00:00Z' },
    });
    expect(m.openGraph).toMatchObject({
      type: 'article',
      publishedTime: '2026-01-01T00:00:00Z',
      images: [{ url: 'https://cdn.x.vn/cover.webp' }],
    });
  });
});

describe('JSON-LD', () => {
  it('JsonLd escape "<" — chuỗi từ API không đóng được thẻ script', () => {
    const html = renderToStaticMarkup(JsonLd({ data: { headline: '</script><script>alert(1)' } }));
    expect(html).not.toContain('</script><script>');
    expect(html).toContain('\\u003c/script>');
  });

  it('Organization và Article dùng URL tuyệt đối theo SITE_URL', async () => {
    const site = await getSiteSettings();
    const org = organizationJsonLd(site, 'https://lapbee.vn');
    expect(org).toMatchObject({ '@type': 'Organization', url: 'https://lapbee.vn/' });

    const post = {
      slug: 'a',
      title: 'A',
      excerpt: 'e',
      cover: { url: 'https://cdn.x.vn/c.webp', width: 1, height: 1, alt: '' },
      featured: false,
      publishedAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-02T00:00:00Z',
      content: '',
      contentFormat: 'html',
      seo: { title: 'A', description: 'd' },
      status: 'published',
    } satisfies TPost;
    expect(articleJsonLd(post, site, 'https://lapbee.vn', 'Đội kỹ thuật')).toMatchObject({
      '@type': 'Article',
      mainEntityOfPage: { '@id': 'https://lapbee.vn/bai-dang/a' },
      image: ['https://cdn.x.vn/c.webp'],
      dateModified: '2026-01-02T00:00:00Z',
    });
    const crumbs = breadcrumbJsonLd([{ name: 'Trang chủ', path: '/' }], 'https://lapbee.vn');
    expect(crumbs.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://lapbee.vn/' },
    ]);
  });
});
