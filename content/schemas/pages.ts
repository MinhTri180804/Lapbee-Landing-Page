import { z } from 'zod';

import { Seo } from './seo';
import { BookingContactSection, BookingFormSection } from './sections/booking';
import { BusinessBandSection } from './sections/business-band';
import { CtaBannerSection } from './sections/cta-banner';
import { HeroSection } from './sections/hero';
import { LatestPostsSection } from './sections/latest-posts';
import { PageHeroSection } from './sections/page-hero';
import { PostsListingSection } from './sections/posts-listing';
import { PrinciplesSection } from './sections/principles';
import { ProcessSection } from './sections/process';
import { ServicesSection } from './sections/services';
import { StatsSection } from './sections/stats';
import { TeamGridSection } from './sections/team-grid';
import { TimelineSection } from './sections/timeline';

/**
 * Tạo cặp schema cho một trang từ danh sách section (theo key):
 * - `full`: trang đầy đủ — dùng cho nội dung tĩnh và kết quả cuối cùng.
 * - `remote`: response của `GET /pages/:slug` — mỗi section có thể vắng mặt,
 *   nhưng section nào có mặt thì phải ĐỦ và ĐÚNG schema (không nhận nửa vời).
 */
function definePage<T extends z.ZodRawShape>(sections: T) {
  const sectionsSchema = z.object(sections);
  return {
    full: z.object({ seo: Seo, sections: sectionsSchema }),
    remote: z.object({
      slug: z.string().optional(),
      updatedAt: z.string().optional(),
      seo: Seo.optional(),
      sections: sectionsSchema.partial(),
    }),
  };
}

export const PageSchemas = {
  home: definePage({
    hero: HeroSection,
    stats: StatsSection,
    services: ServicesSection,
    process: ProcessSection,
    business: BusinessBandSection,
    latestPosts: LatestPostsSection,
  }),
  team: definePage({
    hero: PageHeroSection,
    members: TeamGridSection,
    principles: PrinciplesSection,
  }),
  journey: definePage({
    hero: PageHeroSection,
    timeline: TimelineSection,
    ctaBanner: CtaBannerSection,
  }),
  posts: definePage({
    hero: PageHeroSection,
    listing: PostsListingSection,
  }),
  booking: definePage({
    hero: PageHeroSection,
    form: BookingFormSection,
    contact: BookingContactSection,
  }),
} as const;

/** Slug trang trong content layer (tiếng Anh; URL công khai map trong lib/routes.ts). */
export type PageSlug = keyof typeof PageSchemas;
export const PAGE_SLUGS = Object.keys(PageSchemas) as PageSlug[];

/** Nội dung trang sau khi validate (kiểu dữ liệu component nhận). */
export type PageContent<S extends PageSlug> = z.output<(typeof PageSchemas)[S]['full']>;
/** Kiểu dữ liệu khi viết nội dung tĩnh (trước default/transform). */
export type PageInput<S extends PageSlug> = z.input<(typeof PageSchemas)[S]['full']>;
/** Response hợp lệ của `GET /pages/:slug`. */
export type RemotePage<S extends PageSlug> = z.output<(typeof PageSchemas)[S]['remote']>;
/** Key section của một trang, vd. 'hero' | 'stats' | … */
export type SectionKey<S extends PageSlug> = keyof PageContent<S>['sections'] & string;
/** Dữ liệu một section cụ thể — dùng làm kiểu props cho component section. */
export type SectionData<
  S extends PageSlug,
  K extends SectionKey<S>,
> = PageContent<S>['sections'][K];
