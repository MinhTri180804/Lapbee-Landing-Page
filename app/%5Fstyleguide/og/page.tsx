import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Wordmark } from '@/components/ui/Wordmark';
import { MultilineText } from '@/components/ui/MultilineText';
import { getPageContent, getSiteSettings } from '@/content';

import styles from './og.module.css';

/**
 * /_styleguide/og — khung 1200×630 để chụp ảnh OG mặc định (`public/og-default.png`) bằng font và
 * màu thật của site: `node scripts/og-image.mjs` (cần dev server đang chạy). Chỉ có ở dev.
 */
export const metadata: Metadata = { title: 'OG image', robots: { index: false, follow: false } };

export default async function OgImagePage() {
  if (process.env.NODE_ENV === 'production') notFound();
  const [{ sections }, site] = await Promise.all([getPageContent('home'), getSiteSettings()]);

  return (
    <div className={styles.canvas} data-og-canvas="">
      <div className={styles.top}>
        <Wordmark size={44} inverse tagline />
      </div>
      <p className={styles.title}>
        <MultilineText
          text={sections.hero.title}
          highlight={sections.hero.highlight}
          highlightClassName={styles.highlight}
        />
      </p>
      <p className={styles.footer}>
        <span>{site.about.split('.')[0]}</span>
        <span className={styles.since}>{site.footer.since}</span>
      </p>
    </div>
  );
}
