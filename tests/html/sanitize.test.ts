import { describe, expect, it } from 'vitest';

import { estimateReadingMinutes, renderPostContent } from '@/lib/html/content';
import { sanitizePostHtml } from '@/lib/html/sanitize';

const opts = { siteOrigin: 'https://lapbee.vn' };
const clean = (html: string) => sanitizePostHtml(html, opts);

describe('sanitizePostHtml', () => {
  it('loại script, style, iframe kèm nội dung', () => {
    const out = clean(
      '<p>a</p><script>alert(1)</script><style>p{color:red}</style><iframe src="https://x.y"></iframe><p>b</p>',
    );
    expect(out).toBe('<p>a</p><p>b</p>');
  });

  it('bỏ thuộc tính sự kiện, style, class', () => {
    const out = clean('<p onclick="x()" style="color:red" class="evil">hi</p>');
    expect(out).toBe('<p>hi</p>');
  });

  it('bỏ href javascript:, data:, vbscript: (kể cả viết hoa / có khoảng trắng)', () => {
    for (const href of [
      'javascript:alert(1)',
      'JaVaScRiPt:alert(1)',
      ' javascript:alert(1)',
      'data:text/html;base64,PHNjcmlwdD4=',
      'vbscript:msgbox(1)',
    ]) {
      expect(clean(`<a href="${href}">x</a>`)).toBe('<a>x</a>');
    }
  });

  it('ảnh: chỉ https tuyệt đối, thêm loading lazy; onerror bị bỏ', () => {
    expect(clean('<img src="https://cdn.lapbee.vn/a.webp" alt="A" onerror="alert(1)">')).toBe(
      '<img src="https://cdn.lapbee.vn/a.webp" alt="A" loading="lazy" decoding="async" />',
    );
    expect(clean('<p><img src="x" onerror="alert(1)"></p>')).toBe('<p></p>');
    expect(clean('<img src="http://cdn.lapbee.vn/a.webp">')).toBe('');
    expect(clean('<img src="data:image/png;base64,AAAA">')).toBe('');
    expect(clean('<img src="//evil.example/a.png">')).toBe('');
  });

  it('link ngoài thêm rel noopener nofollow; link nội bộ giữ nguyên; bỏ target và rel của tác giả', () => {
    expect(clean('<a href="https://evil.example" target="_blank" rel="opener">x</a>')).toBe(
      '<a href="https://evil.example" rel="noopener nofollow">x</a>',
    );
    expect(clean('<a href="https://lapbee.vn/dat-lich" rel="opener">x</a>')).toBe(
      '<a href="https://lapbee.vn/dat-lich">x</a>',
    );
    expect(clean('<a href="/dat-lich">x</a>')).toBe('<a href="/dat-lich">x</a>');
    expect(clean('<a href="tel:19000000">x</a>')).toBe('<a href="tel:19000000">x</a>');
  });

  it('h1 trong nội dung thành h2 (trang chỉ có một h1)', () => {
    expect(clean('<h1>Tiêu đề</h1>')).toBe('<h2>Tiêu đề</h2>');
  });

  it('thẻ lạ bị bỏ nhưng giữ chữ bên trong; form/input bị bỏ', () => {
    expect(clean('<div><span>chữ</span></div>')).toBe('chữ');
    expect(clean('<form action="https://evil.example"><input name="p"></form>')).toBe('');
  });

  it('không để lọt HTML qua thẻ không đóng hoặc comment', () => {
    expect(clean('<p>a<!-- <script>alert(1)</script> --></p>')).toBe('<p>a</p>');
    expect(clean('<svg><script>alert(1)</script></svg>')).toBe('');
  });
});

describe('renderPostContent (markdown)', () => {
  it('markdown → HTML rồi sanitize (HTML thô trong markdown bị làm sạch)', () => {
    const out = renderPostContent(
      '# Tiêu đề\n\nĐoạn **đậm** và [link](https://evil.example).\n\n<script>alert(1)</script>\n\n<img src="x" onerror="alert(1)">',
      'markdown',
      opts,
    );
    expect(out).toContain('<h2>Tiêu đề</h2>');
    expect(out).toContain('<strong>đậm</strong>');
    expect(out).toContain('<a href="https://evil.example" rel="noopener nofollow">link</a>');
    expect(out).not.toMatch(/script|onerror|alert/);
  });

  it('khối code giữ class language-*', () => {
    const out = renderPostContent('```ts\nconst a = 1;\n```', 'markdown', opts);
    expect(out).toContain('<code class="language-ts">');
  });
});

describe('estimateReadingMinutes', () => {
  it('tối thiểu 1 phút, ~200 từ/phút', () => {
    expect(estimateReadingMinutes('<p>ngắn</p>')).toBe(1);
    expect(estimateReadingMinutes(`<p>${'từ '.repeat(1000)}</p>`)).toBe(5);
  });
});
