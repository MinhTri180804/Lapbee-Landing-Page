import { Archivo, Be_Vietnam_Pro, JetBrains_Mono } from 'next/font/google';

/**
 * next/font tải font lúc build và tự host trong /_next/static — không gọi Google Fonts lúc runtime.
 * Chỉ subset latin + vietnamese, chỉ các weight design system dùng.
 */

/** Display: Archivo variable, trục wdth (design system dùng wdth 112–125). */
export const archivo = Archivo({
  subsets: ['latin', 'vietnamese'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-archivo',
});

/** Body: Be Vietnam Pro (thiết kế cho dấu tiếng Việt). Không có bản variable nên chọn weight cụ thể. */
export const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-be-vietnam',
});

/** Mono: nhãn, ngày, bộ đếm. */
export const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-jetbrains',
  preload: false,
});

export const fontVariables = [archivo.variable, beVietnamPro.variable, jetBrainsMono.variable].join(
  ' ',
);
