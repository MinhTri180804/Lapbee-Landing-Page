# ASSUMPTIONS — Giả định & dữ liệu mẫu

Những điểm chưa có thông tin thật. Mỗi mục ghi rõ đang dùng giá trị gì và cần ai xác nhận.

## Môi trường

| Mục               | Giá trị tạm                                             | Cần                            |
| ----------------- | ------------------------------------------------------- | ------------------------------ |
| Domain            | `https://example.com` (`SITE_URL` trong `.env.example`) | Domain thật                    |
| API base URL      | `https://api.example.com`                               | URL backend thật               |
| Node trên hosting | 24                                                      | Đã xác nhận cPanel có 22 và 24 |
| SSH               | Có                                                      | Đã xác nhận                    |

## Nội dung

| Mục                                | Hiện trạng                                                                                         | Nguồn                                   |
| ---------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------- |
| Tên, SĐT, địa chỉ, giờ mở cửa      | Dữ liệu mẫu (`1900 0000`, `123 Đường Mẫu…`)                                                        | `design-system/ui_kits/website/data.js` |
| Đội ngũ, mốc lịch sử               | Dữ liệu mẫu (trừ mốc LAPPY 2012)                                                                   | như trên                                |
| Ảnh xưởng, chân dung, ảnh bài viết | Placeholder gạch chéo theo design system. **Không dùng** ảnh Unsplash trong `data.js` ở production | —                                       |
| Logo                               | `lapbe-logo.svg` thực chất là PNG 436×436 nhúng trong SVG, không phải vector                       | Cần bản vector thật nếu in ấn/phóng lớn |

## API

| Mục                                   | Giả định                                                                                          | Cần backend xác nhận  |
| ------------------------------------- | ------------------------------------------------------------------------------------------------- | --------------------- |
| Danh mục, featured, tìm kiếm bài viết | Tên trường/tham số theo `docs/PLAN.md` mục 2.7 (`category`, `featured`, `q`, `GET /categories`)   | Tên trường thật       |
| Đặt lịch                              | Form làm theo design, chưa gửi đi; hợp đồng dự kiến `POST /bookings`                              | Endpoint thật         |
| Tổng số bài                           | `GET /posts` có thể trả thêm `total` (tuỳ chọn) để hiện "1–6 / 18 bài viết"                       | Có trả được không     |
| Trạng thái bài                        | `GET /posts/:slug` có thể trả bài chưa đăng; frontend chỉ hiện `status: 'published'`, còn lại 404 | Giá trị `status` thật |
| Tìm kiếm                              | `q` khớp tiêu đề + tóm tắt, không phân biệt dấu (như mock)                                        | Cách backend tìm      |

| Nội dung trang landing từ API | Hợp đồng `GET /pages/:slug`, `GET /site` do frontend đề xuất (`docs/CONTENT_LAYER.md` mục 7) — **chưa gọi thật** | Backend xác nhận khi cần chuyển section sang API |

## Giao diện

- Thẻ dịch vụ ở trang chủ không bấm được (chưa có trang chi tiết dịch vụ).
- Bản đồ ở trang Đặt lịch là placeholder; link "Địa chỉ" mở Google Maps theo `mapUrl` mẫu.
- Ảnh bìa bài viết của mock là ảnh gạch chéo trung tính, chỉ để dev.
- Byline bài viết cố định "Bởi Đội kỹ thuật LAPBEE" (nội dung tĩnh) — hợp đồng API chưa có tác giả.
- Mock có 3 bài đặc biệt: `chuan-bi-gi-truoc-khi-mang-may-di-sua` (markdown), `mau-kiem-tra-sanitize-html` (HTML độc hại, noindex), `ban-nhap-chua-dang` (draft → 404).

## URL

- Slug bài viết **không được** là `trang`, `danh-muc`, `tim-kiem` (trùng với URL cố định dưới `/bai-dang/`).

## SEO

- JSON-LD dùng `Organization` theo brief. Nếu muốn hiện trên Google Maps/kết quả địa phương nên đổi sang `LocalBusiness` (thêm giờ mở cửa, toạ độ) — cần địa chỉ thật trước.
- Chưa kiểm bằng Google Rich Results Test (cần URL công khai); đã kiểm cấu trúc JSON-LD và thẻ meta bằng script trên bản standalone.
- Domain thật chưa có: thử với `SITE_URL=https://lapbee.example`. `.env.example` vẫn để giá trị mẫu.
- Sitemap đưa vào mọi bài từ `/posts/slugs`; bài `noindex` (nếu backend có) vẫn nằm trong sitemap vì `/posts/slugs` không trả `noindex` — cần backend lọc hoặc trả thêm trường.
