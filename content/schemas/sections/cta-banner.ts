import { z } from 'zod';

import { Cta, Heading } from '../common';

/** Thẻ vàng (brand) kêu gọi hành động — tối đa một lần mỗi trang. */
export const CtaBannerSection = z.object({
  title: Heading,
  cta: Cta,
});
