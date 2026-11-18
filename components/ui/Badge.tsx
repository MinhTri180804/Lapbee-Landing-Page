import type { ReactNode } from 'react';

import styles from './Badge.module.css';
import { cx } from './cx';

export type BadgeTone = 'neutral' | 'brand' | 'ink' | 'success' | 'danger' | 'info' | 'warning';

export type BadgeProps = {
  tone?: BadgeTone;
  dot?: boolean;
  className?: string;
  children: ReactNode;
};

/** Nhãn mono viết hoa (danh mục, trạng thái). */
export function Badge({ tone = 'neutral', dot = false, className, children }: BadgeProps) {
  return (
    <span className={cx(styles.badge, styles[tone], className)}>
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  );
}
