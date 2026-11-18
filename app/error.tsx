'use client';

import { ErrorState } from '@/components/layout/ErrorState';
import { Button } from '@/components/ui/Button';
import { routes } from '@/lib/routes';

/*
 * Lỗi khi render một trang (vd. backend lỗi và trang chưa có bản cache). Header/footer vẫn hiển thị.
 * Next 16.3+: `retry()` tải lại dữ liệu rồi render lại (thay `reset()`).
 * Không hiển thị `error.message` (lỗi từ server đã bị Next che); `digest` khớp với log server.
 */
export default function ErrorPage({ error, retry }: { error: unknown; retry: () => void }) {
  const digest =
    error instanceof Error && 'digest' in error && typeof error.digest === 'string'
      ? error.digest
      : undefined;

  return (
    <>
      <title>Có lỗi xảy ra · LAPBEE</title>
      <ErrorState
        code="Lỗi"
        title="Không tải được trang"
        lead={`Hệ thống đang bận hoặc mất kết nối. Vui lòng thử lại sau ít phút.${digest ? ` (Mã lỗi: ${digest})` : ''}`}
        actions={
          <>
            <Button type="button" onClick={() => retry()} iconLeft="refresh-cw">
              Thử lại
            </Button>
            <Button href={routes.home()} variant="outline">
              Về trang chủ
            </Button>
          </>
        }
      />
    </>
  );
}
