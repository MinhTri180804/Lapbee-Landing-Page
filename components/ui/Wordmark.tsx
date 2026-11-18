import Image from 'next/image';
import type { CSSProperties } from 'react';

import logoMark from '@/public/brand/logo-mark.webp';

import { cx } from './cx';
import styles from './Wordmark.module.css';

export type WordmarkProps = {
  /** Cỡ chữ (px); logo cao 1.6× giá trị này. */
  size?: number;
  /** Chữ sáng cho nền tối (band). */
  inverse?: boolean;
  /** Thêm nhãn mono "SINCE 2012". */
  tagline?: boolean;
  /** Hiện logo hình lục giác trước chữ (mặc định true). */
  mark?: boolean;
  /** Chỉ hiện logo. */
  markOnly?: boolean;
  /** Logo trong header: tải sớm. */
  priority?: boolean;
  className?: string;
};

/** Logo LAPBEE: logo lục giác + chữ "LAP[BEE]". Không đổi màu / vẽ lại logo. */
export function Wordmark({
  size = 24,
  inverse = false,
  tagline = false,
  mark = true,
  markOnly = false,
  priority = false,
  className,
}: WordmarkProps) {
  const style = { '--size': `${size}px` } as CSSProperties;
  const markImg = (
    <Image
      src={logoMark}
      alt={markOnly ? 'LAPBEE' : ''}
      className={styles.mark}
      // Ảnh đã nén sẵn ở kích thước nhỏ (WebP 173×160) → không cần qua bộ tối ưu ảnh.
      unoptimized
      priority={priority}
    />
  );

  return (
    <span className={cx(styles.wordmark, inverse && styles.inverse, className)} style={style}>
      {(mark || markOnly) && markImg}
      {!markOnly && (
        <span className={styles.text}>
          <span className={styles.name}>
            LAP<span className={styles.bee}>BEE</span>
          </span>
          {tagline && <span className={styles.tagline}>since 2012</span>}
        </span>
      )}
    </span>
  );
}
