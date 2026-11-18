'use client';

import { useEffect, useState } from 'react';

import { cx } from '@/components/ui/cx';
import { nowInVietnam } from '@/lib/format';

import styles from './OpenStatus.module.css';

export type OpeningHours = {
  /** Thứ trong tuần (tiếng Anh, vd. "Monday"). */
  days: readonly string[];
  /** "HH:mm" */
  opens: string;
  closes: string;
};

type OpenStatusProps = {
  hours: OpeningHours;
  /** Hiển thị giờ, vd. "08:00 – 20:00". */
  hoursLabel: string;
  className?: string;
};

type Status = 'unknown' | 'open' | 'closed';

function computeStatus(hours: OpeningHours): Exclude<Status, 'unknown'> {
  const { time, day } = nowInVietnam();
  return hours.days.includes(day) && time >= hours.opens && time < hours.closes ? 'open' : 'closed';
}

/**
 * "Đang nhận máy · 08:00 – 20:00" theo giờ Việt Nam.
 * HTML tĩnh hiển thị "Giờ mở cửa" (đúng mọi lúc); trình duyệt cập nhật trạng thái thật sau khi tải
 * và mỗi phút — trang vẫn là SSG, không phụ thuộc giờ lúc build.
 */
export function OpenStatus({ hours, hoursLabel, className }: OpenStatusProps) {
  const [status, setStatus] = useState<Status>('unknown');

  useEffect(() => {
    const update = () => setStatus(computeStatus(hours));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, [hours]);

  const label =
    status === 'open' ? 'Đang nhận máy' : status === 'closed' ? 'Đã đóng cửa' : 'Giờ mở cửa';
  return (
    <p className={cx('lb-label', styles.status, className)}>
      <span className={cx(styles.dot, status === 'open' && styles.live)} aria-hidden="true" />
      <span>
        {label} · {hoursLabel}
      </span>
    </p>
  );
}
