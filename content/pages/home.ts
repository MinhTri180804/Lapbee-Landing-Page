import { routes } from '@/lib/routes';

import type { PageInput } from '../schemas/pages';

/**
 * Trang chủ — nội dung tĩnh. Copy từ design-system/ui_kits/website (Home.jsx, Process.jsx, data.js).
 * Không import trực tiếp ngoài content layer — dùng `getPageContent('home')`.
 */
export const home = {
  seo: {
    title: 'LAPBEE — Trung tâm sửa chữa máy tính từ 2012',
    description:
      'Sửa laptop, MacBook, PC, cứu dữ liệu và bảo trì IT cho doanh nghiệp. Kiểm tra, báo giá miễn phí; bảo hành bằng văn bản. Hơn 14 năm kinh nghiệm.',
  },
  sections: {
    hero: {
      title: 'Máy hỏng,\nđã có LAPBEE.',
      highlight: 'LAPBEE',
      lead: 'Trung tâm sửa chữa thiết bị công nghệ và máy tính uy tín, được nhiều sự tin tưởng, có hơn 14 năm kinh nghiệm, được thành lập từ năm 2012.',
      ctas: [
        { label: 'Đặt lịch sửa chữa', href: routes.booking(), iconRight: 'arrow-right' },
        { label: 'Xem dịch vụ', href: '#dich-vu', variant: 'outline' },
      ],
      photo: { image: null, label: 'ẢNH XƯỞNG SỬA CHỮA' },
      chip: { value: '14+', text: 'năm kinh nghiệm\ntừ LAPPY 2012' },
    },
    stats: {
      heading: 'LAPBEE qua các con số',
      items: [
        { value: '2012', label: 'Thành lập với tên LAPPY' },
        { value: '14+', label: 'Năm kinh nghiệm' },
        { value: '0đ', label: 'Phí kiểm tra, báo giá' },
        { value: 'Văn bản', label: 'Phiếu bảo hành rõ ràng' },
      ],
    },
    services: {
      anchor: 'dich-vu',
      title: 'Dịch vụ',
      intro: 'Một nơi cho toàn bộ thiết bị công nghệ của bạn và doanh nghiệp.',
      cta: {
        label: 'Nhận báo giá',
        href: routes.booking(),
        variant: 'ghost',
        iconRight: 'arrow-up-right',
      },
      items: [
        {
          icon: 'laptop',
          title: 'Sửa laptop',
          description: 'Chẩn đoán lỗi nguồn, mainboard, bản lề, bàn phím cho mọi hãng.',
          time: 'Từ 1 giờ',
        },
        {
          icon: 'apple',
          title: 'MacBook & iMac',
          description: 'Thay pin, màn hình Retina, sửa lỗi logic board, vệ sinh tản nhiệt.',
          time: 'Từ 2 giờ',
        },
        {
          icon: 'monitor',
          title: 'Thay màn hình',
          description: 'Màn hình chính hãng và tương đương, kiểm tra điểm chết trước khi giao.',
          time: 'Từ 45 phút',
        },
        {
          icon: 'hard-drive',
          title: 'Cứu dữ liệu',
          description: 'Khôi phục dữ liệu ổ HDD, SSD, thẻ nhớ trong phòng sạch.',
          time: 'Báo sau kiểm tra',
        },
        {
          icon: 'cpu',
          title: 'Nâng cấp & lắp ráp',
          description: 'Nâng RAM, SSD, card đồ hoạ; build PC theo nhu cầu công việc.',
          time: 'Trong ngày',
        },
        {
          icon: 'building-2',
          title: 'Dịch vụ doanh nghiệp',
          description: 'Bảo trì định kỳ, hợp đồng IT, xử lý sự cố tại văn phòng.',
          time: 'Theo hợp đồng',
        },
      ],
    },
    process: {
      label: 'Quy trình',
      title: 'Bốn bước,\nkhông bất ngờ.',
      intro: 'Bạn luôn biết máy mình đang ở đâu và chi phí là bao nhiêu.',
      cta: { label: 'Bắt đầu bước 1', href: routes.booking(), iconRight: 'arrow-right' },
      steps: [
        {
          icon: 'phone-call',
          title: 'Tiếp nhận',
          body: 'Mô tả lỗi qua điện thoại hoặc mang máy đến trung tâm. Gọi hotline, nhắn tin hoặc mang máy trực tiếp đến trung tâm.',
          meta: '~ 5 phút',
        },
        {
          icon: 'scan-search',
          title: 'Kiểm tra miễn phí',
          body: 'Kỹ thuật viên chẩn đoán và báo giá trước khi làm. Báo giá bằng văn bản, kèm nguyên nhân lỗi.',
          meta: '0đ · miễn phí',
        },
        {
          icon: 'wrench',
          title: 'Sửa chữa',
          body: 'Chỉ tiến hành khi bạn đồng ý. Theo dõi tiến độ qua mã phiếu. Tra cứu tiến độ bất kỳ lúc nào.',
          meta: 'Theo mã phiếu',
        },
        {
          icon: 'shield-check',
          title: 'Bàn giao & bảo hành',
          body: 'Kiểm tra cùng bạn, phiếu bảo hành bằng văn bản. Ghi rõ linh kiện và thời hạn.',
          meta: 'Bảo hành văn bản',
        },
      ],
    },
    business: {
      label: 'Doanh nghiệp',
      title: 'Bộ phận IT thuê ngoài cho văn phòng của bạn.',
      lead: 'Bảo trì định kỳ, xử lý sự cố tại chỗ và báo cáo tình trạng thiết bị hằng tháng.',
      cta: { label: 'Liên hệ tư vấn', href: routes.booking() },
      showPhone: true,
      points: [
        'Hợp đồng bảo trì theo quý hoặc năm',
        'Kỹ thuật viên phụ trách riêng',
        'Xuất hoá đơn VAT',
        'Ưu tiên xử lý trong ngày',
      ],
    },
    latestPosts: {
      title: 'Bài đăng mới',
      cta: {
        label: 'Tất cả bài đăng',
        href: routes.posts(),
        variant: 'outline',
        iconRight: 'arrow-right',
      },
      count: 3,
    },
  },
} satisfies PageInput<'home'>;
