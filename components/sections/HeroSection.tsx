import type { CSSProperties, ReactNode } from 'react';

import type { SectionData } from '@/content';
import { CtaButton } from '@/components/ui/CtaButton';
import { MultilineText } from '@/components/ui/MultilineText';
import { PhotoFrame } from '@/components/ui/PhotoFrame';

import styles from './HeroSection.module.css';

type HeroSectionProps = {
  data: SectionData<'home', 'hero'>;
  /** Dòng trạng thái phía trên tiêu đề (vd. `<OpenStatus />`). */
  eyebrow: ReactNode;
};

const delay = (d: number) => ({ '--d': d }) as CSSProperties;

/** Hero trang chủ — chứa h1 của trang. */
export function HeroSection({ data, eyebrow }: HeroSectionProps) {
  return (
    <section className={`lb-container ${styles.hero}`} aria-labelledby="hero-title">
      <div className="lb-enter">
        <div className={styles.eyebrow} style={delay(0)}>
          {eyebrow}
        </div>
        <h1 id="hero-title" className={styles.title} style={delay(1)}>
          <MultilineText
            text={data.title}
            highlight={data.highlight}
            highlightClassName={styles.highlight}
          />
        </h1>
        <p className={styles.lead} style={delay(2)}>
          {data.lead}
        </p>
        <div className={styles.ctas} style={delay(3)}>
          {data.ctas.map((cta, i) => (
            <CtaButton
              key={cta.href + cta.label}
              cta={cta}
              size="lg"
              fallbackVariant={i === 0 ? 'primary' : 'outline'}
            />
          ))}
        </div>
      </div>

      <div className={styles.media} data-parallax>
        <PhotoFrame
          image={data.photo.image}
          label={data.photo.label}
          ratio="4/5"
          sizes="(max-width: 820px) 100vw, 42vw"
          priority
          className={styles.photo}
        />
        {data.chip && (
          <p className={styles.chip}>
            <span className={styles.chipValue}>{data.chip.value}</span>
            <span className={styles.chipText}>
              <MultilineText text={data.chip.text} />
            </span>
          </p>
        )}
      </div>
    </section>
  );
}
