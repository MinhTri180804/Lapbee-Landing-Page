import Link from 'next/link';
import type { ReactNode } from 'react';

import { cx } from './cx';
import styles from './Tag.module.css';

export type TagProps = {
  /** Bộ lọc là link (URL riêng cho từng danh mục) để chạy được khi tắt JS và SEO được. */
  href: string;
  selected?: boolean;
  /** Bộ đếm mono phía sau nhãn. */
  count?: number;
  className?: string;
  children: ReactNode;
};

/** Tag bo tròn dùng cho bộ lọc danh mục. */
export function Tag({ href, selected = false, count, className, children }: TagProps) {
  return (
    <Link
      href={href}
      className={cx(styles.tag, selected && styles.selected, className)}
      aria-current={selected ? 'page' : undefined}
    >
      {children}
      {count !== undefined && <span className={styles.count}>{count}</span>}
    </Link>
  );
}
