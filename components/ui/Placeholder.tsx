import type { CSSProperties } from 'react';

import { cx } from './cx';
import styles from './Placeholder.module.css';

export type PlaceholderProps = {
  /** Nhãn mono hiển thị ở giữa, vd. "ẢNH XƯỞNG SỬA CHỮA". */
  label?: string;
  /** Tỉ lệ khung, vd. "16/9", "4/5". */
  ratio?: string;
  /** Bo góc (mặc định 8px). Đặt false khi nằm sát mép thẻ. */
  rounded?: boolean;
  className?: string;
};

/** Khung gạch chéo trung tính, thay ảnh chụp cho đến khi có ảnh thật (theo design system). */
export function Placeholder({
  label,
  ratio = '16/9',
  rounded = true,
  className,
}: PlaceholderProps) {
  const style = { aspectRatio: ratio } as CSSProperties;
  return (
    <div
      className={cx(styles.placeholder, !rounded && styles.square, className)}
      style={style}
      role={label ? 'img' : undefined}
      aria-label={label ? `Ảnh minh hoạ: ${label.toLowerCase()}` : undefined}
      aria-hidden={label ? undefined : true}
    >
      {label && (
        <span className="lb-label" aria-hidden="true">
          {label}
        </span>
      )}
    </div>
  );
}
