import { z } from 'zod';

import { ICON_NAMES } from '@/components/ui/icons';

/** Chuỗi không rỗng (sau khi bỏ khoảng trắng hai đầu). */
export const Text = z.string().trim().min(1);

/** Tên icon: chỉ những icon có trong registry `components/ui/icons.ts`. */
export const IconName = z.enum(ICON_NAMES);

/**
 * Link: đường dẫn nội bộ (URL công khai, vd. "/dat-lich"), neo "#…", tel:, mailto: hoặc https://.
 * Không chấp nhận javascript: hay http:// (trừ localhost khi dev mock).
 */
export const Href = z
  .string()
  .trim()
  .refine(
    (v) =>
      /^\/(?!\/)/.test(v) ||
      v.startsWith('#') ||
      /^tel:\+?[\d]+$/.test(v) ||
      /^mailto:[^\s@]+@[^\s@]+$/.test(v) ||
      /^https:\/\//.test(v) ||
      /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//.test(v),
    { message: 'Link không hợp lệ (cần /đường-dẫn, #neo, tel:, mailto: hoặc https://)' },
  );

/** Ảnh có kích thước cố định (next/image cần width/height để tránh nhảy layout). */
export const Image = z.object({
  /** "/images/…" (trong public/) hoặc URL https từ backend. */
  src: z.string().refine((v) => v.startsWith('/') || v.startsWith('https://'), {
    message: 'src phải là /đường-dẫn trong public/ hoặc URL https://',
  }),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: z.string().trim(),
});

/**
 * Ảnh có thể chưa có: `image: null` → hiển thị khung gạch chéo (placeholder) kèm `label`.
 * Theo design system, dùng placeholder cho đến khi có ảnh chụp thật.
 */
export const Photo = z.object({
  image: Image.nullable(),
  /** Nhãn mono trên placeholder / chú thích ảnh, vd. "ẢNH XƯỞNG SỬA CHỮA". */
  label: Text,
});

export const Cta = z.object({
  label: Text,
  href: Href,
  variant: z.enum(['primary', 'secondary', 'outline', 'ghost', 'inverse']).optional(),
  iconLeft: IconName.optional(),
  iconRight: IconName.optional(),
});

/**
 * Tiêu đề có thể xuống dòng có chủ đích: dùng "\n" trong chuỗi.
 * (Giữ dạng chuỗi để backend nhập dễ; component tách dòng khi render.)
 */
export const Heading = Text;

export type TImage = z.infer<typeof Image>;
export type TPhoto = z.infer<typeof Photo>;
export type TCta = z.infer<typeof Cta>;
