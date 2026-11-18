# LAPBEE — Website (Landing + Blog)

Next.js 16 (App Router, TypeScript strict), output `standalone`, deploy trên shared hosting Vietnix (cPanel + Passenger).

> Đang phát triển theo giai đoạn — xem tiến độ ở [docs/PLAN.md](docs/PLAN.md).

## Yêu cầu

- Node 24 (xem `.nvmrc`)
- npm

## Bắt đầu

```bash
npm install
cp .env.example .env.local   # rồi điền giá trị
npm run dev
```

## Scripts

| Lệnh                              | Việc                                               |
| --------------------------------- | -------------------------------------------------- |
| `npm run dev`                     | Chạy dev server (xem component tại `/_styleguide`) |
| `npm run build`                   | Build production (tạo `.next/standalone`)          |
| `npm run start`                   | Chạy bản build bằng `next start`                   |
| `npm run lint`                    | ESLint                                             |
| `npm run typecheck`               | Sinh kiểu route + `tsc --noEmit`                   |
| `npm run format` / `format:check` | Prettier                                           |
| `npm test`                        | Toàn bộ test (vitest)                              |
| `npm run test:content`            | Validate nội dung tĩnh (tự chạy trước build)       |
| `npm run mock`                    | Mock backend ở cổng 4010                           |

## Cấu trúc

| Thư mục              | Vai trò                                                                              |
| -------------------- | ------------------------------------------------------------------------------------ |
| `app/`               | Route (tên thư mục tiếng Anh; URL công khai tiếng Việt qua `lib/routes.ts`)          |
| `lib/`               | `routes.ts` (map URL), `env.ts` (biến môi trường), `api/` (gọi backend, server-only) |
| `content/`           | Content layer: schema, nội dung tĩnh, cấu hình nguồn — xem docs/CONTENT_LAYER.md     |
| `mocks/`             | Mock backend cho dev/test                                                            |
| `tests/`             | Test vitest                                                                          |
| `components/ui/`     | Component nền port từ design system (Button, Card, Icon, form…)                      |
| `components/layout/` | Header, MobileMenu, Footer, PageHero, SectionHead                                    |
| `app/styles/`        | Tokens (CSS variables), base, utilities                                              |
| `public/brand/`      | Logo                                                                                 |
| `design-system/`     | Design system gốc LAPBEE — chỉ tham chiếu                                            |
| `docs/`              | Plan, quyết định, giả định, hướng dẫn                                                |

## Tài liệu

- [docs/PLAN.md](docs/PLAN.md) — kế hoạch & tiến độ
- [docs/DECISIONS.md](docs/DECISIONS.md) — quyết định kỹ thuật, lý do chọn thư viện
- [docs/ASSUMPTIONS.md](docs/ASSUMPTIONS.md) — giả định, dữ liệu mẫu
- [docs/CONTENT_LAYER.md](docs/CONTENT_LAYER.md) — content layer, cách chuyển section sang API
