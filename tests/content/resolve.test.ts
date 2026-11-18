import { describe, expect, it, vi } from 'vitest';

import { staticSource } from '@/content/adapters/static';
import type { PageSource } from '@/content/adapters/types';
import { home } from '@/content/pages/home';
import { ContentSourceError, resolvePageContent, usesApi } from '@/content/resolve';

const remoteHero = {
  ...home.sections.hero,
  lead: 'Hero từ API',
};

function fakeApi(response: unknown): PageSource & { getPage: ReturnType<typeof vi.fn> } {
  return { getPage: vi.fn(async () => response) };
}

describe('usesApi', () => {
  it('nhận biết cấu hình có dùng API', () => {
    expect(usesApi({ default: 'static' })).toBe(false);
    expect(usesApi({ default: 'static', sections: { hero: 'static' } })).toBe(false);
    expect(usesApi({ default: 'static', sections: { hero: 'api' } })).toBe(true);
    expect(usesApi({ default: 'static', seo: 'api' })).toBe(true);
    expect(usesApi({ default: 'api' })).toBe(true);
  });
});

describe('resolvePageContent', () => {
  it('toàn static: không gọi API', async () => {
    const api = fakeApi({});
    const page = await resolvePageContent(
      'home',
      { default: 'static' },
      { staticSource, apiSource: api },
    );
    expect(api.getPage).not.toHaveBeenCalled();
    expect(page.sections.hero.lead).toBe(home.sections.hero.lead);
  });

  it('một section api: chỉ section đó lấy từ API, phần còn lại giữ static', async () => {
    const remoteStats = { ...home.sections.stats, heading: 'Stats từ API' };
    const api = fakeApi({ sections: { hero: remoteHero, stats: remoteStats } });
    const page = await resolvePageContent(
      'home',
      { default: 'static', sections: { hero: 'api' } },
      { staticSource, apiSource: api },
    );
    expect(api.getPage).toHaveBeenCalledWith('home');
    expect(page.sections.hero.lead).toBe('Hero từ API');
    // stats cấu hình static → bỏ qua dữ liệu từ API (kể cả khi API trả)
    expect(page.sections.stats.heading).toBe(home.sections.stats.heading);
    expect(page.seo).toEqual(home.seo);
  });

  it('seo api: lấy seo từ API', async () => {
    const seo = { title: 'SEO từ API', description: 'Mô tả từ API' };
    const page = await resolvePageContent(
      'home',
      { default: 'static', seo: 'api' },
      { staticSource, apiSource: fakeApi({ seo, sections: {} }) },
    );
    expect(page.seo.title).toBe('SEO từ API');
  });

  it('section api nhưng API không trả section đó → throw', async () => {
    await expect(
      resolvePageContent(
        'home',
        { default: 'static', sections: { hero: 'api' } },
        { staticSource, apiSource: fakeApi({ sections: {} }) },
      ),
    ).rejects.toThrow(/home\.hero/);
  });

  it('API trả section sai schema → throw kèm đường dẫn field (không render nửa vời)', async () => {
    const error = await resolvePageContent(
      'home',
      { default: 'static', sections: { hero: 'api' } },
      { staticSource, apiSource: fakeApi({ sections: { hero: { ...remoteHero, ctas: [] } } }) },
    ).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(ContentSourceError);
    expect(String(error)).toContain('sections.hero.ctas');
  });

  it('API lỗi → lỗi được ném tiếp (Next giữ bản cache cũ)', async () => {
    const failing: PageSource = { getPage: () => Promise.reject(new Error('HTTP 500')) };
    await expect(
      resolvePageContent('home', { default: 'api' }, { staticSource, apiSource: failing }),
    ).rejects.toThrow('HTTP 500');
  });

  it('nội dung tĩnh sai cấu trúc → lỗi chỉ rõ field', async () => {
    const broken: PageSource = {
      getPage: async () => ({
        ...home,
        sections: { ...home.sections, stats: { heading: 'x', items: [] } },
      }),
    };
    await expect(
      resolvePageContent(
        'home',
        { default: 'static' },
        { staticSource: broken, apiSource: fakeApi({}) },
      ),
    ).rejects.toThrow(/content\/pages\/home\.ts[\s\S]*sections\.stats\.items/);
  });
});
