import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { fontVariables } from './fonts';
import { themeInitScript } from '@/lib/theme';
import './globals.css';

// Metadata mặc định tạm thời. GĐ7 thay bằng lib/seo (canonical, Open Graph, Twitter, metadataBase).
export const metadata: Metadata = {
  title: {
    default: 'LAPBEE — Trung tâm sửa chữa máy tính',
    template: '%s · LAPBEE',
  },
  description:
    'Trung tâm sửa chữa thiết bị công nghệ và máy tính uy tín, hơn 14 năm kinh nghiệm, thành lập từ năm 2012.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    // data-theme và class "js" được script dưới đặt trước hydrate → bỏ cảnh báo lệch thuộc tính trên <html>.
    <html lang="vi" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
