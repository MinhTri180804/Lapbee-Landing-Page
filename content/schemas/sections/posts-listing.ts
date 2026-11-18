import { z } from 'zod';

import { Text } from '../common';

/** Nhãn cố định của trang danh sách bài đăng (dữ liệu bài lấy từ blog API). */
export const PostsListingSection = z.object({
  allCategoriesLabel: Text,
  searchLabel: Text,
  searchPlaceholder: Text,
  emptyText: Text,
  /** Hậu tố thời gian đọc, vd. "đọc" → "4 phút đọc". */
  readingTimeSuffix: Text,
});
