import type { PageInput } from '../schemas/pages';

/**
 * Đặt lịch — nội dung tĩnh (nhãn form). Form chưa gửi về backend (Q4) — docs/ASSUMPTIONS.md.
 * Không import trực tiếp ngoài content layer — dùng `getPageContent('booking')`.
 */
export const booking = {
  seo: {
    title: 'Đặt lịch sửa chữa',
    description:
      'Để lại thông tin, kỹ thuật viên LAPBEE gọi lại trong 15 phút (giờ làm việc). Kiểm tra và báo giá miễn phí.',
  },
  sections: {
    hero: {
      eyebrow: 'Đặt lịch',
      title: 'Đặt lịch sửa chữa.',
      lead: 'Để lại thông tin, kỹ thuật viên sẽ gọi lại trong 15 phút (giờ làm việc).',
    },
    form: {
      customerTypeLegend: 'Bạn là',
      customerTypes: [
        { value: 'personal', label: 'Cá nhân' },
        { value: 'business', label: 'Doanh nghiệp' },
      ],
      nameLabel: 'Họ và tên',
      namePlaceholder: 'Nguyễn Văn A',
      phoneLabel: 'Số điện thoại',
      phonePlaceholder: '09xx xxx xxx',
      deviceLabel: 'Thiết bị',
      devicePlaceholder: 'Chọn thiết bị',
      devices: [
        { value: 'laptop', label: 'Laptop' },
        { value: 'macbook', label: 'MacBook' },
        { value: 'pc', label: 'PC' },
        { value: 'tablet', label: 'Máy tính bảng' },
        { value: 'phone', label: 'Điện thoại' },
        { value: 'other', label: 'Khác' },
      ],
      descriptionLabel: 'Mô tả lỗi',
      descriptionPlaceholder: 'Máy không lên nguồn, màn hình sọc…',
      vatLabel: 'Tôi cần xuất hoá đơn VAT',
      submitLabel: 'Gửi yêu cầu',
      notConnectedMessage:
        'Hệ thống đặt lịch trực tuyến đang được hoàn thiện. Vui lòng gọi hotline để đặt lịch ngay.',
    },
    contact: {
      heading: 'Thông tin liên hệ',
      phoneLabel: 'Hotline',
      addressLabel: 'Địa chỉ',
      hoursLabel: 'Giờ làm việc',
      mapLabel: 'BẢN ĐỒ',
    },
  },
} satisfies PageInput<'booking'>;
