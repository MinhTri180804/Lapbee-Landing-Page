import { booking } from '../pages/booking';
import { home } from '../pages/home';
import { journey } from '../pages/journey';
import { posts } from '../pages/posts';
import { team } from '../pages/team';
import type { PageSlug } from '../schemas/pages';
import { site } from '../site';

import type { PageSource, SiteSource } from './types';

const staticPages: Record<PageSlug, unknown> = { home, team, journey, posts, booking };

/** Nội dung nằm trong repo. Không gọi mạng. */
export const staticSource: PageSource & SiteSource = {
  getPage: async (slug) => staticPages[slug],
  getSite: async () => site,
};
