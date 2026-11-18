import { z } from 'zod';

import { Text } from '../common';

/** Dải số liệu kẻ hairline (không dùng card). */
export const StatsSection = z.object({
  /** Tiêu đề cho trình đọc màn hình (ẩn), vd. "LAPBEE qua các con số". */
  heading: Text,
  items: z
    .array(z.object({ value: Text, label: Text }))
    .min(2)
    .max(6),
});
