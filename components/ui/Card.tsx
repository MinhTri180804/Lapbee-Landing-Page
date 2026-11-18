import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

import styles from './Card.module.css';
import { cx } from './cx';

export type CardVariant = 'outline' | 'sunken' | 'ink' | 'brand';

export type CardProps = {
  /** outline (mặc định), sunken (nền nhạt, không viền), ink (tối), brand (vàng — tối đa 1/trang). */
  variant?: CardVariant;
  /**
   * Hiệu ứng hover nhấc thẻ. Thẻ tương tác chứa một `CardLink` để cả thẻ bấm được
   * (không bọc cả thẻ trong <a>, giữ HTML hợp lệ khi bên trong có heading, đoạn văn).
   */
  interactive?: boolean;
  /** Padding (px hoặc giá trị CSS). */
  padding?: number | string;
  as?: 'div' | 'article' | 'li' | 'section';
  className?: string;
  children: ReactNode;
};

export function Card({
  variant = 'outline',
  interactive = false,
  padding = 24,
  as: Element = 'div',
  className,
  children,
}: CardProps) {
  const style = {
    '--card-padding': typeof padding === 'number' ? `${padding}px` : padding,
  } as CSSProperties;
  return (
    <Element
      className={cx(styles.card, styles[variant], interactive && styles.interactive, className)}
      style={style}
    >
      {children}
    </Element>
  );
}

export type CardLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

/** Link phủ toàn bộ thẻ cha (`interactive`) — thường bọc tiêu đề của thẻ. */
export function CardLink({ href, className, children }: CardLinkProps) {
  return (
    <Link href={href} className={cx(styles.cardLink, className)}>
      {children}
    </Link>
  );
}
