type JsonLdProps = {
  /** Dữ liệu schema.org đã dựng sẵn (lib/seo/jsonld.ts). */
  data: Record<string, unknown> | Record<string, unknown>[];
};

/**
 * Thẻ `<script type="application/ld+json">`. Escape `<` để chuỗi từ API (tiêu đề bài…) không thể
 * đóng thẻ script sớm (`</script>`) và chèn HTML.
 */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
