import { z } from 'zod';

import { Heading, IconName, Text } from '../common';

/** Band tối "Cách chúng tôi làm việc": các cam kết. */
export const PrinciplesSection = z.object({
  label: Text,
  title: Heading,
  intro: Text,
  items: z
    .array(
      z.object({
        icon: IconName,
        title: Text,
        body: Text,
        /** Dòng "bằng chứng" có dấu check, vd. "Phiếu báo giá có chữ ký". */
        proof: Text,
      }),
    )
    .min(1)
    .max(6),
});
