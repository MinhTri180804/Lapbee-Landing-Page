import type { SectionData } from '@/content';

import styles from './StatsSection.module.css';

type StatsSectionProps = { data: SectionData<'home', 'stats'> };

/** Dải số liệu kẻ hairline. */
export function StatsSection({ data }: StatsSectionProps) {
  return (
    <section className="lb-container" aria-labelledby="stats-title">
      <h2 id="stats-title" className="lb-sr-only">
        {data.heading}
      </h2>
      <ul className={styles.stats}>
        {data.items.map((item) => (
          <li key={item.label} data-reveal="">
            <span className={styles.value}>{item.value}</span>
            <span className={styles.label}>{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
