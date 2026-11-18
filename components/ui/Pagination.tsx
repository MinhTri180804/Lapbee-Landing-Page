import Link from 'next/link';

import { cx } from './cx';
import { Icon } from './Icon';
import styles from './Pagination.module.css';

export type PaginationProps = {
  /** Trang hiện tại, bắt đầu từ 1. */
  page: number;
  /** Tổng số trang. Không render gì khi ≤ 1. */
  total: number;
  /** Tạo URL cho từng trang (vd. `routes.posts`). */
  hrefFor: (page: number) => string;
  /** Số trang hiện hai bên trang hiện tại trước khi rút gọn thành "…". */
  siblings?: number;
  className?: string;
};

type PageItem = number | 'gap-start' | 'gap-end';

/** Danh sách trang: 1 … (cur±siblings) … total. */
export function pageItems(current: number, total: number, siblings: number): PageItem[] {
  const out: PageItem[] = [1];
  const lo = Math.max(2, current - siblings);
  const hi = Math.min(total - 1, current + siblings);
  if (lo > 2) out.push('gap-start');
  for (let i = lo; i <= hi; i++) out.push(i);
  if (hi < total - 1) out.push('gap-end');
  if (total > 1) out.push(total);
  return out;
}

const pad = (n: number) => String(n).padStart(2, '0');

/** Phân trang bằng link (mỗi trang một URL) — chạy được khi tắt JS, bot đọc được. */
export function Pagination({ page, total, hrefFor, siblings = 1, className }: PaginationProps) {
  if (total <= 1) return null;
  const hasPrev = page > 1;
  const hasNext = page < total;

  return (
    <nav aria-label="Phân trang" className={cx(styles.pagination, className)}>
      {hasPrev ? (
        <Link href={hrefFor(page - 1)} className={styles.item} rel="prev">
          <Icon name="arrow-left" size={16} />
          <span className={styles.step}>Trước</span>
        </Link>
      ) : (
        <span className={cx(styles.item, styles.disabled)} aria-disabled="true">
          <Icon name="arrow-left" size={16} />
          <span className={styles.step}>Trước</span>
        </span>
      )}

      <ul className={styles.pages}>
        {pageItems(page, total, siblings).map((item) =>
          typeof item === 'number' ? (
            <li key={item}>
              {item === page ? (
                <span className={cx(styles.item, styles.active)} aria-current="page">
                  <span className="lb-sr-only">Trang </span>
                  {pad(item)}
                </span>
              ) : (
                <Link href={hrefFor(item)} className={styles.item} aria-label={`Trang ${item}`}>
                  {pad(item)}
                </Link>
              )}
            </li>
          ) : (
            <li key={item} aria-hidden="true" className={cx(styles.item, styles.ellipsis)}>
              …
            </li>
          ),
        )}
      </ul>

      {hasNext ? (
        <Link href={hrefFor(page + 1)} className={styles.item} rel="next">
          <span className={styles.step}>Sau</span>
          <Icon name="arrow-right" size={16} />
        </Link>
      ) : (
        <span className={cx(styles.item, styles.disabled)} aria-disabled="true">
          <span className={styles.step}>Sau</span>
          <Icon name="arrow-right" size={16} />
        </span>
      )}
    </nav>
  );
}
