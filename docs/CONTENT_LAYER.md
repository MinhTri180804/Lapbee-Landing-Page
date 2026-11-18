# Content layer

Nội dung các trang landing (Trang chủ, Đội ngũ, Hành trình, Bài đăng — phần tĩnh, Đặt lịch) và thông tin chung của site đi qua một lớp duy nhất. Hôm nay mọi thứ là **tĩnh** (nằm trong repo). Muốn chuyển một section sang lấy từ backend: **sửa một dòng cấu hình** (và backend trả đúng dữ liệu) — không phải sửa trang hay component.

> Blog (danh sách, chi tiết bài) **không** đi qua content layer: luôn lấy từ backend qua `lib/api/posts.ts` (GĐ6).

## 1. Sơ đồ

```
content/pages/<slug>.ts ─┐                         ┌─ 'static' → dùng nội dung tĩnh (không gọi mạng)
content/site.ts ─────────┤                         │
                         ├─► resolvePageContent ───┤
content/sources.config.ts┘    (content/resolve.ts) └─ 'api'    → GET /pages/:slug qua lib/api
                                     │                            (force-cache, tag page:<slug>, 3600s)
                                     ▼
                     zod validate (schema đầy đủ) ──► getPageContent(slug)  ◄── app/<route>/page.tsx
                                                                                 generateMetadata
```

## 2. Quy tắc (bắt buộc — ESLint kiểm tra)

1. **Component trình bày chỉ nhận dữ liệu qua props.** File trong `components/**` không được import giá trị từ `@/content`, `@/lib/api`, `@/lib/env` (chỉ `import type` để khai báo props).
2. **Trang chỉ lấy nội dung landing qua `getPageContent(slug)` / `getSiteSettings()`** từ `@/content`. Không import `content/pages/*`, `content/site`, `content/adapters/*`.
3. **Mỗi section có đúng một schema zod** (`content/schemas/sections/*.ts`) — là hợp đồng chung cho nguồn tĩnh và API. Kiểu TypeScript suy ra từ schema (`SectionData<'home','hero'>`).
4. **Nội dung tĩnh được validate trước mỗi build** (`prebuild` → `npm run test:content`). Sai cấu trúc → build dừng, báo đúng field.
5. Mọi request tới backend đi qua `lib/api/client.ts` (`import 'server-only'`).

## 3. Bản đồ file

| File                                    | Vai trò                                                                                 |
| --------------------------------------- | --------------------------------------------------------------------------------------- |
| `content/schemas/common.ts`             | Kiểu dùng chung: `Text`, `Href`, `Image`, `Photo`, `Cta`, `IconName`                    |
| `content/schemas/seo.ts`                | `Seo` — dùng chung cho trang landing và bài viết                                        |
| `content/schemas/site.ts`               | `SiteSettings` — header, footer, menu, liên hệ, giờ mở cửa                              |
| `content/schemas/sections/*.ts`         | Một schema mỗi section                                                                  |
| `content/schemas/pages.ts`              | Ghép section thành schema trang (`full` cho nội dung đầy đủ, `remote` cho response API) |
| `content/pages/<slug>.ts`               | Nội dung tĩnh (`satisfies PageInput<'<slug>'>`)                                         |
| `content/site.ts`                       | Thông tin chung tĩnh                                                                    |
| `content/sources.config.ts`             | **Nơi duy nhất chọn nguồn** static/api                                                  |
| `content/adapters/static.ts` · `api.ts` | Adapter `PageSource` / `SiteSource`                                                     |
| `content/resolve.ts`                    | Lõi: đọc nguồn, validate, ghép theo section                                             |
| `content/index.ts`                      | API công khai: `getPageContent`, `getSiteSettings`, kiểu dữ liệu                        |
| `lib/api/client.ts`                     | `apiGet()` — base URL, token, timeout 8s, cache, tags, lỗi, zod                         |
| `lib/api/pages.ts`                      | `GET /pages/:slug`, `GET /site`                                                         |
| `lib/api/tags.ts`                       | Tên tag revalidate (nguồn duy nhất)                                                     |
| `mocks/server.mjs` · `mocks/data/`      | Mock backend để dev/test                                                                |

## 4. Trang và section

| Slug (content layer) | URL công khai | Section (key → schema)                                                                                                                                                             |
| -------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `home`               | `/`           | `hero` → HeroSection · `stats` → StatsSection · `services` → ServicesSection · `process` → ProcessSection · `business` → BusinessBandSection · `latestPosts` → LatestPostsSection* |
| `team`               | `/doi-ngu`    | `hero` → PageHeroSection · `members` → TeamGridSection · `principles` → PrinciplesSection                                                                                          |
| `journey`            | `/hanh-trinh` | `hero` → PageHeroSection · `timeline` → TimelineSection · `ctaBanner` → CtaBannerSection                                                                                           |
| `posts`              | `/bai-dang`   | `hero` → PageHeroSection · `listing` → PostsListingSection*                                                                                                                        |
| `booking`            | `/dat-lich`   | `hero` → PageHeroSection · `form` → BookingFormSection · `contact` → BookingContactSection                                                                                         |

\* Chỉ là cấu hình/nhãn; danh sách bài lấy từ blog API.

Mỗi trang còn có `seo` (schema `Seo`). Thông tin chung (`SiteSettings`) có nguồn riêng `sources.site`.

Quy ước dữ liệu: tiêu đề xuống dòng bằng `\n`; ảnh chưa có → `image: null` (hiển thị placeholder gạch chéo kèm `label`); link nội bộ dùng **URL công khai tiếng Việt** (`/dat-lich`, không phải `/booking`) — test kiểm tra điều này.

## 5. Cấu hình nguồn

```ts
// content/sources.config.ts
export const sources: SourcesConfig = {
  site: 'static',
  pages: {
    home: { default: 'static' },
    // ví dụ: home: { default: 'static', sections: { hero: 'api' }, seo: 'api' },
    team: { default: 'static' },
    journey: { default: 'static' },
    posts: { default: 'static' },
    booking: { default: 'static' },
  },
};
```

- `default`: nguồn cho `seo` và mọi section không khai báo riêng.
- `seo`: nguồn riêng cho metadata.
- `sections`: nguồn theo section; key sai → lỗi typecheck.
- Toàn `static` → content layer **không gọi `fetch`** → trang là **SSG thuần**.
- Có ít nhất một phần `api` → một request `GET /pages/:slug` (cache tag `pages`, `page:<slug>`, revalidate 3600s) → trang tự thành **ISR**, không sửa trang.

## 6. Hành vi khi lỗi

| Tình huống                                                         | Kết quả                                                                                   |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| Backend trả status ≠ 2xx, timeout 8s, mất kết nối, không phải JSON | `throw` (`ApiHttpError`, `ApiTimeoutError`, `ApiNetworkError`, `ApiInvalidResponseError`) |
| Response sai schema (section có mặt nhưng thiếu/sai field)         | `throw` kèm đường dẫn field — **không render nửa vời**                                    |
| Section cấu hình `api` nhưng response không có section đó          | `throw ContentSourceError`                                                                |
| `GET /pages/:slug` trả 404                                         | `throw` (với trang landing, 404 nghĩa là cấu hình sai, không phải "trang không tồn tại")  |

Vì lỗi được throw: lúc **build** → build dừng (không deploy bản rỗng); lúc **revalidate nền** → Next giữ bản cache tốt gần nhất. Log mỗi lỗi một dòng `[api] …`, không có token.

Ghi chú kỹ thuật (Next 16, đã kiểm trong `node_modules/next`): cache `fetch` là opt-in nên client đặt `cache: 'force-cache'` + `next: { revalidate, tags }`; Next bỏ `signal` khi revalidate nền nên timeout có thêm bộ hẹn giờ riêng; truyền `signal` tắt memoization của fetch nên các hàm API bọc React `cache()`.

## 7. Hợp đồng API cho trang (dự kiến — chưa gọi thật)

### `GET /pages/:slug`

`slug` ∈ `home`, `team`, `journey`, `posts`, `booking`. Header `Authorization: Bearer <API_TOKEN>` nếu backend yêu cầu.

```jsonc
// 200 OK — chỉ cần trả những section backend quản lý
{
  "slug": "home", // tuỳ chọn
  "updatedAt": "2026-11-18T08:00:00.000Z", // tuỳ chọn
  "seo": { "title": "…", "description": "…", "ogImage": "https://…", "noindex": false }, // tuỳ chọn
  "sections": {
    "hero": {
      "title": "Máy hỏng,\nđã có LAPBEE.",
      "highlight": "LAPBEE",
      "lead": "…",
      "ctas": [{ "label": "Đặt lịch sửa chữa", "href": "/dat-lich", "iconRight": "arrow-right" }],
      "photo": {
        "image": { "src": "https://cdn.…/hero.webp", "width": 1200, "height": 1500, "alt": "…" },
        "label": "ẢNH XƯỞNG",
      },
      "chip": { "value": "14+", "text": "năm kinh nghiệm\ntừ LAPPY 2012" },
    },
  },
}
```

- Mỗi section trong `sections` phải **đầy đủ** theo schema tương ứng (`content/schemas/sections/*.ts`) — có thể bỏ hẳn section, không được trả một nửa.
- Field thừa bị bỏ qua.
- `404` nếu backend không quản lý trang này.
- Icon: chỉ tên có trong `components/ui/icons.ts`. Link nội bộ: URL công khai (`/dat-lich`, `/bai-dang`…).
- Ảnh từ backend: domain phải nằm trong `IMAGE_HOSTS` hoặc là host của `API_BASE_URL` (cấu hình lúc build).

### `GET /site`

Trả `SiteSettings` đầy đủ (xem `content/schemas/site.ts`). Dùng khi `sources.site = 'api'`. Tag `site`.

## 8. Hướng dẫn: chuyển một section từ static sang API

Ví dụ: **hero của trang chủ** (`home.hero`).

**Bước 1 — Backend.** Thêm endpoint `GET /pages/home` trả `sections.hero` đúng `HeroSection` (ví dụ ở mục 7). Có thể sao chép giá trị hiện tại từ `content/pages/home.ts` làm dữ liệu khởi tạo.

**Bước 2 — Thử với mock trước.** Dữ liệu mẫu đã có ở `mocks/data/pages/home.json`.

```bash
npm run mock                       # mock backend ở http://localhost:4010
```

```bash
# .env.local
SITE_URL=http://localhost:3000
USE_MOCK_API=true                  # API_BASE_URL bỏ trống → http://localhost:4010
```

**Bước 3 — Sửa một dòng cấu hình** trong `content/sources.config.ts`:

```diff
-    home: { default: 'static' },
+    home: { default: 'static', sections: { hero: 'api' } },
```

**Bước 4 — Webhook.** Khi admin sửa hero, backend gọi:

```bash
curl -X POST https://<domain>/api/revalidate \
  -H "x-revalidate-secret: $REVALIDATE_SECRET" -H "Content-Type: application/json" \
  -d '{"tags":["page:home"]}'
```

(Endpoint làm ở GĐ8 — chi tiết trong `docs/WEBHOOK.md`.) Không có webhook thì nội dung vẫn tự làm mới sau tối đa 3600 giây.

**Bước 5 — Kiểm tra.**

1. `npm test` — test `tests/api/mock-server.test.ts` chạy đúng kịch bản này với mock thật.
2. `npm run build` (mock đang chạy) → trong bảng route, `/` có cột revalidate `1h` thay vì chỉ `○ (Static)`; các trang khác vẫn tĩnh. _(Kiểm chứng được từ GĐ5, khi các trang đã dùng content layer; thử toàn bộ quy trình ở GĐ10.)_
3. `npm run start` → mở `/`, hero hiển thị đoạn dẫn có chữ `[MOCK API]`.
4. Sửa `lead` trong `mocks/data/pages/home.json`, gọi webhook ở bước 4 → tải lại trang thấy nội dung mới (không build lại).
5. Giả lập backend lỗi: `curl -X POST localhost:4010/__mock/fail -d '{"mode":"500"}'` (hoặc `timeout`, `bad-schema`, `down`), gọi webhook, tải lại → trang **vẫn hiển thị bản cũ**. Trả lại bình thường: `-d '{"mode":null}'`.

**Bước 6 — Production.** Đặt `API_BASE_URL` (và `API_TOKEN` nếu cần) trên hosting, build và deploy như thường. Lưu ý build sẽ gọi `GET /pages/home`; backend lỗi lúc build → build dừng (không deploy bản rỗng).

**Quay lại static:** đổi lại dòng cấu hình. Nội dung tĩnh trong `content/pages/home.ts` luôn phải hợp lệ (được validate mỗi lần build), kể cả khi section đang lấy từ API.

## 9. Thêm section hoặc trang mới

1. Tạo schema trong `content/schemas/sections/<ten>.ts`.
2. Thêm key vào trang tương ứng trong `content/schemas/pages.ts` (hoặc thêm trang mới vào `PageSchemas` + `sources.pages` + `content/adapters/static.ts` + `lib/routes.ts`).
3. Viết nội dung trong `content/pages/<slug>.ts` — typecheck báo thiếu/sai field.
4. Viết component trong `components/sections/` nhận `SectionData<'<slug>', '<key>'>` qua props.
5. `npm test`.

## 10. Lệnh hữu ích

| Lệnh                   | Việc                                                               |
| ---------------------- | ------------------------------------------------------------------ |
| `npm run test:content` | Validate nội dung tĩnh (chạy tự động trước build)                  |
| `npm test`             | Toàn bộ test: content layer, lib/api, mock server                  |
| `npm run mock`         | Mock backend cổng 4010 (`MOCK_PORT`, `MOCK_FAIL`, `MOCK_DELAY_MS`) |
