/**
 * Validate toàn bộ nội dung tĩnh bằng schema — chạy trước mỗi `npm run build` (script prebuild),
 * nên nội dung sai cấu trúc làm build dừng với thông báo chỉ rõ field.
 */
import { describe, expect, it } from 'vitest';

import type { PageSource } from '@/content/adapters/types';
import { staticSource } from '@/content/adapters/static';
import { resolvePageContent, resolveSiteSettings } from '@/content/resolve';
import { PAGE_SLUGS } from '@/content/schemas/pages';
import { routes } from '@/lib/routes';

const noApi: PageSource = {
  getPage: () => {
    throw new Error('Không được gọi API khi trang toàn nguồn static');
  },
};

/** URL nội bộ hợp lệ mà nội dung tĩnh được phép trỏ tới (URL công khai tiếng Việt). */
const KNOWN_PATHS = new Set<string>([
  routes.home(),
  routes.team(),
  routes.journey(),
  routes.booking(),
  routes.posts(),
]);

function collectHrefs(value: unknown, out: string[] = []): string[] {
  if (Array.isArray(value)) value.forEach((v) => collectHrefs(v, out));
  else if (value && typeof value === 'object') {
    for (const [key, v] of Object.entries(value)) {
      if ((key === 'href' || key === 'mapUrl') && typeof v === 'string') out.push(v);
      else collectHrefs(v, out);
    }
  }
  return out;
}

describe('nội dung tĩnh', () => {
  it.each(PAGE_SLUGS)('content/pages/%s.ts đúng schema', async (slug) => {
    const page = await resolvePageContent(
      slug,
      { default: 'static' },
      {
        staticSource,
        apiSource: noApi,
      },
    );
    expect(page.seo.title).toBeTruthy();
  });

  it('content/site.ts đúng schema', async () => {
    const site = await resolveSiteSettings('static', {
      staticSource,
      apiSource: { getSite: () => Promise.reject(new Error('không dùng')) },
    });
    expect(site.nav.length).toBeGreaterThan(0);
  });

  it('link nội bộ chỉ trỏ tới URL công khai đã biết (không dùng route tiếng Anh nội bộ)', async () => {
    const all = [
      await staticSource.getSite(),
      ...(await Promise.all(PAGE_SLUGS.map((s) => staticSource.getPage(s)))),
    ];
    const internal = collectHrefs(all).filter((href) => href.startsWith('/'));
    expect(internal.length).toBeGreaterThan(0);
    for (const href of internal) expect(KNOWN_PATHS, href).toContain(href);
  });
});
