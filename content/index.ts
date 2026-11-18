import 'server-only';

import { cache } from 'react';

import { apiSource } from './adapters/api';
import { staticSource } from './adapters/static';
import { resolvePageContent, resolveSiteSettings } from './resolve';
import type { PageContent, PageSlug } from './schemas/pages';
import type { TSiteSettings } from './schemas/site';
import { sources } from './sources.config';

/**
 * Cửa ngõ DUY NHẤT để trang lấy nội dung landing. Trang không import content/pages/* hay lib/api trực tiếp.
 * React `cache()` gộp các lần gọi trong cùng một lần render (generateMetadata + page) — không phải cache toàn cục.
 */
const loadPage = cache((slug: PageSlug) =>
  resolvePageContent(slug, sources.pages[slug], { staticSource, apiSource }),
);

export function getPageContent<S extends PageSlug>(slug: S): Promise<PageContent<S>> {
  return loadPage(slug) as Promise<PageContent<S>>;
}

export const getSiteSettings = cache((): Promise<TSiteSettings> =>
  resolveSiteSettings(sources.site, { staticSource, apiSource }),
);

export type { PageContent, PageSlug, SectionData, SectionKey } from './schemas/pages';
export type { TSiteSettings as SiteSettings, TNavItem as NavItem } from './schemas/site';
export type { TCta as Cta, TImage as ImageData, TPhoto as PhotoData } from './schemas/common';
export type { TSeo as Seo } from './schemas/seo';
