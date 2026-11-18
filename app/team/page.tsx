import type { Metadata } from 'next';

import { PageHero } from '@/components/layout/PageHero';
import { PrinciplesSection } from '@/components/sections/PrinciplesSection';
import { TeamGridSection } from '@/components/sections/TeamGridSection';
import { getPageContent } from '@/content';
import { routes } from '@/lib/routes';
import { buildMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPageContent('team');
  return buildMetadata({ seo, path: routes.team() });
}

/** Đội ngũ — URL công khai /doi-ngu. SSG thuần khi nguồn là static. */
export default async function TeamPage() {
  const { sections } = await getPageContent('team');
  return (
    <>
      <PageHero {...sections.hero} />
      <TeamGridSection data={sections.members} />
      <PrinciplesSection data={sections.principles} />
    </>
  );
}
