import { z } from 'zod';

import { Text } from './common';

/**
 * SEO của một trang — dùng chung cho trang landing (content layer) và bài viết (blog API).
 * Khớp hợp đồng `Seo` trong brief: { title, description, ogImage?, canonical?, noindex? }.
 */
export const Seo = z.object({
  title: Text.max(70, 'title nên ≤ 70 ký tự'),
  description: Text.max(200, 'description nên ≤ 200 ký tự'),
  /** URL ảnh Open Graph (https://… hoặc /đường-dẫn trong public/). */
  ogImage: z
    .string()
    .refine((v) => v.startsWith('/') || v.startsWith('https://'))
    .optional(),
  /** Đường dẫn hoặc URL canonical. Bỏ trống → dùng URL công khai của trang. */
  canonical: z.string().optional(),
  noindex: z.boolean().optional(),
});

export type TSeo = z.infer<typeof Seo>;
