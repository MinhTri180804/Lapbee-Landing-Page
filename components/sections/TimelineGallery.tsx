'use client';

import { useRef, useState } from 'react';

import type { PhotoData } from '@/content';
import { IconButton } from '@/components/ui/IconButton';
import { PhotoFrame } from '@/components/ui/PhotoFrame';
import { pad2 } from '@/lib/format';

import styles from './TimelineSection.module.css';

/**
 * Thư viện ảnh cuộn ngang (≥ 4 ảnh). Tắt JS vẫn vuốt/cuộn được (scroll-snap);
 * có JS thêm nút trước/sau và bộ đếm.
 */
export function TimelineGallery({ photos }: { photos: PhotoData[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  const unit = () => {
    const first = trackRef.current?.querySelector('li');
    return first ? first.getBoundingClientRect().width + 12 : 1;
  };
  const step = (dir: 1 | -1) =>
    trackRef.current?.scrollBy({ left: dir * unit(), behavior: 'smooth' });
  const onScroll = () => {
    if (trackRef.current) setIndex(Math.round(trackRef.current.scrollLeft / unit()));
  };

  return (
    <div className={styles.gallery} role="region" aria-label={`Thư viện ${photos.length} ảnh`}>
      <ul className={styles.galleryTrack} ref={trackRef} onScroll={onScroll} tabIndex={0}>
        {photos.map((p) => (
          <li key={p.label}>
            <PhotoFrame
              image={p.image}
              label={p.label}
              ratio="4/5"
              sizes="(max-width: 820px) 78vw, 28vw"
              caption
            />
          </li>
        ))}
      </ul>
      <div className={styles.galleryControls}>
        <span className="lb-label" style={{ color: 'var(--fg-1)' }} aria-live="polite">
          {pad2(Math.min(index + 1, photos.length))}{' '}
          <span style={{ color: 'var(--fg-3)' }}>/ {pad2(photos.length)} ảnh</span>
        </span>
        <div className={styles.galleryButtons}>
          <IconButton
            icon="arrow-left"
            label="Ảnh trước"
            size="sm"
            onClick={() => step(-1)}
            disabled={index <= 0}
          />
          <IconButton
            icon="arrow-right"
            label="Ảnh sau"
            size="sm"
            onClick={() => step(1)}
            disabled={index >= photos.length - 2}
          />
        </div>
      </div>
    </div>
  );
}
