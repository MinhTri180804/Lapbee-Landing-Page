import type { CSSProperties } from 'react';

import styles from './PageHero.module.css';

export type PageHeroProps = {
  /** Nhãn mono phía trên, vd. "Đội ngũ". */
  eyebrow: string;
  /** Tiêu đề trang — là thẻ h1 duy nhất của trang. */
  title: string;
  lead?: string;
};

const delay = (d: number) => ({ '--d': d }) as CSSProperties;

/** Phần mở đầu của các trang con (Đội ngũ, Hành trình, Bài đăng, Đặt lịch). */
export function PageHero({ eyebrow, title, lead }: PageHeroProps) {
  return (
    <section className={`lb-container ${styles.hero}`}>
      <div className="lb-enter">
        <p className={`lb-label ${styles.eyebrow}`} style={delay(0)}>
          {eyebrow}
        </p>
        <h1 className={styles.title} style={delay(1)}>
          {title}
        </h1>
        {lead && (
          <p className={styles.lead} style={delay(2)}>
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
