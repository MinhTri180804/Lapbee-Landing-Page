import type { PageInput } from '../schemas/pages';

/**
 * Đội ngũ — nội dung tĩnh. ⚠ Tên, vai trò là DỮ LIỆU MẪU (docs/ASSUMPTIONS.md).
 * Không import trực tiếp ngoài content layer — dùng `getPageContent('team')`.
 */
export const team = {
  seo: {
    title: 'Đội ngũ kỹ thuật viên',
    description:
      'Kỹ thuật viên LAPBEE làm việc theo chuyên môn: mainboard, MacBook, cứu dữ liệu, phần cứng. Báo giá trước, giải thích rõ lỗi, bảo hành bằng văn bản.',
  },
  sections: {
    hero: {
      eyebrow: 'Đội ngũ',
      title: 'Những người giữ cho máy của bạn hoạt động.',
      lead: 'Kỹ thuật viên LAPBEE làm việc theo chuyên môn: mỗi thiết bị đến tay người hiểu nó nhất.',
    },
    members: {
      heading: 'Thành viên',
      members: [
        { name: 'Nguyễn Minh Khoa', role: 'Nhà sáng lập · Giám đốc', since: 2012, photo: null },
        { name: 'Trần Thu Hà', role: 'Trưởng phòng kỹ thuật', since: 2014, photo: null },
        { name: 'Lê Quốc Bảo', role: 'Chuyên gia mainboard', since: 2015, photo: null },
        { name: 'Phạm Ngọc Anh', role: 'Chăm sóc khách hàng', since: 2017, photo: null },
        { name: 'Võ Đức Thịnh', role: 'Kỹ thuật viên MacBook', since: 2018, photo: null },
        { name: 'Đặng Mỹ Linh', role: 'Phụ trách doanh nghiệp', since: 2020, photo: null },
        { name: 'Huỳnh Gia Huy', role: 'Cứu dữ liệu', since: 2021, photo: null },
        { name: 'Bùi Thanh Tâm', role: 'Kỹ thuật viên phần cứng', since: 2023, photo: null },
      ],
    },
    principles: {
      label: 'Nguyên tắc',
      title: 'Cách chúng tôi\nlàm việc.',
      intro: 'Ba cam kết mọi kỹ thuật viên LAPBEE giữ với từng chiếc máy, từ 2012 đến nay.',
      items: [
        {
          icon: 'receipt-text',
          title: 'Báo giá trước',
          body: 'Không sửa khi bạn chưa đồng ý chi phí.',
          proof: 'Phiếu báo giá có chữ ký',
        },
        {
          icon: 'message-square-text',
          title: 'Nói rõ lỗi',
          body: 'Giải thích nguyên nhân bằng ngôn ngữ dễ hiểu, kèm hình ảnh linh kiện.',
          proof: 'Ảnh linh kiện trước & sau',
        },
        {
          icon: 'shield-check',
          title: 'Bảo hành thật',
          body: 'Phiếu bảo hành bằng văn bản, ghi rõ linh kiện và thời hạn.',
          proof: 'Bảo hành bằng văn bản',
        },
      ],
    },
  },
} satisfies PageInput<'team'>;
