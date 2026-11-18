import type { SectionData } from '@/content';
import { Card } from '@/components/ui/Card';
import { CtaButton } from '@/components/ui/CtaButton';
import { MultilineText } from '@/components/ui/MultilineText';

import styles from './CtaBannerSection.module.css';

type CtaBannerSectionProps = { data: SectionData<'journey', 'ctaBanner'> };

/** Thẻ vàng kêu gọi hành động (tối đa một lần mỗi trang). */
export function CtaBannerSection({ data }: CtaBannerSectionProps) {
  return (
    <section className="lb-container lb-section" aria-labelledby="cta-banner-title">
      <Card variant="brand" padding="clamp(28px,5vw,56px)" className={styles.card}>
        <h2 id="cta-banner-title" className={styles.title}>
          <MultilineText text={data.title} />
        </h2>
        <CtaButton cta={data.cta} size="lg" fallbackVariant="secondary" />
      </Card>
    </section>
  );
}
