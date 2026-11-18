import type { ReactNode } from 'react';

import styles from './SectionHead.module.css';

export type SectionHeadProps = {
  title: string;
  intro?: string;
  /** Nội dung bên phải (thường là một Button). */
  aside?: ReactNode;
  /** id cho heading — dùng làm aria-labelledby của section. */
  id?: string;
};

/** Tiêu đề section: kẻ 1px ink phía trên, h2 + đoạn giới thiệu, CTA bên phải. */
export function SectionHead({ title, intro, aside, id }: SectionHeadProps) {
  return (
    <div className={styles.head}>
      <div>
        <h2 id={id} className={styles.title}>
          {title}
        </h2>
        {intro && <p className={styles.intro}>{intro}</p>}
      </div>
      {aside && <div className={styles.aside}>{aside}</div>}
    </div>
  );
}
