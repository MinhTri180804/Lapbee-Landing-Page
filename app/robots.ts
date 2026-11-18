import type { MetadataRoute } from 'next';

import { getServerEnv } from '@/lib/env';
import { routes } from '@/lib/routes';

/**
 * /robots.txt — cho phép toàn site, chặn trang nội bộ (styleguide, API) và kết quả tìm kiếm
 * (nội dung trùng lặp theo từ khoá tuỳ ý). Trỏ tới sitemap theo SITE_URL.
 */
export default function robots(): MetadataRoute.Robots {
  const { siteUrl } = getServerEnv();
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/_styleguide', '/api/', routes.search()],
    },
    sitemap: new URL('/sitemap.xml', siteUrl).toString(),
  };
}
