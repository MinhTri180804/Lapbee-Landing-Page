'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';

import { cx } from '@/components/ui/cx';

import styles from './TimelineSection.module.css';

type RailItem = { year: string; title: string; id: string };

/**
 * Thanh năm dính dưới header. Mỗi năm là link neo (#nam-2012) nên tắt JS vẫn nhảy được tới chương.
 * Có JS: đánh dấu chương đang xem (thêm class cho <article data-chapter>), thanh tiến độ,
 * tự cuộn thanh năm để năm đang xem nằm giữa.
 */
export function TimelineRail({ items }: { items: RailItem[] }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const railRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const chapters = Array.from(document.querySelectorAll<HTMLElement>('[data-chapter]'));
    const wrap = document.querySelector<HTMLElement>('[data-timeline]');
    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.45;
      let current = 0;
      chapters.forEach((el, i) => {
        if (el.getBoundingClientRect().top < line) current = i;
      });
      setActive(current);
      chapters.forEach((el, i) => el.toggleAttribute('data-active', i === current));
      if (wrap) {
        const r = wrap.getBoundingClientRect();
        setProgress(Math.max(0, Math.min(1, (line - r.top) / r.height)));
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

  // Giữ năm đang xem trong tầm nhìn khi thanh năm cuộn ngang được (màn hình hẹp).
  useEffect(() => {
    const rail = railRef.current;
    const tick = rail?.children[active] as HTMLElement | undefined;
    if (rail && tick && rail.scrollWidth > rail.clientWidth) {
      rail.scrollTo({
        left: tick.offsetLeft - rail.clientWidth / 2 + tick.offsetWidth / 2,
        behavior: 'smooth',
      });
    }
  }, [active]);

  const onClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <nav className={styles.railWrap} aria-label="Các năm">
      <div className="lb-container">
        <div className={styles.railInner}>
          <ol className={styles.rail} ref={railRef}>
            {items.map((item, i) => (
              <li key={item.year}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => onClick(e, item.id)}
                  className={cx(
                    styles.tick,
                    i === active && styles.tickOn,
                    i < active && styles.tickDone,
                  )}
                  aria-current={i === active ? 'location' : undefined}
                >
                  <span className={styles.tickYear}>{item.year}</span>
                  <span className={styles.tickTitle}>{item.title}</span>
                </a>
              </li>
            ))}
          </ol>
          <span className={styles.railBar} aria-hidden="true">
            <span style={{ transform: `scaleX(${progress})` }} />
          </span>
        </div>
      </div>
    </nav>
  );
}
