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

| Mục                                   | Giả định                                                                                        | Cần backend xác nhận |
| ------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------- |
| Danh mục, featured, tìm kiếm bài viết | Tên trường/tham số theo `docs/PLAN.md` mục 2.7 (`category`, `featured`, `q`, `GET /categories`) | Tên trường thật      |
| Đặt lịch                              | Form làm theo design, chưa gửi đi; hợp đồng dự kiến `POST /bookings`                            | Endpoint thật        |

| Nội dung trang landing từ API | Hợp đồng `GET /pages/:slug`, `GET /site` do frontend đề xuất (`docs/CONTENT_LAYER.md` mục 7) — **chưa gọi thật** | Backend xác nhận khi cần chuyển section sang API |

## URL

- Slug bài viết **không được** là `trang`, `danh-muc`, `tim-kiem` (trùng với URL cố định dưới `/bai-dang/`).
