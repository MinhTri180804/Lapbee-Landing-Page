import type { PageInput } from '../schemas/pages';

/**
 * Trang danh sách Bài đăng — phần tĩnh (tiêu đề, nhãn). Danh sách bài lấy từ blog API (GĐ6).
 * Không import trực tiếp ngoài content layer — dùng `getPageContent('posts')`.
 */
export const posts = {
  seo: {
    title: 'Bài đăng: mẹo, tin tức, hướng dẫn sửa máy',
    description:
      'Kiến thức, tin tức và mẹo từ xưởng sửa chữa LAPBEE: pin laptop, vệ sinh máy, sao lưu dữ liệu, nâng cấp SSD, RAM.',
  },
  sections: {
    hero: {
      eyebrow: 'Bài đăng',
      title: 'Kiến thức, tin tức và mẹo từ xưởng sửa chữa.',
    },
    listing: {
      allCategoriesLabel: 'Tất cả',
      searchLabel: 'Tìm bài viết',
      searchPlaceholder: 'Tìm bài viết',
      emptyText: 'Không tìm thấy bài viết phù hợp.',
      readingTimeSuffix: 'đọc',
    },
  },
} satisfies PageInput<'posts'>;
