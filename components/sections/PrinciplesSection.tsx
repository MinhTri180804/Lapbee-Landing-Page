import type { SectionData } from '@/content';
import { Icon } from '@/components/ui/Icon';
import { MultilineText } from '@/components/ui/MultilineText';
import { pad2 } from '@/lib/format';

import styles from './PrinciplesSection.module.css';

type PrinciplesSectionProps = { data: SectionData<'team', 'principles'> };

/** Band tối "Cách chúng tôi làm việc": các cam kết, hover tô vàng (chỉ thiết bị có chuột). */
export function PrinciplesSection({ data }: PrinciplesSectionProps) {
  return (
    <section className={styles.band} aria-labelledby="principles-title" data-band="">
      <div className="lb-container">
        <div className={styles.head}>
          <div data-reveal="">
            <p className={`lb-label ${styles.label}`}>{data.label}</p>
            <h2 id="principles-title" className={styles.title}>
              <MultilineText text={data.title} />
            </h2>
          </div>
          <p className={styles.intro} data-reveal="">
            {data.intro}
          </p>
        </div>
        <ul className={styles.grid}>
          {data.items.map((item, i) => (
            <li key={item.title} className={styles.card} data-reveal="">
              <div className={styles.top}>
                <span className={styles.icon}>
                  <Icon name={item.icon} size={28} />
                </span>
                <span className={styles.num} aria-hidden="true">
                  {pad2(i + 1)}
                </span>
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.body}>{item.body}</p>
              <p className={styles.proof}>
                <Icon name="check" size={16} />
                {item.proof}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
