import 'server-only';

import { fetchRemotePage, fetchRemoteSiteSettings } from '@/lib/api/pages';

import type { PageSource, SiteSource } from './types';

/**
 * Nội dung lấy từ backend qua lib/api (cache tag `page:<slug>` / `site`, revalidate 3600s).
 * Lỗi (kể cả 404) được throw — trang giữ bản cache tốt gần nhất.
 */
export const apiSource: PageSource & SiteSource = {
  getPage: (slug) => fetchRemotePage(slug),
  getSite: () => fetchRemoteSiteSettings(),
};
