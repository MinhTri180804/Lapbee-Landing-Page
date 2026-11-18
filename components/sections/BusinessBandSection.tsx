import type { SectionData } from '@/content';
import { Button } from '@/components/ui/Button';
import { CtaButton } from '@/components/ui/CtaButton';
import { Icon } from '@/components/ui/Icon';
import { MultilineText } from '@/components/ui/MultilineText';
import { telHref } from '@/components/layout/types';

import styles from './BusinessBandSection.module.css';

type BusinessBandSectionProps = {
  data: SectionData<'home', 'business'>;
  /** Hotline hiển thị khi `showPhone`. */
  phone: string;
};

/** Band tối giới thiệu dịch vụ IT cho doanh nghiệp. */
export function BusinessBandSection({ data, phone }: BusinessBandSectionProps) {
  return (
    <section className={styles.band} aria-labelledby="business-title">
      <div className={`lb-container ${styles.inner}`}>
        <div data-reveal="">
          <p className={`lb-label ${styles.label}`}>{data.label}</p>
          <h2 id="business-title" className={styles.title}>
            <MultilineText text={data.title} />
          </h2>
          <p className={styles.lead}>{data.lead}</p>
          <div className={styles.ctas}>
            <CtaButton cta={data.cta} size="lg" />
            {data.showPhone && (
              <Button size="lg" variant="inverse" iconLeft="phone" href={telHref(phone)}>
                {phone}
              </Button>
            )}
          </div>
        </div>
        <ul className={styles.list}>
          {data.points.map((point) => (
            <li key={point} data-reveal="">
              <Icon name="check" size={18} className={styles.check} />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
