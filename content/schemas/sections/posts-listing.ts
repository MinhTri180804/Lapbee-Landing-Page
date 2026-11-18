import { z } from 'zod';

import { Cta, Text } from '../common';

/** Nhãn cố định của trang danh sách / danh mục / tìm kiếm bài đăng (dữ liệu bài lấy từ blog API). */
export const PostsListingSection = z.object({
  /** Số bài mỗi trang (gửi lên API qua `limit`). Bài `featured` ở trang 1 hiển thị thẻ lớn. */
  pageSize: z.number().int().min(3).max(24),
  allCategoriesLabel: Text,
  /** Nhãn cho nhóm link lọc danh mục (trình đọc màn hình). */
  categoriesLabel: Text,
  searchLabel: Text,
  searchPlaceholder: Text,
  searchSubmitLabel: Text,
  /** Đơn vị đếm, vd. "bài viết" → "1–6 / 18 bài viết". */
  countUnit: Text,
  emptyText: Text,
  /** Hậu tố thời gian đọc, vd. "đọc" → "4 phút đọc". */
  readingTimeSuffix: Text,
  /** Trang tìm kiếm (`/bai-dang/tim-kiem`). */
  search: z.object({
    eyebrow: Text,
    title: Text,
    /** Tiêu đề khi có từ khoá; `{q}` được thay bằng từ khoá. */
    resultsTitle: Text.refine((v) => v.includes('{q}'), 'phải chứa {q}'),
    /** Hiển thị khi chưa nhập từ khoá. */
    promptText: Text,
    seoTitle: Text,
    seoDescription: Text,
  }),
});

/** Nhãn của trang chi tiết bài viết (nội dung bài lấy từ blog API). */
export const PostArticleSection = z.object({
  backLabel: Text,
  /** vd. "Bởi" → "Bởi Đội kỹ thuật LAPBEE". */
  bylinePrefix: Text,
  author: Text,
  copyLinkLabel: Text,
  copiedLabel: Text,
  /** Khối kêu gọi cuối bài. */
  cta: z.object({ title: Text, body: Text, cta: Cta }),
});
