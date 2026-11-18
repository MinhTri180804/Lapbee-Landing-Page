import 'server-only';

import sanitizeHtml, { type IOptions } from 'sanitize-html';

/**
 * Làm sạch HTML bài viết từ backend trước khi render (`dangerouslySetInnerHTML`).
 *
 * Thư viện: `sanitize-html` — thuần JS, chạy trên server không cần DOM/jsdom (DOMPurify cần jsdom
 * trên server, nặng hơn nhiều); chạy lúc render ISR nên kết quả nằm trong cache, không tốn mỗi request.
 *
 * Quy tắc (whitelist — thẻ/thuộc tính không có trong danh sách bị bỏ):
 * - `script`, `style`, `iframe`, `form`… bị loại kèm nội dung; mọi `on*`, `style`, `class` bị bỏ.
 * - `h1` → `h2` (trang chỉ có một h1 là tiêu đề bài).
 * - Link: chỉ `http(s):`, `mailto:`, `tel:`, đường dẫn tương đối, `#`; link ra ngoài site
 *   thêm `rel="noopener nofollow"`; không cho `target`.
 * - Ảnh: chỉ URL tuyệt đối `https:` (bỏ `http:`, `data:`, tương đối); thêm `loading="lazy"`.
 */

export type SanitizeOptions = {
  /** Origin của site (SITE_URL) — link cùng origin không bị coi là link ngoài. */
  siteOrigin: string;
};

const ALLOWED_TAGS = [
  'p',
  'br',
  'hr',
  'h2',
  'h3',
  'h4',
  'strong',
  'b',
  'em',
  'i',
  'u',
  's',
  'mark',
  'small',
  'sub',
  'sup',
  'abbr',
  'blockquote',
  'q',
  'cite',
  'code',
  'pre',
  'kbd',
  'ul',
  'ol',
  'li',
  'dl',
  'dt',
  'dd',
  'a',
  'img',
  'figure',
  'figcaption',
  'table',
  'caption',
  'thead',
  'tbody',
  'tfoot',
  'tr',
  'th',
  'td',
];

const ABSOLUTE_HTTPS = /^https:\/\//i;
const ABSOLUTE_HTTP = /^https?:\/\//i;

function isExternal(href: string, siteOrigin: string): boolean {
  if (!ABSOLUTE_HTTP.test(href)) return false; // tương đối, #, mailto:, tel:
  try {
    return new URL(href).origin !== new URL(siteOrigin).origin;
  } catch {
    return true;
  }
}

function buildOptions({ siteOrigin }: SanitizeOptions): IOptions {
  return {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      a: ['href', 'title', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'decoding'],
      abbr: ['title'],
      ol: ['start', 'reversed'],
      th: ['colspan', 'rowspan', 'scope'],
      td: ['colspan', 'rowspan'],
      code: ['class'],
    },
    // Chỉ giữ class ngôn ngữ của khối code markdown (```ts → language-ts).
    allowedClasses: { code: [/^language-[a-z0-9+#-]+$/] },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowedSchemesByTag: { img: ['https'] },
    allowProtocolRelative: false,
    disallowedTagsMode: 'discard',
    transformTags: {
      h1: 'h2',
      a: (tagName, attribs) => {
        const { rel: _rel, ...rest } = attribs;
        const href = rest.href ?? '';
        return {
          tagName,
          attribs: isExternal(href, siteOrigin) ? { ...rest, rel: 'noopener nofollow' } : rest,
        };
      },
      img: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, loading: 'lazy', decoding: 'async' },
      }),
    },
    // Ảnh không phải URL https tuyệt đối → bỏ hẳn thẻ (không để lại <img> không có src).
    exclusiveFilter: (frame) =>
      frame.tag === 'img' && !ABSOLUTE_HTTPS.test(frame.attribs.src ?? ''),
  };
}

/** HTML không tin cậy → HTML an toàn để render. */
export function sanitizePostHtml(dirty: string, options: SanitizeOptions): string {
  return sanitizeHtml(dirty, buildOptions(options)).trim();
}

/** Chỉ lấy chữ (bỏ toàn bộ thẻ) — để đếm từ tính thời gian đọc. */
export function htmlToText(html: string): string {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} }).replace(/\s+/g, ' ').trim();
}
