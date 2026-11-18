'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

import type { SectionData } from '@/content';
import { CtaButton } from '@/components/ui/CtaButton';
import { cx } from '@/components/ui/cx';
import { Icon } from '@/components/ui/Icon';
import { MultilineText } from '@/components/ui/MultilineText';
import { pad2 } from '@/lib/format';

import styles from './ProcessSection.module.css';

type ProcessSectionProps = { data: SectionData<'home', 'process'> };

/**
 * Quy trình các bước. Client component vì bước "đang xem" và thanh tiến độ đi theo vị trí cuộn.
 * HTML server render đủ nội dung (bước 1 active) — tắt JS vẫn đọc được toàn bộ.
 */
export function ProcessSection({ data }: ProcessSectionProps) {
  const { steps } = data;
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const mid = window.innerHeight * 0.5;
      let best = 0;
      let bestDistance = Number.POSITIVE_INFINITY;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestDistance) {
          bestDistance = d;
          best = i;
        }
      });
      setActive(best);
      const list = listRef.current;
      if (list) {
        const r = list.getBoundingClientRect();
        setProgress(Math.max(0, Math.min(1, (mid - r.top) / r.height)));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="lb-container lb-section" aria-labelledby="process-title">
      <div className={styles.process}>
        <div>
          <div className={styles.sticky} data-reveal="">
            <p className="lb-label" style={{ color: 'var(--fg-1)' }}>
              {data.label}
            </p>
            <h2 id="process-title" className={styles.title}>
              <MultilineText text={data.title} />
            </h2>
            <p className={styles.intro}>{data.intro}</p>
            <div className={styles.big} aria-hidden="true">
              <span key={active} className={styles.bigNum}>
                {pad2(active + 1)}
              </span>
              <span className={styles.bigOf}>/ {pad2(steps.length)}</span>
            </div>
            <div className={styles.bar} aria-hidden="true">
              <span style={{ transform: `scaleX(${progress})` }} />
            </div>
            <div className={styles.cta}>
              <CtaButton cta={data.cta} />
            </div>
          </div>
        </div>

        <ol className={styles.list} ref={listRef}>
          <span className={styles.rail} aria-hidden="true">
            <span style={{ transform: `scaleY(${progress})` }} />
          </span>
          {steps.map((step, i) => {
            const on = i === active;
            const done = i < active;
            return (
              <li
                key={step.title}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={cx(styles.item, on && styles.on, done && styles.done)}
                aria-current={on ? 'step' : undefined}
                style={{ '--i': i } as CSSProperties}
              >
                <span className={styles.dot} aria-hidden="true">
                  {done ? <Icon name="check" size={16} /> : i + 1}
                </span>
                <div className={styles.card}>
                  <div className={styles.cardHead}>
                    <span className="lb-label">Bước {pad2(i + 1)}</span>
                    <span className={styles.meta}>{step.meta}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <span className={styles.icon}>
                      <Icon name={step.icon} size={26} />
                    </span>
                    <div>
                      <h3 className={styles.stepTitle}>{step.title}</h3>
                      <p className={styles.stepBody}>{step.body}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
