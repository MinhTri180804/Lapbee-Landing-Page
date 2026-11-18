import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// CSS toàn cục nạp TRƯỚC CSS Module của component để module luôn thắng khi cùng độ ưu tiên.
import './globals.css';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ScrollEffects } from '@/components/layout/ScrollEffects';
import { getSiteSettings } from '@/content';
import { getServerEnv } from '@/lib/env';
import { DEFAULT_OG_IMAGE } from '@/lib/seo/metadata';
import { toContactInfo } from '@/lib/site';
import { themeInitScript } from '@/lib/theme';

import { fontVariables } from './fonts';

/**
 * Metadata mặc định cho mọi trang (trang con ghi đè qua `buildMetadata`).
 * `metadataBase` = SITE_URL → canonical, og:url, ảnh dùng được đường dẫn tương đối.
 * Favicon/apple icon: file `app/icon.png`, `app/apple-icon.png` (Next tự gắn thẻ).
 */
export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  const { siteUrl, noindex } = getServerEnv();
  const description = site.about;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: site.name, template: `%s · ${site.name}` },
    description,
    applicationName: site.name,
    // SĐT trong nội dung đã là link tel: — tắt tự nhận diện của Safari iOS để không tạo link trùng.
    formatDetection: { telephone: false },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: 'vi_VN',
      title: site.name,
      description,
      images: [{ ...DEFAULT_OG_IMAGE, alt: site.name }],
    },
    twitter: { card: 'summary_large_image', title: site.name, description },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const site = await getSiteSettings();
  const contact = toContactInfo(site);

  return (
    // data-theme và class "js" được script dưới đặt trước hydrate → bỏ cảnh báo lệch thuộc tính trên <html>.
    <html lang="vi" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a href="#main" className="lb-skip-link">
          Bỏ qua tới nội dung chính
        </a>
        <Header nav={site.nav} contact={contact} cta={site.cta} />
        <ScrollEffects />
        <main id="main">{children}</main>
        <Footer
          nav={site.nav}
          contact={contact}
          about={site.about}
          copyright={site.footer.copyright}
          since={site.footer.since}
        />
      </body>
    </html>
  );
}
