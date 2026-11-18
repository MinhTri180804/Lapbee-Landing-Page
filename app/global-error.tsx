'use client';

// global-error thay cả root layout → tự nạp CSS và font (không có header/footer, theme theo hệ điều hành).
import './globals.css';

import { ErrorState } from '@/components/layout/ErrorState';
import { Button } from '@/components/ui/Button';

import { fontVariables } from './fonts';

/** Lỗi ở chính root layout (vd. không đọc được thông tin site). Chỉ là phương án cuối. */
export default function GlobalError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <html lang="vi" className={fontVariables}>
      <head>
        <title>Có lỗi xảy ra · LAPBEE</title>
        <meta name="robots" content="noindex" />
      </head>
      <body>
        <main id="main">
          <ErrorState
            code="Lỗi"
            title="Không tải được trang"
            lead="Hệ thống đang bận hoặc mất kết nối. Vui lòng thử lại sau ít phút."
            actions={
              <>
                <Button type="button" onClick={() => retry()} iconLeft="refresh-cw">
                  Thử lại
                </Button>
                <Button href="/" variant="outline">
                  Về trang chủ
                </Button>
              </>
            }
          />
        </main>
      </body>
    </html>
  );
}
