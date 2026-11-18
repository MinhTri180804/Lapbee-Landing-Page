/** Kiểu props dùng chung cho layout. Schema zod tương ứng (SiteSettings) đặt ở content layer — GĐ3. */

export type NavItem = {
  href: string;
  label: string;
  /** Dòng phụ trong menu mobile, vd. "Dịch vụ & quy trình". */
  description?: string;
};

export type ContactInfo = {
  /** Hiển thị, vd. "1900 0000". */
  phone: string;
  address: string;
  /** Link bản đồ (Google Maps). */
  mapUrl: string;
  /** vd. "08:00 – 20:00, Thứ 2 – Chủ nhật". */
  hours: string;
};

export type CtaLink = {
  label: string;
  href: string;
};

/** `tel:` link từ số hiển thị (bỏ khoảng trắng, dấu chấm, gạch). */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}
