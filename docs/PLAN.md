# PLAN — Website LAPBEE (Landing + Blog) · Next.js 16 · Vietnix shared hosting

> Trạng thái: **ĐÃ DUYỆT (18.11.2026)** · câu hỏi mở đã được trả lời (mục 6) · GĐ3 xong, chờ duyệt.

---

## 0. Bối cảnh & những gì đã đọc

- Repo hiện tại (`/Users/minhtri/Downloads/LAPBEE Design System`, branch `main`, 1 commit) **chính là design system**, không có thư mục `design-system/` riêng. Nội dung:
  - `styles.css` → `tokens/{fonts,colors,typography,spacing,effects,base}.css`: **CSS variables thuần** (không Tailwind) ⇒ chọn **CSS variables + CSS Modules** (mục 3 của brief).
  - `components/{core,forms,surfaces,navigation}`: React primitives (Button, IconButton, Icon, Wordmark, Badge, Tag, Input, Select, Checkbox, Radio, Switch, Card, Dialog, Toast, Tooltip, Tabs, Pagination) — viết kiểu prototype (inline style, `window` namespace) ⇒ **port lại** sang TSX + CSS Modules, không import trực tiếp.
  - `ui_kits/website/*`: bản click-through của site: Home, Team (Đội ngũ), History (Hành trình), Posts (list + detail), Booking (Đặt lịch); `site.css` (27 KB, breakpoints 1024/820/560), `motion.js` (Lenis, scroll-reveal, header hide, progress bar, parallax), `data.js` (nội dung mẫu).
  - `guidelines/*.html`: specimen cards. `assets/logo-mark.png` (156×144). `uploads/*.svg` rỗng (không dùng được).
- Phiên bản: Node local `v23.6.1`; `next@latest` trên npm = **16.4.6**.

---

## 1. Kiến trúc tổng quan

### 1.1 Luồng dữ liệu

```
                         ┌────────────────────── build time (local / CI, Linux x64) ─────────────────────┐
content/pages/*.ts ──►  staticSource ─┐                                                                 │
content/site.ts                       │                                                                 │
                                      ├─► getPageContent(slug) ──► zod parse ──► app/<route>/page.tsx ──► HTML tĩnh (SSG)
content/sources.config.ts ────────────┤        (merge theo section)                                      │
                                      │                                                                 │
backend  GET /pages/:slug ──► apiSource ┘  (chỉ khi config = 'api'; fetch có tags page:<slug>, revalidate 3600)
backend  GET /posts, /posts/:slug, /posts/slugs ──► lib/api/posts.ts ──► zod ──► blog pages / sitemap (ISR)
                         └────────────────────────────────────────────────────────────────────────────────┘

runtime (Passenger, N instance, chung 1 thư mục .next trên ổ đĩa, cacheMaxMemorySize: 0)
  request ─► cache trên disk (HTML + fetch cache) ─► hết hạn 3600s ─► render lại nền (stale-while-revalidate)
                                                      └─ API lỗi/timeout/sai schema ─► throw ─► giữ bản cache cũ
backend admin đăng/sửa bài ─► POST /api/revalidate {tags:["posts","post:<slug>"]} (header x-revalidate-secret)
                           ─► revalidateTag / revalidatePath ─► request kế tiếp nhận bản mới
```

### 1.2 Cây thư mục dự kiến

> **Quy ước đặt tên:** mọi tên file, thư mục, route segment, key cấu hình, slug trang trong content layer (`home`, `team`, `journey`, `posts`, `booking`), tag revalidate và tên biến/hàm đều **bằng tiếng Anh**. Tiếng Việt chỉ xuất hiện trong nội dung hiển thị (text, metadata) và slug bài viết do backend cấp (tiếng Việt không dấu). **URL công khai là tiếng Việt không dấu** (Q12): `next.config.ts` dùng `rewrites` (URL tiếng Việt → route tiếng Anh) và `redirects` 301 (route tiếng Anh → URL tiếng Việt, tránh trùng nội dung). Mọi link trong code lấy từ `lib/routes.ts`, không viết cứng URL.

```
/
├─ app/
│  ├─ layout.tsx                 # <html lang="vi">, next/font, script đặt theme trước paint, Header/Footer, metadata mặc định
│  ├─ globals.css                # import tokens + base + utilities dùng chung (.lb-container, .lb-label…)
│  ├─ page.tsx                   # Trang chủ  /
│  ├─ team/page.tsx              # URL /doi-ngu      (Đội ngũ)
│  ├─ journey/page.tsx           # URL /hanh-trinh   (Hành trình)
│  ├─ booking/
│  │  ├─ page.tsx                # URL /dat-lich     (Đặt lịch — form theo design)
│  │  └─ actions.ts              # server action submitBooking (stub, chờ API backend — Q4)
│  ├─ posts/
│  │  ├─ page.tsx                # URL /bai-dang                 (trang 1)
│  │  ├─ page/[page]/page.tsx    # URL /bai-dang/trang/2…       (SSG/ISR, không dùng searchParams để giữ static)
│  │  ├─ category/[category]/page.tsx            # URL /bai-dang/danh-muc/<slug>
│  │  ├─ category/[category]/page/[page]/page.tsx # URL /bai-dang/danh-muc/<slug>/trang/2…
│  │  ├─ search/page.tsx         # URL /bai-dang/tim-kiem?q=…   (dynamic, form GET, chạy được khi tắt JS)
│  │  └─ [slug]/page.tsx         # URL /bai-dang/<slug>         (generateStaticParams ≤ 50, dynamicParams = true)
│  ├─ %5Fstyleguide/page.tsx     # URL /_styleguide (thư mục "_x" là private folder trong App Router nên phải encode %5F); notFound() ở production; robots noindex
│  ├─ api/revalidate/route.ts    # POST, secret timing-safe, zod body
│  ├─ api/health/route.ts        # GET { ok, version }
│  ├─ sitemap.ts · robots.ts
│  ├─ not-found.tsx · error.tsx · global-error.tsx
│  └─ icon.png / apple-icon.png  # từ logo mark
├─ components/
│  ├─ ui/                        # primitives port từ DS: Button, IconButton, Icon, Wordmark, Badge, Tag, Card, Pagination, Input, Select, Checkbox, Radio (+ *.module.css)
│  ├─ layout/                    # Header, MobileMenu*, ThemeToggle*, Footer, PageHero, SectionHead, ReadingProgress*, Reveal* (* = client)
│  ├─ sections/                  # 1 component trình bày / 1 schema section — chỉ nhận props
│  └─ blog/                      # PostCard, PostGrid, PostMeta, PostBody (HTML đã sanitize), CopyLinkButton*
├─ content/
│  ├─ schemas/                   # zod: sections/*.ts, pages.ts (schema theo trang), site.ts, seo.ts, common.ts (image, cta, icon)
│  ├─ pages/                     # home.ts, team.ts, journey.ts, posts.ts, booking.ts — export object đúng schema
│  ├─ site.ts                    # thông tin chung: phone, địa chỉ, giờ mở cửa, nav, footer
│  ├─ sources.config.ts          # NƠI DUY NHẤT chọn nguồn static/api theo trang & section
│  ├─ adapters/static.ts         # staticSource
│  ├─ adapters/api.ts            # apiSource (dùng lib/api/pages.ts)
│  └─ index.ts                   # getPageContent(slug), getSiteSettings()
├─ lib/
│  ├─ api/                       # 'server-only'. client.ts (fetchJson: base URL, token, timeout 8s, tags, revalidate 3600, zod, lỗi), posts.ts, pages.ts, schemas.ts, errors.ts
│  ├─ html/                      # sanitize.ts (sanitize-html), markdown.ts (marked → sanitize)
│  ├─ seo/                       # metadata.ts (build Metadata từ Seo), jsonld.ts (Organization, WebSite, Article, BreadcrumbList)
│  ├─ routes.ts                  # bảng map route tiếng Anh ↔ URL tiếng Việt + helper href (dùng cho Link, sitemap, canonical, rewrites/redirects)
│  ├─ env.ts                     # đọc + validate env bằng zod (server-only)
│  └─ format.ts                  # dd.mm.yyyy, reading time…
├─ mocks/
│  ├─ server.mjs                 # mock backend Node thuần (node:http, 0 dependency), cổng 4010
│  └─ data/                      # posts.json (16 bài mẫu từ data.js + nội dung HTML/markdown), pages/home.json…
├─ public/images/                # ảnh giao diện đã nén WebP/AVIF
├─ public/brand/                 # logo (PNG 436×436 tách từ lapbe-logo.svg — xem Q11), favicon nguồn
├─ design-system/                # TOÀN BỘ design system hiện tại được git mv vào đây (chỉ tham chiếu, loại khỏi lint/tsconfig) — Q1
├─ .github/workflows/deploy.yml  # build Linux x64 + rsync qua SSH + restart (GĐ9 — Q6 đã xác nhận có SSH)
├─ scripts/
│  ├─ package.sh                 # build → copy static/public → release.zip
│  ├─ revalidate-test.sh         # curl test webhook
│  └─ start-standalone-local.sh  # chạy thử bản standalone ở local (giả lập Passenger: 2 instance chung thư mục)
├─ docs/  PLAN · CONTENT_LAYER · DEPLOY · WEBHOOK · DECISIONS · ASSUMPTIONS
├─ next.config.ts · tsconfig.json · eslint.config.mjs · .prettierrc · .prettierignore · .env.example · .nvmrc · package.json · README.md
```

---

## 2. Thiết kế content layer

### 2.1 Schema

- `content/schemas/common.ts`: `ImageSchema {src,width,height,alt}`, `CtaSchema {label, href, variant?, icon?}`, `IconNameSchema = z.enum([...registry])` (chỉ các icon có trong `components/ui/icons.ts`), `RichTextSchema` (chuỗi + đánh dấu từ tô vàng, xem dưới).
- `content/schemas/seo.ts`: `SeoSchema {title, description, ogImage?, canonical?, noindex?}` — **dùng chung cho trang landing và bài viết**.
- Mỗi section = 1 schema, ví dụ:

```ts
export const HeroSection = z.object({
  type: z.literal('hero'),
  eyebrow: z.string(),                       // "Đang nhận máy · 08:00 – 20:00"
  title: z.array(z.object({ text: z.string(), highlight: z.boolean().default(false) })), // "Máy hỏng, / đã có [LAPBEE]."
  lead: z.string(),
  ctas: z.array(CtaSchema).max(2),
  media: ImageSchema.nullable(),             // null → placeholder gạch chéo theo DS
  chip: z.object({ value: z.string(), text: z.string() }).optional(), // "14+ năm kinh nghiệm"
});
export type HeroSection = z.infer<typeof HeroSection>;
```

- Schema theo trang ghép các section **theo key** (để cấu hình nguồn theo section được):

```ts
export const HomePage = z.object({
  seo: SeoSchema,
  sections: z.object({ hero: HeroSection, stats: StatsSection, services: ServicesSection,
                       process: ProcessSection, business: BusinessBandSection, latestPosts: LatestPostsSection }),
});
export const PageSchemas = { home: HomePage, 'team': TeamPage, 'journey': JourneyPage,
                             'posts': PostsIndexPage, 'booking': BookingPage } as const;
export type PageSlug = keyof typeof PageSchemas;
export type PageContent<S extends PageSlug> = z.infer<(typeof PageSchemas)[S]>;
```

### 2.2 Danh sách schema section (suy ra từ `ui_kits/website`)

| Schema | Dùng ở | Nội dung chính | Ghi chú |
|---|---|---|---|
| `HeroSection` | Trang chủ | eyebrow, title (có từ highlight), lead, 2 CTA, ảnh, chip "14+" | trạng thái mở cửa là client island `OpenStatus` — **Q7** |
| `StatsSection` | Trang chủ | 2–6 `{value, label}` | lưới kẻ hairline, không card |
| `ServicesSection` | Trang chủ | heading, intro, CTA phụ, items `{icon, title, desc, time}` | 6 dịch vụ |
| `ProcessSection` | Trang chủ | label, title, intro, CTA, steps `{icon, title, body, meta}` | phần sticky/progress là client island |
| `BusinessBandSection` | Trang chủ | label, title, lead, CTA, bullet list | band nền tối |
| `LatestPostsSection` | Trang chủ | heading, CTA "Tất cả bài đăng", `count` | **chỉ cấu hình**; dữ liệu bài lấy từ blog API ⇒ trang chủ là ISR tag `posts` — **Q3** |
| `PageHeroSection` | Đội ngũ, Hành trình, Bài đăng, Đặt lịch | eyebrow, title, lead? | chứa h1 của trang |
| `TeamGridSection` | Đội ngũ | members `{name, role, since, photo}` | |
| `PrinciplesSection` | Đội ngũ | label, title, intro, items `{icon, title, body, proof}` | band tối |
| `TimelineSection` | Hành trình | chapters `{year, title, body, photos[], quote?}` | layout ảnh 0/1/2/3/≥4 (gallery) |
| `CtaBannerSection` | Hành trình, (cuối bài viết) | title, CTA | Card brand — 1/trang |
| `BookingSection` | Đặt lịch | nhãn/placeholder/options của form, danh sách liên hệ, bản đồ | form theo design; gửi qua server action stub — **Q4** |
| `SiteSettings` (không phải section) | layout | phone, address, hours, mapUrl, nav, footer text, social | nguồn cũng cấu hình được (`site`) |

### 2.3 Cấu hình nguồn — `content/sources.config.ts`

```ts
type Source = 'static' | 'api';
type PageSourceConfig<S extends PageSlug> = {
  default: Source;                                                  // áp cho seo + section không khai báo
  seo?: Source;
  sections?: Partial<Record<keyof PageContent<S>['sections'], Source>>;
};
export const sources = {
  site: 'static',
  pages: {
    home:         { default: 'static' /* , sections: { hero: 'api' } */ },
    'team':    { default: 'static' },
    'journey': { default: 'static' },
    'posts':   { default: 'static' },
    'booking':   { default: 'static' },
  },
} satisfies SourcesConfig;   // type-check: key section sai → lỗi compile
```

### 2.4 Adapter & `getPageContent`

```ts
interface PageSource {
  /** static: trả về đủ trang; api: có thể chỉ trả một phần sections. Dữ liệu CHƯA tin cậy, caller validate. */
  getPage(slug: PageSlug): Promise<unknown>;
}
// content/index.ts
export async function getPageContent<S extends PageSlug>(slug: S): Promise<PageContent<S>> {
  const cfg = sources.pages[slug];
  const local = PageSchemas[slug].parse(await staticSource.getPage(slug));   // parse ở build → sai cấu trúc là build fail
  if (!usesApi(cfg)) return local;                                           // không có fetch nào ⇒ route SSG thuần
  const remote = PageSchemas[slug].deepPartial-tương-đương.parse(await apiSource.getPage(slug)); // throw nếu lỗi
  const merged = pickBySource(cfg, local, remote);                           // section 'api' mà thiếu trong remote ⇒ throw
  return PageSchemas[slug].parse(merged);
}
```

- `apiSource.getPage(slug)` → `lib/api/pages.ts` → `fetchJson('/pages/'+slug, { tags: ['pages', 'page:'+slug], revalidate: 3600, schema })`. Vì chỉ khi đó mới có `fetch`, route **tự** trở thành ISR, trang không phải sửa.
- `generateMetadata` của mỗi landing page cũng gọi `getPageContent(slug)` → lấy `seo` (React `cache()` dedupe trong 1 request, không phải state toàn cục).
- Kiểm chứng "SSG thuần": bảng route của `next build` phải hiện `○ (Static)` cho landing khi toàn static; khi bật 1 section `api` phải hiện revalidate `1h`.

### 2.5 Ví dụ chuyển `home.hero` sang API

1. Backend: `GET /pages/home` trả `{ "sections": { "hero": { …đúng HeroSection… } } }` (có thể kèm `seo`).
2. Sửa **một dòng**: `home: { default: 'static', sections: { hero: 'api' } }`.
3. Backend khi sửa hero gọi webhook `{ "tags": ["page:home"] }`.
4. Kiểm tra: `next build` → `/` hiển thị revalidate 1h; chạy mock, đổi `mocks/data/pages/home.json`, gọi webhook, F5 thấy nội dung mới; tắt mock → trang vẫn hiển thị bản cache.
(Chi tiết đầy đủ ghi trong `docs/CONTENT_LAYER.md`.)

### 2.6 Hợp đồng API trang (chỉ tài liệu, chưa gọi thật)

`GET /pages/:slug` → `200 { slug, updatedAt, seo?: Seo, sections: { [key]: <SectionSchema> } }` (partial cho phép); `404` nếu trang không quản lý ở backend. Bearer `API_TOKEN` nếu có.

### 2.7 Hợp đồng API blog mở rộng (Q5 — backend có trả; tên trường/tham số dưới đây là đề xuất, cần backend xác nhận)

- `GET /posts?page=&limit=&category=&q=` → `{ items: PostSummary[], page, totalPages }`; `category` = slug danh mục, `q` = từ khoá tìm kiếm.
- `PostSummary` thêm: `category: { slug, name }`, `featured: boolean`, `readingMinutes?: number` (thiếu thì frontend tự tính từ `content` ở trang chi tiết).
- `GET /categories` → `{ items: { slug, name, count }[] }` (tag `categories`).
- Booking (Q4, làm sau): `POST /bookings` body `{ customerType: 'personal'|'business', name, phone, device, description, needVatInvoice }` → `201 { code }` (vd. `LB-0428`).

---

## 3. Danh sách trang & section (từ design system)

| Trang | URL | Nguồn | Section | Render |
|---|---|---|---|---|
| Trang chủ | `/` | content layer + blog API (3 bài mới) | Hero, Stats, Services, Process, BusinessBand, LatestPosts | ISR tag `posts` (Q3); phần nội dung tĩnh vẫn đi qua content layer |
| Đội ngũ | `/doi-ngu` | content layer | PageHero, TeamGrid, Principles | SSG |
| Hành trình | `/hanh-trinh` | content layer | PageHero, TimelineRail (client), Timeline, CtaBanner | SSG |
| Bài đăng | `/bai-dang`, `/bai-dang/trang/[n]`, `/bai-dang/danh-muc/[slug]` | PageHero từ content layer + `GET /posts`, `GET /categories` | PageHero, Tag danh mục (link), form tìm kiếm (GET), PostGrid (bài `featured` ở trang 1), Pagination dạng link | ISR, tags `posts`, `categories` |
| Tìm kiếm | `/bai-dang/tim-kiem?q=` | `GET /posts?q=` | PageHero, kết quả, Pagination | dynamic (không cache trang), `robots: noindex` |
| Bài viết | `/bai-dang/[slug]` | `GET /posts/:slug` | breadcrumb/back, meta, h1, excerpt, ảnh cover, nội dung sanitize, CTA "Đặt lịch", nút copy link | ISR, tags `posts`,`post:<slug>` |
| Đặt lịch | `/dat-lich` | content layer | PageHero, BookingSection (form + liên hệ + bản đồ) | SSG; submit qua server action stub (Q4) |
| 404 / lỗi | — | tĩnh | theo DS | 404 status |
| Styleguide | `/_styleguide` | — | tokens, components | dev-only, noindex |

Header/Footer/MobileMenu dùng `SiteSettings`. Thẻ "Bài mới" trong MobileMenu của UI kit **bị bỏ** (nếu giữ, layout sẽ fetch API trên mọi trang).

**Còn là dữ liệu mẫu:** tên, SĐT, địa chỉ, đội ngũ, mốc lịch sử, ảnh (Q10) — ghi trong `docs/ASSUMPTIONS.md`. Tên tham số API danh mục/tìm kiếm là đề xuất của frontend (mục 2.7), cần backend xác nhận.

---

## 4. Quyết định kỹ thuật chính (sẽ ghi vào `docs/DECISIONS.md`)

| Chủ đề | Quyết định | Lý do |
|---|---|---|
| Styling | CSS variables (port nguyên `tokens/*.css`) + CSS Modules; `site.css` tách theo component | DS là CSS thuần |
| Font | `next/font/google` (Archivo có trục `wdth`, Be Vietnam Pro, JetBrains Mono, subset `vietnamese`) → tự host lúc build | không tải Google Fonts runtime |
| Icon | `lucide-react` (tree-shake, SVG render trên server) qua registry `components/ui/icons.ts` | DS đang tải SVG từ unpkg mỗi lần → chậm, phụ thuộc CDN |
| Smooth scroll Lenis | **Tạm bỏ** (Q8); giữ reveal/header-hide/progress bằng 1 client island nhỏ (IntersectionObserver), CSS `scroll-behavior` | giảm JS, Lighthouse |
| Reveal khi tắt JS | chỉ ẩn phần tử khi `<html class="js">` → không JS vẫn thấy đủ nội dung | yêu cầu kiểm tra no-JS |
| Dark mode | giữ: script inline nhỏ trong `<head>` đặt `data-theme` trước paint; toggle là client component | theo DS |
| Validate | `zod` (v4) | bắt buộc |
| Sanitize | `sanitize-html` (thuần JS, chạy server, không cần jsdom) | DOMPurify cần jsdom nặng trên server |
| Markdown | `marked` → rồi sanitize | nhẹ, 0 dependency |
| server-only | `server-only` | chặn import lib/api ở client |
| Mock API | `mocks/server.mjs` Node thuần, chạy riêng process | để fetch/ISR chạy thật như backend; 0 dependency |
| Test | `vitest` (devDep) — chỉ cho phần dễ hỏng ngầm: content layer (merge/nguồn), `lib/api/client` (timeout/lỗi/schema), sanitize, route revalidate (Q9) | các lỗi này không thấy được bằng mắt khi xem trang |
| Lint/format | `eslint` + `eslint-config-next` (flat config; Next 16 đã bỏ `next lint`) + `prettier` + `eslint-config-prettier` | |
| Typecheck | `next typegen && tsc --noEmit` (kiểm chứng script ở GĐ1) | |
| URL tiếng Việt | thư mục tiếng Anh + `rewrites` (vi → en) + `redirects` 301 (en → vi) sinh từ `lib/routes.ts` (Q12) | quy ước tên file tiếng Anh, URL thân thiện SEO tiếng Việt |
| Node | **Node 24** trên cPanel (cũng có 22); `.nvmrc` = 24, CI build bằng Node 24 (Q2) | Node 24 là bản LTS mới hơn, Next 16 hỗ trợ |
| Ảnh | `next/image`, `remotePatterns` từ host của `API_BASE_URL`/`IMAGE_HOSTS`; `IMAGE_UNOPTIMIZED=true` → `images.unoptimized` | sharp có thể không chạy trên CloudLinux |

API Next 16 cần kiểm chứng trong `node_modules/next` trước khi dùng (không viết theo trí nhớ): chữ ký `revalidateTag` (Next 16 thêm tham số profile thứ 2), `revalidatePath`, `fetch(..., { next: { tags, revalidate } })`, `export const revalidate/dynamicParams`, `cacheMaxMemorySize`, `images.unoptimized`, `output: 'standalone'`, cách sitemap gắn tag.

---

## 5. Các giai đoạn

Giữ thứ tự gợi ý của bạn, chỉ điều chỉnh nhỏ: GĐ4 (deploy thử) cần mock API chạy được từ hosting → mock server viết ở GĐ3 (vì `apiSource` cần nó) và tái sử dụng ở GĐ6.

### GĐ1 — Khởi tạo dự án & cấu hình
- **Mục tiêu:** khung Next 16 sạch, build được, chưa có giao diện.
- **Việc:** `git mv` design system vào `design-system/` (Q1); `create-next-app` thủ công (không dùng template có Tailwind); TS strict (+ `noUncheckedIndexedAccess`); ESLint flat + Prettier; `next.config.ts` (`output:'standalone'`, `cacheMaxMemorySize:0`, images, `logging.fetches` bật qua env); `lib/env.ts`; `.env.example`; `.nvmrc`; scripts `dev/build/start/lint/typecheck/format/mock`; tạo khung thư mục + `docs/DECISIONS.md`, `docs/ASSUMPTIONS.md`; `app/layout.tsx` + `app/page.tsx` placeholder; `.gitignore` (`.env*`, `release.zip`, `.next`); `lib/routes.ts` + `rewrites`/`redirects` trong `next.config.ts` (Q12).
- **File:** `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `.prettierrc`, `.env.example`, `.nvmrc`, `lib/env.ts`, `app/layout.tsx`, `app/page.tsx`, `docs/DECISIONS.md`, `docs/ASSUMPTIONS.md`, `README.md` (khung).
- **Hoàn thành khi:** `npm run lint`, `npm run typecheck`, `npm run build` đều sạch; `.next/standalone/server.js` tồn tại; `node .next/standalone/server.js` trả 200 ở `/`; `.nvmrc` = 24.
- **Rủi ro:** Next 16.x thay đổi config key → đọc `node_modules/next/dist/server/config-shared.d.ts`; lỗi peer deps eslint → ghim phiên bản.

### GĐ2 — Design system → code
- **Mục tiêu:** tokens + component nền dùng được ở server component.
- **Việc:** port `tokens/*.css` (trừ `fonts.css` → `next/font`) vào `app/styles/tokens/*`; base + utilities; font qua `next/font` gán `--font-display/body/mono`; registry icon; port primitives sang TSX + CSS Modules (Button/Link-button, IconButton, Icon, Wordmark với logo PNG 436×436 tách từ `lapbe-logo.svg` đặt ở `public/brand/`, Badge, Tag, Card, Pagination dạng link, Input/Select/Checkbox/Radio); layout: Header (server) + MobileMenu/ThemeToggle (client), Footer, PageHero, SectionHead, Placeholder; theme pre-paint script; trang `/_styleguide` (dev-only, noindex).
- **File:** `app/globals.css`, `app/styles/**`, `components/ui/**`, `components/layout/**`, `app/%5Fstyleguide/page.tsx`, `public/brand/*`.
- **Hoàn thành khi:** `/_styleguide` hiển thị đủ màu/typo/spacing/component ở light+dark, khớp `guidelines/*.html` ở 375/768/1280; production build → `/_styleguide` trả 404; chỉ các file `MobileMenu`, `ThemeToggle` (và component tương tác thật) có `'use client'`; lint/typecheck/build sạch.
- **Rủi ro:** font Archivo trục `wdth` qua `next/font` → nếu không hỗ trợ `axes:['wdth']` thì dùng `next/font/local` với file tải về (ghi DECISIONS); CSS khác biệt nhỏ khi bỏ inline style → so screenshot với UI kit.

### GĐ3 — Content layer
- **Mục tiêu:** toàn bộ cơ chế static/api sẵn sàng, chưa trang nào dùng API.
- **Việc:** `content/schemas/**` (tất cả section ở mục 2.2 + `SiteSettings`, `Seo`); `content/pages/*.ts` + `content/site.ts` (từ `data.js`, đánh dấu MẪU trong ASSUMPTIONS); `sources.config.ts`; `adapters/static.ts`, `adapters/api.ts`; `content/index.ts`; `lib/api/client.ts` (`import 'server-only'`, timeout 8s `AbortSignal.timeout`, tags + revalidate 3600, non-2xx → `ApiError`, 404 → `NotFoundError` để page gọi `notFound()`, zod fail → throw) + `lib/api/pages.ts`; `mocks/server.mjs` + `mocks/data/pages/*.json` (có cờ giả lập lỗi: `MOCK_FAIL=500|timeout|bad-schema`); unit test (nếu Q9 đồng ý); `docs/CONTENT_LAYER.md`.
- **Hoàn thành khi:** sửa sai 1 field trong `content/pages/home.ts` → `npm run build` fail với thông báo zod rõ path; script/test chứng minh `getPageContent('home')` khi config `api` gọi đúng URL + tags `page:home`, và throw khi mock trả 500/timeout/sai schema; chưa trang nào import `content/pages/*` trực tiếp (lint rule `no-restricted-imports` chặn `content/pages/**` và `lib/api/**` ngoài content layer/route).
- **Rủi ro:** typing generic theo slug phức tạp → giữ map `PageSchemas` cố định, không generic sâu; merge partial bằng zod 4 → kiểm chứng API `.partial()` lồng.

### GĐ4 — Deploy thử sớm lên Vietnix
- **Mục tiêu:** xác nhận hosting chạy được trước khi làm nhiều giao diện.
- **Việc:** 1 trang tĩnh + 1 trang có URL tiếng Việt (kiểm tra rewrite/redirect qua LiteSpeed/Passenger) + route thử `/isr-probe` fetch mock API (revalidate 60s, tag `probe`) hiển thị thời điểm render; bản đầu `scripts/package.sh`; build trên **Linux x64** (Docker `node:<ver>` hoặc GitHub Actions) để `sharp`/binary đúng nền tảng; mock server chạy làm app Node thứ 2 trên cPanel (subdomain); dùng SSH (Q6) để xem log Passenger, đo RAM (`ps`/`top`), kiểm tra glibc (`ldd --version`) và thư mục cache; `docs/DEPLOY.md` bản đầu; đo RAM mỗi instance (cPanel "Resource Usage"), kiểm tra `next/image` có tối ưu được không, kiểm tra 2 instance thấy cùng cache sau `revalidateTag`.
- **Hoàn thành khi:** trang tĩnh 200 qua domain; `/isr-probe` đổi timestamp sau revalidate; ảnh `/_next/image` trả 200 (hoặc đã quyết định `IMAGE_UNOPTIMIZED=true` và ghi lại); RAM/instance ghi vào DEPLOY.md; có quyết định `server.js` trực tiếp hay `app.js` wrapper (kèm lý do). Route thử bị xoá ở GĐ9.
- **Rủi ro:** Passenger không chạy được `server.js` (cwd/PORT) → `app.js` đặt `process.chdir(__dirname)` rồi `require('./server.js')`; glibc của CloudLinux cũ không chạy được sharp → `IMAGE_UNOPTIMIZED`; tag-invalidation không đồng bộ giữa instance (Next lưu trạng thái tag một phần trong bộ nhớ) → kiểm thử thực tế, nếu lỗi: giới hạn Passenger 1 instance (`PassengerMaxInstancesPerApp 1` qua `.htaccess` nếu được) hoặc webhook gọi thêm `revalidatePath` — báo lại để duyệt; **cần bạn thao tác hoặc cấp SSH**: tôi soạn hướng dẫn và lệnh; không nhập mật khẩu/khoá thay bạn.

### GĐ5 — Landing pages
- **Mục tiêu:** Trang chủ, Đội ngũ, Hành trình, (Đặt lịch) đúng design, nội dung tĩnh qua content layer.
- **Việc:** component `components/sections/*` (props-only); client island tối thiểu: Process (bước đang active + progress), Timeline rail + gallery cuộn, Reveal/ReadingProgress/HeaderAutoHide; `generateMetadata` qua content layer; ảnh mẫu → `public/images/*.webp` (placeholder hatch theo DS khi chưa có ảnh thật); LatestPosts (Q3): dùng `lib/api/posts.ts` tối thiểu (`getPosts({limit:3})`) + mock — phần còn lại của blog để GĐ6; `OpenStatus` client island (Q7: HTML tĩnh hiện "Giờ mở cửa · 08:00 – 20:00", client đổi thành "Đang nhận máy"/"Đã đóng cửa" theo giờ Asia/Ho_Chi_Minh); trang Đặt lịch: form theo design (native `<form>` + server action `submitBooking` validate bằng zod `BookingRequest`, **chưa gửi backend**, trả thông báo "chưa kết nối — vui lòng gọi hotline"; giữ Dialog xác nhận theo design để nối API sau).
- **Hoàn thành khi:** 3–4 trang khớp UI kit ở 375/768/1024/1280, light+dark; mỗi trang đúng 1 `h1`; tắt JS vẫn đọc đủ nội dung; build hiển thị `/doi-ngu`, `/hanh-trinh`, `/dat-lich` là `○ Static`, `/` là ISR (Q3); URL tiếng Anh redirect 301 sang tiếng Việt; không component section nào import `content/` hoặc `lib/api/`.
- **Rủi ro:** hiệu ứng scroll nặng trên mobile → tôn trọng `prefers-reduced-motion`, dùng `transform`; ảnh Unsplash trong data mẫu → không dùng ở production (bản quyền/hotlink), thay bằng placeholder.

### GĐ6 — Blog
- **Mục tiêu:** danh sách + chi tiết bài từ API (mock ở local).
- **Việc:** `lib/api/schemas.ts` (PostSummary, Post, Seo, slugs, list) theo hợp đồng mục 7 của brief (+ trường mở rộng theo Q5); `lib/api/posts.ts` (`getPosts({page, category?, q?})` tags `posts` — riêng `q` không cache; `getCategories()` tag `categories`; `getPost(slug)` tags `posts`,`post:<slug>`; `getPostSlugs()` tag `posts`); `/bai-dang`, `/bai-dang/trang/[page]` (`generateStaticParams` vài trang đầu, trang > totalPages → 404, `/bai-dang/trang/1` → redirect `/bai-dang`); `/bai-dang/danh-muc/[category]` (+ phân trang); `/bai-dang/tim-kiem` (form GET, server render, noindex, không gọi API từ client); `/bai-dang/[slug]` (`generateStaticParams` ≤ 50 từ `/posts/slugs`, `dynamicParams = true`, `revalidate = 3600`, `status !== 'published'` → 404); `lib/html/sanitize.ts` + `markdown.ts` (whitelist thẻ, `rel="noopener nofollow"` cho link ngoài, chỉ `https:` cho img, thêm `loading="lazy"`); styles `.lb-prose`; mock posts.json 16 bài + HTML có `<script>`/`onerror` để test sanitize.
- **Hoàn thành khi:** list phân trang, lọc danh mục, tìm kiếm (cả khi tắt JS) chạy; chi tiết render đúng; HTML độc hại bị loại (test); slug không tồn tại → status 404; mock 500/timeout/sai schema → build/request throw (không render trang rỗng); `curl` HTML thấy đủ nội dung.
- **Rủi ro:** build phụ thuộc API (generateStaticParams) → mock phải chạy khi build ở CI (`npm run build:mock` khởi động mock rồi build); nếu backend thật chết lúc build thì build fail — đó là hành vi mong muốn (không deploy bản rỗng); ghi DEPLOY.md.

### GĐ7 — SEO
- **Việc:** `lib/seo/metadata.ts` (title template, canonical từ `SITE_URL`, OG, Twitter, robots noindex); metadata mặc định ở layout; mọi trang `generateMetadata`; `app/sitemap.ts` (landing + `/posts/slugs` với `lastModified`, tag `posts`); `app/robots.ts` (chặn `/_styleguide`, `/api/`, `/bai-dang/tim-kiem`); canonical/sitemap luôn dùng URL tiếng Việt từ `lib/routes.ts`; JSON-LD `Organization`+`WebSite` (trang chủ), `Article`+`BreadcrumbList` (bài); `not-found.tsx`, `error.tsx`, `global-error.tsx` theo DS; favicon/OG image mặc định; rà heading.
- **Hoàn thành khi:** view-source mỗi trang có title/description/canonical/OG/Twitter/JSON-LD hợp lệ (kiểm bằng Rich Results Test hoặc validator schema.org); `/sitemap.xml`, `/robots.txt` đúng; URL lạ → HTTP 404 kèm trang 404 của DS.
- **Rủi ro:** `rewrites` + ISR: `revalidatePath` có thể cần đường dẫn route nội bộ (`/team`) thay vì URL công khai (`/doi-ngu`) → kiểm chứng, `lib/routes.ts` chuyển đổi tự động; `notFound()` trong ISR đôi khi trả 200 với dynamicParams — kiểm tra status thực tế bằng `curl -I` trên bản standalone.

### GĐ8 — Revalidate endpoint
- **Việc:** `app/api/revalidate/route.ts` (chỉ POST — các method khác 405; `crypto.timingSafeEqual` trên buffer cùng độ dài/hash; zod body `{tags?: string[≤50], paths?: string[≤50]}`, tối thiểu 1 phần tử, tag/path regex hợp lệ; gọi `revalidateTag`/`revalidatePath` đúng chữ ký Next 16; trả `{revalidated:true,tags,paths,now}`; log 1 dòng không chứa secret; `dynamic = 'force-dynamic'`); `scripts/revalidate-test.sh`; `docs/WEBHOOK.md` (bảng sự kiện → tag: tạo bài `posts`; sửa bài `posts`,`post:<slug>`; xoá/ẩn bài `posts`,`post:<slug>`; đổi slug: cả slug cũ và mới; danh mục `categories`; trang landing `page:<slug>`; site settings `site`; ghi chú: `paths` dùng URL tiếng Việt công khai, ưu tiên dùng tags).
- **Hoàn thành khi:** secret sai → 401; body sai → 400; đúng → 200; thêm bài trong mock + gọi webhook → bài xuất hiện ở list/chi tiết/sitemap mà không build lại (kiểm trên bản standalone).
- **Rủi ro:** chữ ký `revalidateTag` Next 16 (profile `'max'` = stale-while-revalidate, request đầu sau webhook có thể vẫn thấy bản cũ) → kiểm trong `node_modules/next`, chọn cách cho "hết hạn ngay" (`{ expire: 0 }` nếu có) và ghi vào WEBHOOK.md.

### GĐ9 — Hoàn thiện deploy
- **Việc:** `scripts/package.sh` hoàn chỉnh (kiểm tra env build, build Linux x64, copy `.next/static` + `public`, kèm `app.js` nếu cần, ghi `VERSION`, nén `release.zip`); `/api/health` (`{ok:true, version}` từ `VERSION`/git sha); `docs/DEPLOY.md` đầy đủ (Setup Node.js App, env, upload/giải nén vào `releases/<version>`, symlink hoặc đổi thư mục app, restart, rollback, giữ 2–3 bản); xoá route thử GĐ4; `.github/workflows/deploy.yml` (Q6 có SSH: build Node 24 trên ubuntu → rsync vào `releases/<version>` → đổi symlink → `touch tmp/restart.txt`; secrets SSH để trong GitHub Secrets, bạn tự nhập).
- **Hoàn thành khi:** deploy theo DEPLOY.md từ zip mới thành công; `/api/health` trả version mới; rollback về bản trước < 5 phút theo hướng dẫn.
- **Rủi ro:** cache ISR mất khi đổi release (thư mục `.next` mới) → chấp nhận (traffic thấp) hoặc trỏ `.next/cache` ra thư mục chung — quyết định ở GĐ4 dựa vào thực tế.

### GĐ10 — Kiểm tra tổng thể
- **Việc:** build production; chạy standalone local (2 instance chung thư mục); bật `logging.fetches` xác nhận HIT/MISS; Lighthouse mobile 4 mục ≥ 90 (trang chủ, list, bài viết); tắt JS kiểm tra HTML; tắt mock → trang blog đã cache vẫn hiển thị, trang chưa cache trả error page; **thử chuyển `home.hero` sang `api` chỉ bằng config** (Định nghĩa hoàn thành); rà toàn bộ docs + README.
- **Hoàn thành khi:** checklist mục 12 của brief đều tick, kèm bằng chứng (output lệnh, điểm Lighthouse) ghi vào PLAN.md.

---

## 6. Câu hỏi mở — ĐÃ TRẢ LỜI (18.11.2026)

| # | Câu hỏi | Trả lời | Ảnh hưởng tới plan |
|---|---|---|---|
| 1 | Vị trí design system | Chuyển toàn bộ vào `design-system/`, app Next.js ở thư mục gốc | GĐ1 `git mv` |
| 2 | Node trên cPanel | Có cả 22 và 24 | Chọn **Node 24** (`.nvmrc`, CI, cPanel) |
| 3 | "Bài đăng mới" trang chủ | Giữ, trang chủ chuyển sang ISR | `/` ISR tag `posts`; bỏ thẻ "Bài mới" trong menu mobile |
| 4 | Form đặt lịch | Gửi về server; tạm làm form như design, API thêm sau | Server action stub + zod `BookingRequest`; hợp đồng dự kiến `POST /bookings` (mục 2.7) |
| 5 | Trường bài viết mở rộng | Backend có trả | Danh mục, featured, tìm kiếm (mục 2.7) — cần backend xác nhận tên trường/tham số |
| 6 | SSH | Có SSH trong cPanel | GĐ4 dùng SSH kiểm tra; GĐ9 làm GitHub Actions deploy |
| 7 | "Đang nhận máy" | Client island nhỏ | `OpenStatus` (GĐ5) |
| 8 | Lenis | Tạm bỏ | — |
| 9 | Test tự động | Có, nếu cần thiết | `vitest` chỉ cho content layer, lib/api, sanitize, webhook |
| 10 | Nội dung/ảnh thật | Dùng tạm dữ liệu mẫu / placeholder | Ghi `docs/ASSUMPTIONS.md` |
| 11 | Logo | Đã gửi `lapbe-logo.svg` | File là **PNG 436×436 nhúng trong SVG**, không phải vector thật. Đủ cho favicon/OG/header; nếu cần in ấn hoặc phóng lớn vẫn cần bản vector thật |
| 12 | URL | Tiếng Việt không dấu (`/doi-ngu`…), thư mục giữ tiếng Anh | `lib/routes.ts` + `rewrites`/`redirects` |

**Bảng URL:** `/` · `/doi-ngu` · `/hanh-trinh` · `/dat-lich` · `/bai-dang` · `/bai-dang/trang/[n]` · `/bai-dang/danh-muc/[slug]` · `/bai-dang/tim-kiem?q=` · `/bai-dang/[slug]` · `/_styleguide` (dev).

**Còn chờ (không chặn GĐ1):** domain thật, API base URL thật (tạm `https://example.com`, `https://api.example.com` trong `.env.example`); backend xác nhận tên trường mục 2.7.

---

## 7. Bảng tiến độ

- [x] Plan được duyệt (18.11.2026)
- [x] GĐ1 — Khởi tạo dự án & cấu hình · xong & duyệt 18.11.2026
  - lint ✓ · typecheck ✓ · build ✓ (không cảnh báo) · `.next/standalone/server.js` chạy, `/` trả 200, `/team` → 308 `/doi-ngu`
  - Ghi chú: thư mục rỗng (`components/`, `content/`, `mocks/`, `scripts/`, `public/`) chưa tạo — sẽ xuất hiện ở giai đoạn có file đầu tiên; script `mock` thêm ở GĐ3 cùng `mocks/server.mjs`; redirect permanent của Next là 308 (tương đương 301 với Google)
- [x] GĐ2 — Design system → code, `/_styleguide` · xong & duyệt 18.11.2026
  - lint ✓ · typecheck ✓ · format ✓ · build ✓ (`/_styleguide` trả 404 ở production)
  - Đã xem `/_styleguide` ở 375/768/1280, sáng + tối: không tràn ngang, menu mobile mở/đóng (Esc, trả focus, khoá cuộn), đổi theme lưu được
  - Thêm `lucide-react`; chưa port Dialog/Toast/Tooltip/Switch/Tabs (port khi trang cần); preload 10 file font — đo lại ở GĐ10
- [x] GĐ3 — Content layer + mock + `docs/CONTENT_LAYER.md` · xong 18.11.2026, **chờ duyệt** ("OK giai đoạn 3")
  - lint ✓ · typecheck ✓ · format ✓ · test 31/31 ✓ · build ✓ (prebuild validate nội dung tĩnh)
  - Đã thử: sửa sai nội dung → build dừng, báo `sections.hero.ctas.0.href`, `sections.stats.items`; mock 500/timeout/bad-schema/down → throw đúng loại lỗi
  - Thêm `vitest`; đổi tên biến timeout thành `BACKEND_TIMEOUT_MS` (máy dev có sẵn `API_TIMEOUT_MS`); chạy lệnh bằng Node 24
  - Chưa trang nào dùng content layer (GĐ5) → kiểm chứng "SSG ↔ ISR theo cấu hình" trên bảng route ở GĐ5/GĐ10
- [ ] GĐ4 — Deploy thử Vietnix + `docs/DEPLOY.md` bản đầu
- [ ] GĐ5 — Landing pages
- [ ] GĐ6 — Blog
- [ ] GĐ7 — SEO
- [ ] GĐ8 — Revalidate endpoint + `docs/WEBHOOK.md`
- [ ] GĐ9 — Hoàn thiện deploy
- [ ] GĐ10 — Kiểm tra tổng thể

## 8. Quy trình mỗi giai đoạn (nhắc lại)
Làm đúng 1 giai đoạn → `npm run lint` · `npm run typecheck` · `npm run build` → báo kết quả + danh sách file + đối chiếu tiêu chí → tick bảng tiến độ → **dừng chờ "OK giai đoạn N"**. Phát hiện cần đổi plan → dừng, đề xuất, chờ duyệt.

## 9. Bước tiếp theo
Chờ "OK giai đoạn 3" rồi mới bắt đầu **GĐ4** (deploy thử lên Vietnix — cần bạn thao tác cPanel/SSH).
