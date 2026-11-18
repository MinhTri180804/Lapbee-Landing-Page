import { z } from 'zod';

import { Cta, Heading, IconName, Text } from '../common';

/** Lưới dịch vụ. */
export const ServicesSection = z.object({
  /** id neo cho CTA "Xem dịch vụ" (vd. "dich-vu" → href "#dich-vu"). */
  anchor: z.string().regex(/^[a-z0-9-]+$/),
  title: Heading,
  intro: Text.optional(),
  cta: Cta.optional(),
  items: z
    .array(
      z.object({
        icon: IconName,
        title: Text,
        description: Text,
        /** Nhãn mono thời gian, vd. "Từ 1 giờ". */
        time: Text,
      }),
    )
    .min(1)
    .max(12),
});
