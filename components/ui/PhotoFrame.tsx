import Image from 'next/image';
import type { CSSProperties } from 'react';

import type { ImageData } from '@/content';

import { cx } from './cx';
import styles from './PhotoFrame.module.css';

export type PhotoFrameProps = {
  /** null → khung gạch chéo (chưa có ảnh thật). */
  image: ImageData | null;
  /** Nhãn mono: chữ trên placeholder, hoặc chú thích nhỏ góc ảnh. */
  label: string;
  /** Tỉ lệ khung, vd. "4/5". */
  ratio: string;
  /** Giá trị `sizes` cho next/image. */
  sizes: string;
  /** Ảnh LCP (hero) → tải sớm. */
  priority?: boolean;
  /** Hiện nhãn dạng chú thích trên ảnh thật. */
  caption?: boolean;
  rounded?: boolean;
  className?: string;
  /** Thuộc tính thêm cho khung (vd. data-reveal). */
  frameProps?: Record<`data-${string}`, string>;
};

/** Khung ảnh tỉ lệ cố định: ảnh thật (next/image, cover) hoặc placeholder gạch chéo. */
export function PhotoFrame({
  image,
  label,
  ratio,
  sizes,
  priority = false,
  caption = false,
  rounded = true,
  className,
  frameProps,
}: PhotoFrameProps) {
  const style = { aspectRatio: ratio } as CSSProperties;
  return (
    <figure
      className={cx(styles.frame, !rounded && styles.square, className)}
      style={style}
      {...frameProps}
    >
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`${styles.img} lb-photo`}
        />
      ) : (
        <div
          className={styles.empty}
          role="img"
          aria-label={`Ảnh minh hoạ: ${label.toLowerCase()}`}
        >
          <span className="lb-label" aria-hidden="true">
            {label}
          </span>
        </div>
      )}
      {image && caption && <figcaption className={styles.caption}>{label}</figcaption>}
    </figure>
  );
}
