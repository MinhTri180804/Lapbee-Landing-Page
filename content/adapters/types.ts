import type { PageSlug } from '../schemas/pages';

/**
 * Một nguồn nội dung trang. Dữ liệu trả về CHƯA được tin cậy — content layer validate bằng zod.
 * - static: trả về trang đầy đủ.
 * - api: có thể chỉ trả một phần sections.
 */
export interface PageSource {
  getPage(slug: PageSlug): Promise<unknown>;
}

/** Nguồn thông tin chung của site. */
export interface SiteSource {
  getSite(): Promise<unknown>;
}
