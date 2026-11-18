import { z } from 'zod';

import { Text } from '../common';

const Option = z.object({ value: z.string().regex(/^[a-z0-9-]+$/), label: Text });

/** Form đặt lịch: nhãn, gợi ý, lựa chọn. Logic gửi form nằm ở server action (GĐ5). */
export const BookingFormSection = z.object({
  customerTypeLegend: Text,
  customerTypes: z.array(Option).min(1),
  nameLabel: Text,
  namePlaceholder: Text,
  phoneLabel: Text,
  phonePlaceholder: Text,
  deviceLabel: Text,
  devicePlaceholder: Text,
  devices: z.array(Option).min(1),
  descriptionLabel: Text,
  descriptionPlaceholder: Text,
  vatLabel: Text,
  submitLabel: Text,
  /** Thông báo khi chưa nối API đặt lịch. */
  notConnectedMessage: Text,
});

/** Cột liên hệ bên cạnh form (hotline/địa chỉ/giờ lấy từ SiteSettings). */
export const BookingContactSection = z.object({
  /** Tiêu đề h2 (ẩn). */
  heading: Text,
  phoneLabel: Text,
  addressLabel: Text,
  hoursLabel: Text,
  mapLabel: Text,
});
