import { routes } from '@/lib/routes';

import type { PageInput } from '../schemas/pages';

/**
 * Hành trình — nội dung tĩnh. ⚠ Các mốc (trừ LAPPY 2012) là DỮ LIỆU MẪU; ảnh dùng placeholder
 * (ảnh Unsplash trong data.js không dùng ở production) — docs/ASSUMPTIONS.md.
 * Không import trực tiếp ngoài content layer — dùng `getPageContent('journey')`.
 */
export const journey = {
  seo: {
    title: 'Hành trình từ LAPPY đến LAPBEE',
    description:
      'Từ một quầy sửa laptop năm 2012 đến trung tâm sửa chữa với xưởng mainboard và phòng cứu dữ liệu. Hơn 14 năm, một cách làm việc: cẩn thận và minh bạch.',
  },
  sections: {
    hero: {
      eyebrow: 'Hành trình · 2012 → 2026',
      title: 'Từ LAPPY đến LAPBEE.',
      lead: 'Hơn 14 năm, một cách làm việc: cẩn thận, minh bạch và tôn trọng thiết bị của khách hàng.',
    },
    timeline: {
      heading: 'Các mốc chính',
      chapters: [
        {
          year: '2012',
          title: 'LAPPY ra đời',
          body: 'Một quầy sửa laptop nhỏ với hai kỹ thuật viên và một cam kết: báo giá trước, sửa sau.',
          photos: [{ image: null, label: 'QUẦY SỬA ĐẦU TIÊN · 2012' }],
        },
        {
          year: '2015',
          title: 'Mở xưởng mainboard',
          body: 'Đầu tư thiết bị hàn chip BGA, nhận sửa các lỗi mà nơi khác từ chối.',
          photos: [
            { image: null, label: 'XƯỞNG MAINBOARD' },
            { image: null, label: 'MÁY HÀN BGA' },
          ],
        },
        {
          year: '2018',
          title: 'Phục vụ doanh nghiệp',
          body: 'Ký những hợp đồng bảo trì IT đầu tiên cho văn phòng và trường học.',
          photos: [],
          quote: {
            text: 'Lần đầu ký hợp đồng với một văn phòng 40 máy, chúng tôi hiểu rằng doanh nghiệp không cần người sửa nhanh nhất, mà cần người đến đúng hẹn mỗi lần.',
            author: 'Nguyễn Minh Khoa',
            role: 'Nhà sáng lập',
          },
        },
        {
          year: '2021',
          title: 'Đổi tên thành LAPBEE',
          body: 'Thương hiệu mới, cùng đội ngũ và cách làm việc cũ — cẩn thận như một tổ ong.',
          photos: [
            { image: null, label: 'BIỂN HIỆU LAPBEE MỚI' },
            { image: null, label: 'ĐỘI NGŨ 2021' },
            { image: null, label: 'QUẦY TIẾP NHẬN MỚI' },
          ],
        },
        {
          year: '2024',
          title: 'Phòng cứu dữ liệu',
          body: 'Phòng sạch chuyên dụng cho ổ cứng và SSD hư hỏng vật lý.',
          photos: [
            { image: null, label: 'PHÒNG SẠCH' },
            { image: null, label: 'Ổ CỨNG HƯ HỎNG' },
            { image: null, label: 'THIẾT BỊ ĐỌC CHIP' },
            { image: null, label: 'KỸ THUẬT VIÊN LÀM VIỆC' },
            { image: null, label: 'KHU LƯU TRỮ' },
          ],
        },
        {
          year: '2026',
          title: '14 năm',
          body: 'Tiếp tục mở rộng dịch vụ và chia sẻ kiến thức qua chuyên mục bài đăng.',
          photos: [{ image: null, label: 'ĐỘI NGŨ HIỆN TẠI · 2026' }],
        },
      ],
    },
    ctaBanner: {
      title: 'Chương tiếp theo bắt đầu với chiếc máy của bạn.',
      cta: {
        label: 'Đặt lịch sửa',
        href: routes.booking(),
        variant: 'secondary',
        iconRight: 'arrow-right',
      },
    },
  },
} satisfies PageInput<'journey'>;
