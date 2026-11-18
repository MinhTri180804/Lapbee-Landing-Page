import type { PhotoData, SectionData } from '@/content';
import { Badge } from '@/components/ui/Badge';
import { cx } from '@/components/ui/cx';
import { PhotoFrame } from '@/components/ui/PhotoFrame';
import { pad2 } from '@/lib/format';

import { TimelineGallery } from './TimelineGallery';
import { TimelineRail } from './TimelineRail';
import styles from './TimelineSection.module.css';

type TimelineSectionProps = { data: SectionData<'journey', 'timeline'> };
type Chapter = SectionData<'journey', 'timeline'>['chapters'][number];

/** id neo của một chương (link từ thanh năm, chạy được cả khi tắt JS). */
export const chapterId = (year: string) => `nam-${year}`;

const SIZES_HALF = '(max-width: 820px) 100vw, 40vw';

function PhotoList({ photos, layout }: { photos: PhotoData[]; layout: 'n2' | 'n3' }) {
  const ratios = layout === 'n2' ? ['4/5', '4/5'] : ['4/5', '4/3', '4/3'];
  return (
    <ul className={cx(styles.photos, styles[layout])}>
      {photos.map((p, i) => (
        <li key={p.label}>
          <PhotoFrame
            image={p.image}
            label={p.label}
            ratio={ratios[i] ?? '4/3'}
            sizes={SIZES_HALF}
            caption
            className={styles.photo}
            frameProps={{ 'data-reveal': 'clip' }}
          />
        </li>
      ))}
    </ul>
  );
}

/** Ảnh/trích dẫn của một chương: 0 ảnh → trích dẫn; 1 → ảnh lớn; 2, 3 → lưới; ≥ 4 → thư viện cuộn ngang. */
function ChapterMedia({ chapter }: { chapter: Chapter }) {
  const photos = chapter.photos;
  if (photos.length === 0) {
    if (!chapter.quote) return null;
    return (
      <figure className={styles.quote} data-reveal="">
        <span className={styles.qmark} aria-hidden="true">
          “
        </span>
        <blockquote>{chapter.quote.text}</blockquote>
        <figcaption>
          <span className={styles.quoteBy}>{chapter.quote.author}</span>
          <span className="lb-label">
            {chapter.quote.role} · {chapter.year}
          </span>
        </figcaption>
      </figure>
    );
  }
  if (photos.length === 1) {
    const p = photos[0]!;
    return (
      <PhotoFrame
        image={p.image}
        label={p.label}
        ratio="16/10"
        sizes="(max-width: 820px) 100vw, 55vw"
        caption
        frameProps={{ 'data-reveal': 'clip' }}
      />
    );
  }
  if (photos.length <= 3)
    return <PhotoList photos={photos} layout={photos.length === 2 ? 'n2' : 'n3'} />;
  return <TimelineGallery photos={photos} />;
}

/** Dòng thời gian Hành trình: thanh năm dính trên cùng + các chương. */
export function TimelineSection({ data }: TimelineSectionProps) {
  const chapters = data.chapters;
  const last = chapters.length - 1;
  return (
    <section aria-labelledby="timeline-title">
      <h2 id="timeline-title" className="lb-sr-only">
        {data.heading}
      </h2>
      <TimelineRail
        items={chapters.map((c) => ({ year: c.year, title: c.title, id: chapterId(c.year) }))}
      />
      <div className="lb-container" data-timeline>
        {chapters.map((c, i) => {
          const textOnly = c.photos.length === 0;
          return (
            <article
              key={c.year}
              id={chapterId(c.year)}
              data-chapter={i}
              className={cx(
                styles.chapter,
                i % 2 === 1 && styles.flip,
                textOnly && styles.textOnly,
              )}
              aria-labelledby={`${chapterId(c.year)}-title`}
            >
              <div className={styles.yearCol}>
                <div className={styles.year} aria-hidden="true">
                  {c.year}
                </div>
              </div>
              <div className={styles.body}>
                <ChapterMedia chapter={c} />
                <div className={styles.text}>
                  <div className={styles.labels} data-reveal="">
                    <span className="lb-label" style={{ color: 'var(--fg-1)' }}>
                      Chương {pad2(i + 1)} · {c.year}
                    </span>
                    {i === 0 && <Badge tone="brand">Khởi đầu</Badge>}
                    {i === last && <Badge tone="ink">Hiện tại</Badge>}
                  </div>
                  <h3 id={`${chapterId(c.year)}-title`} className={styles.title} data-reveal="">
                    {c.title}
                  </h3>
                  <p className={styles.chapterBody} data-reveal="">
                    {c.body}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
