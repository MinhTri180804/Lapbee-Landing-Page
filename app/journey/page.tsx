import type { Metadata } from 'next';

import { PageHero } from '@/components/layout/PageHero';
import { CtaBannerSection } from '@/components/sections/CtaBannerSection';
import { TimelineSection } from '@/components/sections/TimelineSection';
import { getPageContent } from '@/content';
import { routes } from '@/lib/routes';
import { buildMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPageContent('journey');
  return buildMetadata({ seo, path: routes.journey() });
}

/** Hành trình — URL công khai /hanh-trinh. SSG thuần khi nguồn là static. */
export default async function JourneyPage() {
  const { sections } = await getPageContent('journey');
  return (
    <>
      <PageHero {...sections.hero} />
      <TimelineSection data={sections.timeline} />
      <CtaBannerSection data={sections.ctaBanner} />
    </>
  );
}
