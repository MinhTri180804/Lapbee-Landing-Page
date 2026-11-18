import type { Metadata } from 'next';

import { OpenStatus } from '@/components/layout/OpenStatus';
import { JsonLd } from '@/components/seo/JsonLd';
import { BusinessBandSection } from '@/components/sections/BusinessBandSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { LatestPostsSection } from '@/components/sections/LatestPostsSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { getPageContent, getSiteSettings } from '@/content';
import { getPosts } from '@/lib/api/posts';
import { getServerEnv } from '@/lib/env';
import { routes } from '@/lib/routes';
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo/jsonld';
import { buildMetadata } from '@/lib/seo/metadata';
import { hoursRange } from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPageContent('home');
  return buildMetadata({ seo, path: routes.home(), absoluteTitle: true });
}

/**
 * Trang chủ. Nội dung landing qua content layer (tĩnh); khối "Bài đăng mới" lấy từ blog API
 * (tag `posts`, revalidate 3600s) → trang là ISR, tự cập nhật khi webhook revalidate `posts`.
 */
export default async function HomePage() {
  const [{ sections }, site] = await Promise.all([getPageContent('home'), getSiteSettings()]);
  const { items: posts } = await getPosts(1, sections.latestPosts.count);
  const { siteUrl } = getServerEnv();

  return (
    <>
      <JsonLd data={[organizationJsonLd(site, siteUrl), websiteJsonLd(site, siteUrl)]} />
      <HeroSection
        data={sections.hero}
        eyebrow={<OpenStatus hours={site.openingHours} hoursLabel={hoursRange(site)} />}
      />
      <StatsSection data={sections.stats} />
      <ServicesSection data={sections.services} />
      <ProcessSection data={sections.process} />
      <BusinessBandSection data={sections.business} phone={site.phone} />
      <LatestPostsSection data={sections.latestPosts} posts={posts} />
    </>
  );
}
