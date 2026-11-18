import { z } from 'zod';

import { Heading, Text } from '../common';

/** Mở đầu trang con; chứa h1 của trang. */
export const PageHeroSection = z.object({
  eyebrow: Text,
  title: Heading,
  lead: Text.optional(),
});
