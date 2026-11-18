import { routes } from '@/lib/routes';

import type { PageInput } from '../schemas/pages';

/**
 * Bài đăng — phần tĩnh (tiêu đề, nhãn) của danh sách, danh mục, tìm kiếm và trang chi tiết.
 * Dữ liệu bài lấy từ blog API.
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
      pageSize: 6,
      allCategoriesLabel: 'Tất cả',
      categoriesLabel: 'Danh mục bài viết',
      searchLabel: 'Tìm bài viết',
      searchPlaceholder: 'Tìm bài viết',
      searchSubmitLabel: 'Tìm',
      countUnit: 'bài viết',
      emptyText: 'Không tìm thấy bài viết phù hợp.',
      readingTimeSuffix: 'đọc',
      search: {
        eyebrow: 'Tìm kiếm',
        title: 'Tìm bài viết',
        resultsTitle: 'Kết quả cho “{q}”',
        promptText: 'Nhập từ khoá, ví dụ: pin, SSD, vệ sinh máy.',
        seoTitle: 'Tìm bài viết',
        seoDescription: 'Tìm bài viết hướng dẫn, mẹo và tin tức từ LAPBEE.',
      },
    },
    article: {
      backLabel: 'Bài đăng',
      bylinePrefix: 'Bởi',
      author: 'Đội kỹ thuật LAPBEE',
      copyLinkLabel: 'Sao chép liên kết',
      copiedLabel: 'Đã sao chép liên kết',
      cta: {
        title: 'Máy bạn có dấu hiệu tương tự?',
        body: 'Kiểm tra và báo giá miễn phí.',
        cta: { label: 'Đặt lịch', href: routes.booking(), iconRight: 'arrow-right' },
      },
    },
  },
} satisfies PageInput<'posts'>;
