import type { SectionData } from '@/content';
import { PhotoFrame } from '@/components/ui/PhotoFrame';

import styles from './TeamGridSection.module.css';

type TeamGridSectionProps = { data: SectionData<'team', 'members'> };

/** Lưới thành viên: chân dung, tên, năm gia nhập, vai trò. */
export function TeamGridSection({ data }: TeamGridSectionProps) {
  return (
    <section className="lb-container" aria-labelledby="members-title">
      <h2 id="members-title" className="lb-sr-only">
        {data.heading}
      </h2>
      <ul className={`lb-grid-4 ${styles.grid}`}>
        {data.members.map((m) => (
          <li key={m.name} className={styles.member} data-reveal="">
            <PhotoFrame
              image={m.photo}
              label="CHÂN DUNG"
              ratio="4/5"
              sizes="(max-width: 560px) 50vw, (max-width: 1024px) 33vw, 300px"
            />
            <div className={styles.nameRow}>
              <h3 className={styles.name}>{m.name}</h3>
              <span className="lb-label" title={`Gia nhập năm ${m.since}`}>
                {m.since}
              </span>
            </div>
            <p className={styles.role}>{m.role}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
