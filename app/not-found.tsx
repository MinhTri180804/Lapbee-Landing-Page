import type { Metadata } from 'next';

import { ErrorState } from '@/components/layout/ErrorState';
import { Button } from '@/components/ui/Button';
import { routes } from '@/lib/routes';

/*
 * Trang 404 (URL lạ và mọi `notFound()`), hiển thị trong layout chung (header/footer).
 * Next trả HTTP 404 và tự thêm `<meta name="robots" content="noindex">`.
 */
export const metadata: Metadata = {
  title: 'Không tìm thấy trang',
  description: 'Trang bạn tìm không tồn tại hoặc đã được chuyển đi.',
};

export default function NotFound() {
  return (
    <ErrorState
      code="404"
      title="Không tìm thấy trang"
      lead="Trang bạn tìm không tồn tại hoặc đã được chuyển đi. Thử quay về trang chủ hoặc xem các bài đăng mới."
      actions={
        <>
          <Button href={routes.home()} iconLeft="arrow-left">
            Về trang chủ
          </Button>
          <Button href={routes.posts()} variant="outline">
            Xem bài đăng
          </Button>
        </>
      }
    />
  );
}
