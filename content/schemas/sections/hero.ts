import { z } from 'zod';

import { Cta, Heading, Photo, Text } from '../common';

/** Hero trang chủ: tiêu đề lớn, đoạn dẫn, 1–2 CTA, ảnh + chip số liệu. */
export const HeroSection = z
  .object({
    title: Heading,
    /** Cụm từ trong `title` được tô nền vàng (xuất hiện đúng nguyên văn), vd. "LAPBEE". */
    highlight: Text.optional(),
    lead: Text,
    ctas: z.array(Cta).min(1).max(2),
    photo: Photo,
    /** Chip nổi trên ảnh, vd. { value: "14+", text: "năm kinh nghiệm\ntừ LAPPY 2012" }. */
    chip: z.object({ value: Text, text: Text }).optional(),
  })
  .refine((s) => !s.highlight || s.title.includes(s.highlight), {
    message: '`highlight` phải nằm trong `title`',
    path: ['highlight'],
  });
