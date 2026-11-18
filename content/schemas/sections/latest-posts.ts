import { z } from 'zod';

import { Cta, Heading } from '../common';

/** Khối "Bài đăng mới" ở trang chủ. Chỉ là cấu hình — danh sách bài lấy từ blog API. */
export const LatestPostsSection = z.object({
  title: Heading,
  cta: Cta,
  count: z.number().int().min(1).max(6),
});
