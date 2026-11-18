import { z } from 'zod';

/**
 * Yêu cầu đặt lịch gửi từ form /dat-lich. Hợp đồng dự kiến với backend: `POST /bookings`
 * (docs/PLAN.md mục 2.7) — CHƯA nối (Q4). Server action hiện chỉ validate.
 */
export const BookingRequest = z.object({
  customerType: z.string().regex(/^[a-z0-9-]+$/, 'Vui lòng chọn loại khách hàng'),
  name: z.string().trim().min(2, 'Vui lòng nhập họ tên').max(100, 'Họ tên quá dài'),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s.-]/g, ''))
    .pipe(z.string().regex(/^(\+84|0)\d{9,10}$/, 'Số điện thoại chưa đúng định dạng')),
  device: z.string().regex(/^[a-z0-9-]+$/, 'Vui lòng chọn thiết bị'),
  description: z.string().trim().min(5, 'Vui lòng mô tả lỗi (ít nhất 5 ký tự)').max(2000),
  needVatInvoice: z.boolean(),
});

export type TBookingRequest = z.infer<typeof BookingRequest>;
export type BookingField = keyof TBookingRequest;

export type BookingFormState =
  | { status: 'idle' }
  | {
      status: 'invalid';
      errors: Partial<Record<BookingField, string>>;
      /** Giá trị đã nhập, để điền lại form khi trang render lại (không JS). */
      values: Partial<Record<BookingField, string>>;
    }
  /** Dữ liệu hợp lệ nhưng chưa có API đặt lịch — hướng dẫn gọi hotline, giữ lại dữ liệu đã nhập. */
  | { status: 'not_connected'; values: Partial<Record<BookingField, string>> }
  | { status: 'success'; code: string };

export const initialBookingState: BookingFormState = { status: 'idle' };
