/** Định dạng hiển thị dùng chung (chạy được cả server và client). */

const TIME_ZONE = 'Asia/Ho_Chi_Minh';

/** "2026-11-12T08:00:00+07:00" → "12.11.2026" (theo giờ Việt Nam, như design system). */
export function formatDate(iso: string): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TIME_ZONE,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).formatToParts(new Date(iso));
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return `${get('day')}.${get('month')}.${get('year')}`;
}

/** Giờ hiện tại ở Việt Nam dạng "HH:mm" và thứ (tiếng Anh, khớp schema openingHours). */
export function nowInVietnam(date = new Date()): { time: string; day: string } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    weekday: 'long',
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return { time: `${get('hour')}:${get('minute')}`, day: get('weekday') };
}

/** Số có 2 chữ số: 1 → "01". */
export const pad2 = (n: number) => String(n).padStart(2, '0');
