import type { PageSlug, SectionKey } from './schemas/pages';

/**
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │ NƠI DUY NHẤT chọn nguồn nội dung cho trang landing.                       │
 * │ 'static' → đọc từ content/pages/*.ts (SSG thuần, không gọi mạng)          │
 * │ 'api'    → lấy từ GET /pages/:slug (ISR, tag page:<slug>, revalidate 1h)  │
 * └──────────────────────────────────────────────────────────────────────────┘
 *
 * Chuyển một section sang API: thêm `sections: { <key>: 'api' }` cho trang đó.
 * Ví dụ: home: { default: 'static', sections: { hero: 'api' } }
 * Hướng dẫn đầy đủ: docs/CONTENT_LAYER.md
 */

export type ContentSource = 'static' | 'api';

export type PageSourceConfig<S extends PageSlug> = {
  /** Nguồn mặc định cho seo và mọi section không khai báo riêng. */
  default: ContentSource;
  /** Nguồn cho metadata SEO (mặc định theo `default`). */
  seo?: ContentSource;
  /** Nguồn riêng theo section. Key sai → lỗi khi typecheck. */
  sections?: Partial<Record<SectionKey<S>, ContentSource>>;
};

export type SourcesConfig = {
  /** Thông tin chung (header, footer, liên hệ): static → content/site.ts, api → GET /site. */
  site: ContentSource;
  pages: { [S in PageSlug]: PageSourceConfig<S> };
};

export const sources: SourcesConfig = {
  site: 'static',
  pages: {
    home: { default: 'static' },
    team: { default: 'static' },
    journey: { default: 'static' },
    posts: { default: 'static' },
    booking: { default: 'static' },
  },
};
