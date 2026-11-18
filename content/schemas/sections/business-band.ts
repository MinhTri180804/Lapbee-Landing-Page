import { z } from 'zod';

import { Cta, Heading, Text } from '../common';

/** Band tối giới thiệu dịch vụ doanh nghiệp. */
export const BusinessBandSection = z.object({
  label: Text,
  title: Heading,
  lead: Text,
  cta: Cta,
  /** Hiện nút gọi hotline (số lấy từ SiteSettings). */
  showPhone: z.boolean(),
  points: z.array(Text).min(1).max(8),
});
