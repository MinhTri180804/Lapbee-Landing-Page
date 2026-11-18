import 'server-only';

import { Marked } from 'marked';

import { htmlToText, sanitizePostHtml, type SanitizeOptions } from './sanitize';

/** Instance riêng (không dùng `marked` toàn cục) để cấu hình không bị nơi khác thay đổi. */
const markdown = new Marked({ gfm: true, breaks: false, async: false });

/**
 * Markdown → HTML. `marked` KHÔNG làm sạch (HTML thô trong markdown được giữ nguyên),
 * nên kết quả luôn đi qua `sanitizePostHtml` — dùng `renderPostContent`, không dùng hàm này trực tiếp.
 */
export function markdownToHtml(source: string): string {
  return markdown.parse(source, { async: false });
}

/** Nội dung bài (`content` + `contentFormat` từ API) → HTML đã sanitize. */
export function renderPostContent(
  content: string,
  format: 'html' | 'markdown',
  options: SanitizeOptions,
): string {
  const html = format === 'markdown' ? markdownToHtml(content) : content;
  return sanitizePostHtml(html, options);
}

/** Tốc độ đọc trung bình tiếng Việt (từ/phút) — chỉ để ước lượng "x phút đọc". */
const WORDS_PER_MINUTE = 200;

/** Ước lượng thời gian đọc (phút, tối thiểu 1) từ HTML đã render. */
export function estimateReadingMinutes(html: string): number {
  const words = htmlToText(html).split(' ').filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
