# LAPBEE Design System

## Company context
**Công ty TNHH LAPBEE** là trung tâm sửa chữa thiết bị công nghệ và máy tính, thành lập năm 2012 với tên ban đầu **LAPPY**. Đến 2026 công ty có hơn 14 năm kinh nghiệm.

- **Product:** one marketing website. It introduces the company and its services like a landing page, and has a posts section the company updates regularly.
- **Required pages:** Trang chủ (Home), Đội ngũ (Team members), Hành trình (History/Journey), Bài đăng (Posts).
- **Audiences:** businesses that need repair/IT maintenance, and individual users looking for a trustworthy repair shop.
- **Must work on** desktop, laptop, tablet and phone at any size.
- **Slogan (brief):** "Trung tâm sửa chữa thiết bị công nghệ và máy tính uy tín, được nhiều sự tin tưởng, có hơn 14 năm kinh nghiệm, được thành lập từ năm 2012." (The brief wrote "thành tập". We read that as a typo for "thành lập".)
- **Design direction:** calm, minimal, focused, smart and striking. It should not look like the usual AI productivity app (no purple gradients, glassy cards or sparkle icons).
- **Primary colour:** #F5D857.

### Sources
- `uploads/lapbe-logo.svg` / `lapbe-logo-a3699e10.svg`: empty SVG exports (the image data is missing). Not usable.
- `uploads/pasted-1794926544447-0.png`: **the logo mark** (a hexagon hive with a wrench and screwdriver), copied to `assets/logo-mark.png` (156×144, transparent). The `Wordmark` component pairs it with typeset "LAP**BEE**". Supply a high-res or vector version for print.
- No codebase, Figma file or existing website was provided. Everything here is an original design built from the brief.

## Index
- `styles.css` — entry point (imports only) → `tokens/fonts.css, colors.css, typography.css, spacing.css, effects.css, base.css`
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Effects, Brand)
- `components/` — React primitives (see below), one card per folder
- `ui_kits/website/` — click-through website: Home, Team, History, Posts, Post detail, Booking
- `assets/logo-mark.png` — logo mark
- `thumbnail.html`, `SKILL.md`

## Components
- **core/**: Button, IconButton, Icon, Wordmark, Badge, Tag
- **forms/**: Input (incl. multiline), Select, Checkbox, Radio, Switch
- **surfaces/**: Card, Dialog, Toast, Tooltip
- **navigation/**: Tabs, Pagination

Namespace: `window.LAPBEEDesignSystem_7efb49`.
**Intentional additions:** Icon (wrapper for the Lucide CDN set) and Wordmark (logo lockup: mark + typeset name).

## Dark mode
Set `data-theme="dark"` on `<html>` (tokens in `tokens/colors.css`). The site reads the visitor's saved choice (`localStorage "lb-theme"`), falling back to `prefers-color-scheme`, and sets it before first paint. The header has a sun/moon toggle that reveals the new theme as a circle expanding from the button (View Transitions API, with a plain fade as fallback).
- **Ink ramp flips:** `--ink-950` means "strongest contrast with the page" in both themes, so strong fills (secondary button, selected tag, active page, toast) turn light in dark mode.
- **`--accent-on-strong`** is the accent on those fills: bee-400 in light, deep bee #6E5B0C in dark.
- **`--on-brand`** is pinned to dark ink: text on bee yellow is always dark.
- **`--band-*`** tokens (bg, fg, fg-2, border, hover, accent) are for full-bleed dark sections (footer, B2B, principles). They stay dark in both themes. Use these instead of `--surface-inverse` for bands.
- Photos are dimmed slightly (brightness .88) in dark mode.

## CONTENT FUNDAMENTALS
- **Language:** Vietnamese first. The site writes as the company to the customer: "chúng tôi" for LAPBEE and "bạn" for the customer (never "quý khách" in headlines; it's fine in formal B2B contracts).
- **Tone:** calm, plain and precise, like a good technician explaining a fault. It makes concrete promises (báo giá trước, bảo hành bằng văn bản, gọi lại trong 15 phút) and avoids superlatives and hype. No exclamation marks in UI copy.
- **Casing:** sentence case for headings and buttons ("Đặt lịch sửa chữa", not "ĐẶT LỊCH SỬA CHỮA"). Uppercase appears only in mono labels/eyebrows (dates, badges, short category eyebrows).
- **Headlines:** short, declarative and concrete. Example: "Máy hỏng, đã có LAPBEE." / "Từ LAPPY đến LAPBEE." / "Bộ phận IT thuê ngoài cho văn phòng của bạn."
- **Buttons:** verb + object: "Đặt lịch sửa", "Gọi ngay", "Xem dịch vụ", "Tất cả bài đăng".
- **Numbers carry trust:** 2012, 14+, 0đ, 15 phút. Set them in display or mono and show them big.
- **Emoji:** never. **Unicode:** "→" and "·" are used as typographic devices in labels.
- **Dates:** `dd.mm.yyyy` in mono (12.11.2026). Times: 08:00 – 20:00.

## VISUAL FOUNDATIONS
- **Colour:** warm paper (#FAF9F5) and warm graphite ink (#121210) do most of the work. **Bee yellow #F5D857 is a signal:** use it for the primary CTA, the active tab underline, highlighted words and one brand block per view. It is always a *fill* with ink text, or yellow on ink, and never yellow text on paper (1.4:1). Semantic green/red/blue are muted and appear only for status.
- **Type:** Archivo at semi-expanded width (wdth 112–125) and semibold for display, with tight negative tracking and balanced wrapping. Be Vietnam Pro for body (designed for Vietnamese diacritics). JetBrains Mono for eyebrows, dates, counters and spec labels. The display/body contrast is the main source of character.
- **Spacing:** 4px base. Sections are generous (`--section-y` 64–128px fluid). Container is 1240px with a fluid 20–48px gutter. Layouts use a 12-col feel and asymmetric splits (1.35fr / 1fr).
- **Backgrounds:** flat colour only. No gradients, textures or illustrations. Sections alternate paper ↔ full-bleed ink (the B2B band and the footer). Imagery placeholders use a neutral diagonal hatch until photography arrives.
- **Imagery (when supplied):** real workshop photography of hands, tools, boards and the team. Natural, slightly warm light with neutral grading. No stock-smile or glowing-circuit imagery.
- **Lines over boxes:** hairline rules (1px `--border-1`) separate content. Each section opens with a 1px **ink** top rule above the heading. Number labels ("№ 01") are not used. Stat strips are ruled grids, not cards.
- **Corner radii:** crisp. 2px badges, 4px controls, 8px cards, 14px dialogs. Pill shape only for filter tags.
- **Cards:** white, 1px hairline border, 8px radius, **no resting shadow**. When interactive, hover turns the border ink, lifts the card 2px and adds `--shadow-2`. Other variants: sunken (tinted, borderless), ink, brand (one per page at most).
- **Shadows:** almost absent. shadow-1 is for resting floating items, shadow-2 for hover lift, shadow-3 for dialog, toast and the hero chip.
- **Hover:** neutral controls get a tinted background (ink-50/100). Primary yellow darkens to bee-600. Links thicken their underline and turn it yellow.
- **Press:** a 1px downward translate. No scale and no colour flash.
- **Focus:** a 2px ink outline. Inputs show an ink border plus a 3px bee-300 ring.
- **Motion:** quiet and unhurried. UI feedback uses `--ease-out` at 120/200/420ms. Page-level motion uses `--ease-expo` `cubic-bezier(.16,1,.3,1)`: smooth inertial scrolling (Lenis, 1.15s), content that rises 28px and fades in as it scrolls into view (80ms stagger, max 6 steps), a hero entrance stagger with an image clip-reveal, slight parallax on the hero image (−6%), a header that hides on scroll-down and returns on scroll-up, and a 2px bee-yellow reading-progress line under the header. No bounce, spin or scale. Everything is disabled under `prefers-reduced-motion`.
- **Transparency/blur:** only on the sticky header (86% paper + 14px blur) and the dialog scrim (48% ink + 4px blur).
- **Responsive:** breakpoints at 1024 (nav collapses to a drawer), 820 (splits stack) and 560 (single column). Type uses `clamp()` roles.

## ICONOGRAPHY
- **Set:** [Lucide](https://lucide.dev) outline icons, loaded from `unpkg.com/lucide-static@0.460.0` through the `Icon` component (CSS mask, so icons inherit `currentColor`). **This is a substitution:** no brand icon set was provided.
- **Style:** 2px outline at 24 grid, used at 16–28px, ink or inherited colour, never filled or duotone. Device icons (laptop, monitor, smartphone, cpu, hard-drive) mark services. Arrows (arrow-right, arrow-up-right) mark navigation.
- **No emoji.** Unicode only as typography (→ ·). No PNG icons.
- **Logo:** `assets/logo-mark.png`, always used through `Wordmark`. The mark already uses ink and bee yellow; never recolour or redraw it.

## Fonts
All three fonts come from Google Fonts with Vietnamese subsets: Archivo, Be Vietnam Pro, JetBrains Mono. No brand font files were provided. If LAPBEE has licensed brand fonts, supply them and replace `tokens/fonts.css`.
