import type { z } from 'zod';

import { routes } from '@/lib/routes';

import type { SiteSettings } from './schemas/site';

/**
 * Thông tin chung của site (nguồn tĩnh).
 * ⚠ DỮ LIỆU MẪU từ design-system/ui_kits/website/data.js — SĐT, địa chỉ cần thay (docs/ASSUMPTIONS.md).
 * Không import file này trực tiếp ngoài content layer — dùng `getSiteSettings()`.
 */
export const site = {
  name: 'LAPBEE',
  legalName: 'Công ty TNHH LAPBEE',
  foundingYear: 2012,
  about: 'Trung tâm sửa chữa thiết bị công nghệ và máy tính. Thành lập năm 2012 với tên LAPPY.',
  phone: '1900 0000',
  address: '123 Đường Mẫu, Quận 1, TP. Hồ Chí Minh',
  mapUrl: 'https://maps.google.com/?q=123+%C4%90%C6%B0%E1%BB%9Dng+M%E1%BA%ABu%2C+Qu%E1%BA%ADn+1',
  hours: '08:00 – 20:00, Thứ 2 – Chủ nhật',
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '08:00',
    closes: '20:00',
  },
  nav: [
    { href: routes.home(), label: 'Trang chủ', description: 'Dịch vụ & quy trình' },
    { href: routes.team(), label: 'Đội ngũ', description: 'Những người sửa máy cho bạn' },
    { href: routes.journey(), label: 'Hành trình', description: 'Từ LAPPY 2012 đến nay' },
    { href: routes.posts(), label: 'Bài đăng', description: 'Mẹo, tin tức, hướng dẫn' },
  ],
  cta: { label: 'Đặt lịch sửa', href: routes.booking() },
  footer: {
    copyright: '© 2026 Công ty TNHH LAPBEE',
    since: '2012 → 2026',
  },
  social: [],
} satisfies z.input<typeof SiteSettings>;
