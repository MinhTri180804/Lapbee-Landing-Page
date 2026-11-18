'use server';

import { BookingRequest, type BookingField, type BookingFormState } from '@/lib/booking';

const FIELDS: BookingField[] = ['customerType', 'name', 'phone', 'device', 'description'];

/**
 * Server action của form đặt lịch. Chạy được cả khi tắt JS (form POST thường).
 * Hiện CHỈ validate — chưa gửi về backend (Q4: API đặt lịch thêm sau).
 * Khi có API: gọi `POST /bookings` qua lib/api rồi trả { status: 'success', code }.
 */
export async function submitBooking(
  _prev: BookingFormState,
  formData: FormData,
): Promise<BookingFormState> {
  const raw = {
    customerType: String(formData.get('customerType') ?? ''),
    name: String(formData.get('name') ?? ''),
    phone: String(formData.get('phone') ?? ''),
    device: String(formData.get('device') ?? ''),
    description: String(formData.get('description') ?? ''),
    needVatInvoice: formData.get('needVatInvoice') === 'on',
  };

  // Giá trị đã nhập trả lại cho form (để không mất dữ liệu khi trang render lại).
  const values: Partial<Record<BookingField, string>> = {
    ...Object.fromEntries(FIELDS.map((f) => [f, raw[f] as string])),
    needVatInvoice: raw.needVatInvoice ? 'on' : '',
  };

  const parsed = BookingRequest.safeParse(raw);
  if (!parsed.success) {
    const errors: Partial<Record<BookingField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as BookingField | undefined;
      if (field && !errors[field]) errors[field] = issue.message;
    }
    return { status: 'invalid', errors, values };
  }

  // Chưa nối backend: không lưu, không log dữ liệu cá nhân.
  return { status: 'not_connected', values };
}
