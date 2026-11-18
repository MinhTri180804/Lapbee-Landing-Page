import 'server-only';

import { cache } from 'react';
import type { z } from 'zod';

import { PageSchemas, type PageSlug, type RemotePage } from '@/content/schemas/pages';
import { SiteSettings, type TSiteSettings } from '@/content/schemas/site';

import { apiGet } from './client';
import { cacheTags } from './tags';

/**
 * `GET /pages/:slug` — nội dung trang landing từ backend (hợp đồng: docs/CONTENT_LAYER.md).
 * Chỉ được gọi bởi content layer (`content/adapters/api.ts`) khi cấu hình nguồn là 'api'.
 */
export const fetchRemotePage = cache(
  async <S extends PageSlug>(slug: S): Promise<RemotePage<S>> =>
    // Ép kiểu: TS không thu hẹp union schema theo generic S; runtime luôn dùng đúng schema của slug.
    apiGet<unknown>(`/pages/${encodeURIComponent(slug)}`, {
      schema: PageSchemas[slug].remote as z.ZodType<unknown>,
      tags: [cacheTags.pages, cacheTags.page(slug)],
    }) as Promise<RemotePage<S>>,
);

/** `GET /site` — thông tin chung của site, khi `sources.site = 'api'`. */
export const fetchRemoteSiteSettings = cache(async (): Promise<TSiteSettings> =>
  apiGet('/site', { schema: SiteSettings, tags: [cacheTags.site] }),
);
