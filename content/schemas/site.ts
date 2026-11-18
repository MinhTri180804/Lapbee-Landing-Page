import { z } from 'zod';

import { Href, Text } from './common';

const Time = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Giờ dạng HH:mm');

export const DayOfWeek = z.enum([
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]);

export const NavItem = z.object({
  href: Href,
  label: Text,
  /** Dòng phụ trong menu mobile. */
  description: Text.optional(),
});

/** Thông tin chung của site: header, footer, menu, liên hệ. Nguồn cấu hình qua `sources.site`. */
export const SiteSettings = z.object({
  /** Tên thương hiệu, vd. "LAPBEE". */
  name: Text,
  /** Tên pháp lý, vd. "Công ty TNHH LAPBEE". */
  legalName: Text,
  /** Năm thành lập (dùng cho JSON-LD, nhãn "since"). */
  foundingYear: z.number().int().min(1990).max(2100),
  /** Đoạn giới thiệu ngắn ở footer. */
  about: Text,
  phone: Text,
  email: z.email().optional(),
  address: Text,
  mapUrl: Href,
  /** Hiển thị, vd. "08:00 – 20:00, Thứ 2 – Chủ nhật". */
  hours: Text,
  /** Dạng có cấu trúc: trạng thái "Đang nhận máy" (client) và JSON-LD. Múi giờ Asia/Ho_Chi_Minh. */
  openingHours: z
    .object({
      days: z.array(DayOfWeek).min(1),
      opens: Time,
      closes: Time,
    })
    .refine((h) => h.opens < h.closes, { message: 'opens phải trước closes' }),
  nav: z.array(NavItem).min(1).max(8),
  /** CTA chính ở header/menu, vd. "Đặt lịch sửa". */
  cta: z.object({ label: Text, href: Href }),
  footer: z.object({
    copyright: Text,
    /** Nhãn mono bên phải, vd. "2012 → 2026". */
    since: Text.optional(),
  }),
  /** Link mạng xã hội (Facebook, Zalo OA…) — dùng cho JSON-LD sameAs. */
  social: z.array(z.url({ protocol: /^https$/ })).default([]),
});

export type TSiteSettings = z.infer<typeof SiteSettings>;
export type TNavItem = z.infer<typeof NavItem>;
