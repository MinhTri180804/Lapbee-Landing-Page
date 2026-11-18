import { z } from 'zod';

import { Heading, Photo, Text } from '../common';

/** Dòng thời gian Hành trình: mỗi chương một năm, 0–n ảnh hoặc một trích dẫn. */
export const TimelineSection = z.object({
  /** Tiêu đề h2 ẩn cho cả dòng thời gian. */
  heading: Heading,
  chapters: z
    .array(
      z.object({
        year: z.string().regex(/^\d{4}$/, 'year dạng YYYY'),
        title: Text,
        body: Text,
        photos: z.array(Photo).max(12).default([]),
        quote: z.object({ text: Text, author: Text, role: Text }).optional(),
      }),
    )
    .min(1),
});
