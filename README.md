# LAPBEE — Website (Landing + Blog)

Next.js 16 (App Router, TypeScript strict), output `standalone`, deploy trên shared hosting Vietnix (cPanel + Passenger).

> Đang phát triển theo giai đoạn — xem tiến độ ở [docs/PLAN.md](docs/PLAN.md).

## Yêu cầu

- Node 24 (xem `.nvmrc`)
- npm

## Bắt đầu

```bash
npm install
cp .env.example .env.local   # rồi điền giá trị (dev với mock: USE_MOCK_API=true)
npm run dev:mock             # dev server + mock backend (cổng 4010)
```

## Scripts

| Lệnh                              | Việc                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| `npm run dev`                     | Chạy dev server (xem component tại `/_styleguide`)           |
| `npm run build`                   | Build production (tạo `.next/standalone`)                    |
| `npm run start`                   | Chạy bản build bằng `next start`                             |
| `npm run lint`                    | ESLint                                                       |
| `npm run typecheck`               | Sinh kiểu route + `tsc --noEmit`                             |
| `npm run format` / `format:check` | Prettier                                                     |
| `npm test`                        | Toàn bộ test (vitest)                                        |
| `npm run test:content`            | Validate nội dung tĩnh (tự chạy trước build)                 |
| `npm run mock`                    | Mock backend ở cổng 4010                                     |
| `npm run dev:mock`                | Dev server kèm mock backend                                  |
| `npm run build:mock`              | Build production kèm mock backend (khi chưa có backend thật) |
| `npm run icons`                   | Sinh favicon/icon/apple-icon từ `public/brand/logo-mark.png` |
| `npm run og-image`                | Chụp ảnh OG mặc định từ `/_styleguide/og` (cần dev server)   |

## Preview trên Vercel (chưa có backend)

Dùng để khách xem trước giao diện với **dữ liệu mẫu**. Không phải môi trường production (production deploy lên Vietnix — GĐ4/GĐ9).

1. Import repo vào Vercel (Framework: Next.js, Build Command mặc định `npm run build`).
2. Settings → General → Node.js Version: **24.x**.
3. Settings → Environment Variables:

   | Biến              | Giá trị | Ghi chú                                                                |
   | ----------------- | ------- | ---------------------------------------------------------------------- |
   | `MOCK_API_INLINE` | `true`  | Dữ liệu mẫu đóng gói trong bản build (`mocks/data`), không gọi backend |
   | `SITE_URL`        | (trống) | Tự lấy domain của project trên Vercel; điền nếu dùng domain riêng      |

4. Deploy. Bản preview tự **chặn index** (`robots.txt: Disallow: /`, `noindex` mọi trang).

Lưu ý: dữ liệu mẫu cố định theo commit (sửa `mocks/data/*.json` rồi push để đổi); form đặt lịch chưa gửi đi (chưa có API).

## Cấu trúc

| Thư mục                | Vai trò                                                                                                                                        |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/`                 | Route (tên thư mục tiếng Anh; URL công khai tiếng Việt qua `lib/routes.ts`)                                                                    |
| `lib/`                 | `routes.ts` (map URL), `env.ts` (biến môi trường), `api/` (gọi backend, server-only), `html/` (sanitize, markdown), `seo/` (metadata, JSON-LD) |
| `content/`             | Content layer: schema, nội dung tĩnh, cấu hình nguồn — xem docs/CONTENT_LAYER.md                                                               |
| `mocks/`               | Mock backend cho dev/test (endpoint: đầu `mocks/server.mjs`)                                                                                   |
| `tests/`               | Test vitest                                                                                                                                    |
| `components/ui/`       | Component nền port từ design system (Button, Card, Icon, form…)                                                                                |
| `components/layout/`   | Header, MobileMenu, Footer, PageHero, SectionHead, OpenStatus, ScrollEffects                                                                   |
| `components/sections/` | Section của trang landing (chỉ nhận props)                                                                                                     |
| `components/blog/`     | PostCard, PostList, PostsToolbar, PostArticle, CopyLinkButton                                                                                  |
| `app/styles/`          | Tokens (CSS variables), base, utilities                                                                                                        |
| `public/brand/`        | Logo                                                                                                                                           |
| `design-system/`       | Design system gốc LAPBEE — chỉ tham chiếu                                                                                                      |
| `docs/`                | Plan, quyết định, giả định, hướng dẫn                                                                                                          |

## Tài liệu

- [docs/PLAN.md](docs/PLAN.md) — kế hoạch & tiến độ
- [docs/DECISIONS.md](docs/DECISIONS.md) — quyết định kỹ thuật, lý do chọn thư viện
- [docs/ASSUMPTIONS.md](docs/ASSUMPTIONS.md) — giả định, dữ liệu mẫu
- [docs/CONTENT_LAYER.md](docs/CONTENT_LAYER.md) — content layer, cách chuyển section sang API
