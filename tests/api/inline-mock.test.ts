import { afterEach, describe, expect, it, vi } from 'vitest';

import { ApiNotFoundError } from '@/lib/api/errors';
import { getCategories, getPost, getPostSlugs, getPosts } from '@/lib/api/posts';

/** MOCK_API_INLINE=true: dữ liệu mẫu trong tiến trình — không được gọi fetch. */
describe('MOCK_API_INLINE', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  function inline() {
    vi.stubEnv('MOCK_API_INLINE', 'true');
    vi.stubEnv('USE_MOCK_API', 'false');
    vi.stubEnv('API_BASE_URL', '');
    return vi.spyOn(globalThis, 'fetch');
  }

  it('trả dữ liệu mẫu qua schema, ảnh bìa là đường dẫn trong site, không fetch', async () => {
    const fetchSpy = inline();
    const list = await getPosts(1, 6);
    expect(list.total).toBe(18);
    expect(list.items[0]!.cover.url).toBe('/mock/images/cover-placeholder.webp');
    expect((await getPostSlugs()).length).toBe(18);
    expect((await getCategories()).length).toBe(4);
    expect((await getPost('chuan-bi-gi-truoc-khi-mang-may-di-sua')).contentFormat).toBe('markdown');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('bài không có → ApiNotFoundError như backend thật', async () => {
    inline();
    await expect(getPost('khong-ton-tai')).rejects.toBeInstanceOf(ApiNotFoundError);
  });
});
