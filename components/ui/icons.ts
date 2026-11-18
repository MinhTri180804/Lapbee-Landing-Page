import {
  Apple,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  ChevronDown,
  Clock,
  Cpu,
  HardDrive,
  Laptop,
  Link,
  MapPin,
  MessageSquareText,
  Monitor,
  Moon,
  Phone,
  PhoneCall,
  ReceiptText,
  RefreshCw,
  ScanSearch,
  Search,
  ShieldCheck,
  Smartphone,
  Sun,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

/**
 * Registry icon dùng trong site (tên theo Lucide, kebab-case như design system).
 * Chỉ icon có trong đây mới được dùng — schema nội dung (GĐ3) giới hạn theo `ICON_NAMES`.
 * Thêm icon: import từ lucide-react rồi thêm một dòng.
 */
export const ICONS = {
  apple: Apple,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up-right': ArrowUpRight,
  'building-2': Building2,
  check: Check,
  'chevron-down': ChevronDown,
  clock: Clock,
  cpu: Cpu,
  'hard-drive': HardDrive,
  laptop: Laptop,
  link: Link,
  'map-pin': MapPin,
  'message-square-text': MessageSquareText,
  monitor: Monitor,
  moon: Moon,
  phone: Phone,
  'phone-call': PhoneCall,
  'receipt-text': ReceiptText,
  'refresh-cw': RefreshCw,
  'scan-search': ScanSearch,
  search: Search,
  'shield-check': ShieldCheck,
  smartphone: Smartphone,
  sun: Sun,
  wrench: Wrench,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

export const ICON_NAMES = Object.keys(ICONS) as [IconName, ...IconName[]];
