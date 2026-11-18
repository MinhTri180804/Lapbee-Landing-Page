import type { SectionData } from '@/content';
import { SectionHead } from '@/components/layout/SectionHead';
import { Card } from '@/components/ui/Card';
import { CtaButton } from '@/components/ui/CtaButton';
import { Icon } from '@/components/ui/Icon';

import styles from './ServicesSection.module.css';

type ServicesSectionProps = { data: SectionData<'home', 'services'> };

/** Lưới dịch vụ. `anchor` là id để CTA "Xem dịch vụ" (#…) cuộn tới. */
export function ServicesSection({ data }: ServicesSectionProps) {
  return (
    <section
      id={data.anchor}
      className={`lb-container lb-section ${styles.section}`}
      aria-labelledby="services-title"
    >
      <SectionHead
        id="services-title"
        title={data.title}
        intro={data.intro}
        aside={data.cta && <CtaButton cta={data.cta} fallbackVariant="ghost" />}
      />
      <ul className={`lb-grid-3 ${styles.grid}`}>
        {data.items.map((item) => (
          <Card key={item.title} as="li" padding={28} className={styles.card}>
            <Icon name={item.icon} size={28} />
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.desc}>{item.description}</p>
            <span className="lb-label">{item.time}</span>
          </Card>
        ))}
      </ul>
    </section>
  );
}
