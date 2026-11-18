import { z } from 'zod';

import { Heading, Image, Text } from '../common';

/** Lưới thành viên. */
export const TeamGridSection = z.object({
  /** Tiêu đề h2 (ẩn trực quan, giữ thứ bậc heading). */
  heading: Heading,
  members: z
    .array(
      z.object({
        name: Text,
        role: Text,
        /** Năm gia nhập. */
        since: z.number().int().min(1990).max(2100),
        /** null → placeholder "CHÂN DUNG". */
        photo: Image.nullable(),
      }),
    )
    .min(1),
});
