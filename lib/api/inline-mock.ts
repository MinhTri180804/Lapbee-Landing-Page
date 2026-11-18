import 'server-only';

import homePage from '@/mocks/data/pages/home.json';
import posts from '@/mocks/data/posts.json';
import { createMockHandler } from '@/mocks/handler.mjs';

/**
 * MOCK_API_INLINE=true — trả dữ liệu mẫu ngay trong tiến trình Next, không gọi mạng.
 * Chỉ dùng cho bản preview/demo (vd. Vercel cho khách xem trước) khi chưa có backend thật.
 *
 * Dùng chung logic route với mock server (mocks/handler.mjs); dữ liệu JSON được đóng gói vào bản
 * build (import tĩnh) nên chạy được trên serverless. Ảnh bìa trỏ tới public/mock/images (cùng domain).
 * Response vẫn đi qua zod và xử lý lỗi y như backend thật (lib/api/client.ts).
 */
const DATA: Record<string, unknown> = {
  'posts.json': posts,
  'pages/home.json': homePage,
};

const handle = createMockHandler({ load: async (path) => DATA[path] });

export async function inlineMockResponse(url: URL): Promise<Response> {
  const { status, body } = await handle(url, (path) => `/mock${path}`);
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
