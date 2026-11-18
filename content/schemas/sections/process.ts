import { z } from 'zod';

import { Cta, Heading, IconName, Text } from '../common';

/** Quy trình các bước (cột trái dính khi cuộn, danh sách bước bên phải). */
export const ProcessSection = z.object({
  label: Text,
  title: Heading,
  intro: Text,
  cta: Cta,
  steps: z
    .array(
      z.object({
        icon: IconName,
        title: Text,
        body: Text,
        /** Nhãn mono góc phải, vd. "0đ · miễn phí". */
        meta: Text,
      }),
    )
    .min(2)
    .max(6),
});
