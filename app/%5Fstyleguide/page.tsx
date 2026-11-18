import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { CSSProperties, ReactNode } from 'react';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHead } from '@/components/layout/SectionHead';
import type { ContactInfo, NavItem } from '@/components/layout/types';
import { Badge, type BadgeTone } from '@/components/ui/Badge';
import { Button, type ButtonVariant } from '@/components/ui/Button';
import { Card, CardLink } from '@/components/ui/Card';
import { Checkbox, Input, RadioGroup, Select } from '@/components/ui/forms';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { ICON_NAMES } from '@/components/ui/icons';
import { Pagination } from '@/components/ui/Pagination';
import { Placeholder } from '@/components/ui/Placeholder';
import { Tag } from '@/components/ui/Tag';
import { Wordmark } from '@/components/ui/Wordmark';

import styles from './styleguide.module.css';

/**
 * /_styleguide — trang kiểm tra design system trong code. Chỉ có ở môi trường dev:
 * build production trả 404. Thư mục tên `%5Fstyleguide` vì thư mục bắt đầu bằng `_` là private trong App Router.
 * Dữ liệu dưới đây chỉ để minh hoạ component, không phải nội dung site.
 */

export const metadata: Metadata = {
  title: 'Styleguide',
  robots: { index: false, follow: false },
};

const DEMO_NAV: NavItem[] = [
  { href: '/', label: 'Trang chủ', description: 'Dịch vụ & quy trình' },
  { href: '/doi-ngu', label: 'Đội ngũ', description: 'Những người sửa máy cho bạn' },
  { href: '/hanh-trinh', label: 'Hành trình', description: 'Từ LAPPY 2012 đến nay' },
  { href: '/bai-dang', label: 'Bài đăng', description: 'Mẹo, tin tức, hướng dẫn' },
];
const DEMO_CONTACT: ContactInfo = {
  phone: '1900 0000',
  address: '123 Đường Mẫu, Quận 1, TP. Hồ Chí Minh',
  mapUrl: 'https://maps.google.com/?q=LAPBEE',
  hours: '08:00 – 20:00, Thứ 2 – Chủ nhật',
};

const SWATCHES: Array<{ group: string; vars: string[] }> = [
  {
    group: 'Bee (brand)',
    vars: ['bee-50', 'bee-100', 'bee-200', 'bee-300', 'bee-500', 'bee-600', 'bee-700', 'bee-800'],
  },
  {
    group: 'Ink',
    vars: [
      'ink-50',
      'ink-100',
      'ink-200',
      'ink-300',
      'ink-400',
      'ink-500',
      'ink-600',
      'ink-700',
      'ink-800',
      'ink-950',
    ],
  },
  {
    group: 'Bề mặt',
    vars: ['surface-page', 'surface-card', 'surface-sunken', 'surface-muted', 'surface-inverse'],
  },
  {
    group: 'Trạng thái',
    vars: ['success', 'success-soft', 'danger', 'danger-soft', 'info', 'info-soft', 'warning'],
  },
  {
    group: 'Band (luôn tối)',
    vars: ['band-bg', 'band-fg', 'band-fg-2', 'band-border', 'band-accent'],
  },
];

const TYPE_ROLES = [
  ['--type-display', 'Máy hỏng, đã có LAPBEE.', 'display'],
  ['--type-h1', 'Từ LAPPY đến LAPBEE.', 'display'],
  ['--type-h2', 'Bốn bước, không bất ngờ.', 'display'],
  ['--type-h3', 'Sửa laptop', 'display'],
  ['--type-lead', 'Trung tâm sửa chữa thiết bị công nghệ và máy tính uy tín.', 'body'],
  ['--type-body', 'Kỹ thuật viên chẩn đoán và báo giá trước khi làm.', 'body'],
  ['--type-small', 'Phiếu bảo hành bằng văn bản, ghi rõ linh kiện và thời hạn.', 'body'],
  ['--type-label', '12.11.2026 · 4 phút đọc', 'mono'],
] as const;

const SPACES = ['1', '2', '3', '4', '6', '8', '12', '16', '24', '32'];
const RADII = ['xs', 'sm', 'md', 'lg', 'xl', 'pill'];
const SHADOWS = ['1', '2', '3'];
const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost'];
const TONES: BadgeTone[] = ['neutral', 'brand', 'ink', 'success', 'danger', 'info', 'warning'];

function Block({
  title,
  children,
  band = false,
}: {
  title: string;
  children: ReactNode;
  band?: boolean;
}) {
  return (
    <section className={band ? styles.band : styles.block}>
      <div className="lb-container">
        <h2 className={styles.blockTitle}>{title}</h2>
        {children}
      </div>
    </section>
  );
}

const cssVar = (
  name: string,
  prop: 'background' | 'fontSize' | 'width' | 'borderRadius' | 'boxShadow',
) => ({ [prop]: `var(--${name})` }) as CSSProperties;

export default function StyleguidePage() {
  if (process.env.NODE_ENV === 'production') notFound();

  return (
    <>
      <Header
        nav={DEMO_NAV}
        contact={DEMO_CONTACT}
        cta={{ label: 'Đặt lịch sửa', href: '/dat-lich' }}
      />
      <main id="main">
        <PageHero
          eyebrow="Design system · dev"
          title="LAPBEE styleguide"
          lead="Tokens và component nền của website, port từ design-system/. Chỉ có ở môi trường dev."
        />

        <Block title="Màu">
          {SWATCHES.map(({ group, vars }) => (
            <div key={group} className={styles.swatchGroup}>
              <h3 className="lb-label">{group}</h3>
              <ul className={styles.swatches}>
                {vars.map((v) => (
                  <li key={v}>
                    <span className={styles.swatch} style={cssVar(v, 'background')} />
                    <code>--{v}</code>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Block>

        <Block title="Chữ">
          <ul className={styles.typeList}>
            {TYPE_ROLES.map(([token, sample, family]) => (
              <li key={token}>
                <code className="lb-label">{token}</code>
                <span
                  className={styles[`type-${family}`]}
                  style={{ fontSize: `var(${token})` } as CSSProperties}
                >
                  {sample}
                </span>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Khoảng cách · bo góc · đổ bóng">
          <div className={styles.row}>
            {SPACES.map((s) => (
              <div key={s} className={styles.spaceItem}>
                <span className={styles.spaceBar} style={cssVar(`space-${s}`, 'width')} />
                <code className="lb-label">space-{s}</code>
              </div>
            ))}
          </div>
          <div className={styles.row}>
            {RADII.map((r) => (
              <div
                key={r}
                className={styles.radiusItem}
                style={cssVar(`radius-${r}`, 'borderRadius')}
              >
                <code className="lb-label">{r}</code>
              </div>
            ))}
            {SHADOWS.map((s) => (
              <div key={s} className={styles.shadowItem} style={cssVar(`shadow-${s}`, 'boxShadow')}>
                <code className="lb-label">shadow-{s}</code>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Logo">
          <div className={styles.row}>
            <Wordmark size={24} />
            <Wordmark size={32} tagline />
            <Wordmark size={24} mark={false} />
            <Wordmark size={40} markOnly />
          </div>
        </Block>

        <Block title="Nút">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <div key={size} className={styles.row}>
              {VARIANTS.map((variant) => (
                <Button key={variant} variant={variant} size={size} iconRight="arrow-right">
                  {variant}
                </Button>
              ))}
              <Button size={size} disabled>
                disabled
              </Button>
            </div>
          ))}
          <div className={styles.row}>
            <Button href="/dat-lich" iconRight="arrow-right">
              Link nội bộ
            </Button>
            <Button variant="outline" iconLeft="phone" href="tel:19000000">
              Gọi ngay
            </Button>
            <IconButton icon="phone" label="Gọi" variant="primary" />
            <IconButton icon="search" label="Tìm" />
            <IconButton icon="link" label="Sao chép liên kết" variant="ghost" size="sm" />
            <IconButton icon="arrow-right" label="Tiếp" variant="secondary" size="lg" />
          </div>
        </Block>

        <Block title="Trên band tối" band>
          <div className={styles.row}>
            <Button size="lg">Liên hệ tư vấn</Button>
            <Button size="lg" variant="inverse" iconLeft="phone">
              1900 0000
            </Button>
            <IconButton icon="arrow-left" label="Trước" variant="inverse" />
            <Wordmark size={24} inverse tagline />
          </div>
        </Block>

        <Block title="Badge · Tag">
          <div className={styles.row}>
            {TONES.map((tone) => (
              <Badge key={tone} tone={tone}>
                {tone}
              </Badge>
            ))}
            <Badge tone="success" dot>
              Đang nhận máy
            </Badge>
          </div>
          <div className={styles.row}>
            <Tag href="/_styleguide" selected count={16}>
              Tất cả
            </Tag>
            <Tag href="/_styleguide" count={5}>
              Mẹo hay
            </Tag>
            <Tag href="/_styleguide" count={4}>
              Tin tức
            </Tag>
          </div>
        </Block>

        <Block title="Thẻ">
          <div className="lb-grid-3">
            <Card interactive padding={0} as="article">
              <Placeholder label="ẢNH BÀI VIẾT" ratio="3/2" rounded={false} />
              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <Badge>Hướng dẫn</Badge>
                  <span className="lb-label">12.11.2026</span>
                </div>
                <h3 className={styles.cardTitle}>
                  <CardLink href="/_styleguide">5 dấu hiệu pin laptop cần được thay</CardLink>
                </h3>
                <p className={styles.muted}>
                  Máy sập nguồn khi còn 20%, pin phồng hay sạc không vào.
                </p>
              </div>
            </Card>
            <Card variant="sunken" padding={28}>
              <Icon name="laptop" size={28} />
              <h3 className={styles.cardTitle}>Sunken</h3>
              <p className={styles.muted}>Nền nhạt, không viền.</p>
            </Card>
            <Card variant="ink" padding={28}>
              <Icon name="shield-check" size={28} />
              <h3 className={styles.cardTitle}>Ink</h3>
              <p>Nền tối, chữ sáng.</p>
            </Card>
          </div>
          <Card variant="brand" padding="clamp(28px,5vw,56px)" className={styles.brandCard}>
            <h3 className={styles.cardTitle}>Chương tiếp theo bắt đầu với chiếc máy của bạn.</h3>
            <Button variant="secondary" size="lg" iconRight="arrow-right" href="/dat-lich">
              Đặt lịch sửa
            </Button>
          </Card>
        </Block>

        <Block title="Icon">
          <ul className={styles.icons}>
            {ICON_NAMES.map((name) => (
              <li key={name}>
                <Icon name={name} size={24} />
                <code>{name}</code>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Form">
          <form className={styles.form} action="/_styleguide" method="get">
            <RadioGroup
              name="customerType"
              legend="Bạn là"
              options={['Cá nhân', 'Doanh nghiệp']}
              defaultValue="Cá nhân"
              direction="row"
            />
            <div className="lb-grid-2">
              <Input label="Họ và tên" name="name" placeholder="Nguyễn Văn A" autoComplete="name" />
              <Input
                label="Số điện thoại"
                name="phone"
                icon="phone"
                type="tel"
                placeholder="09xx xxx xxx"
                error="Số điện thoại chưa đúng định dạng"
              />
            </div>
            <Select
              label="Thiết bị"
              name="device"
              placeholder="Chọn thiết bị"
              options={['Laptop', 'MacBook', 'PC', 'Máy tính bảng', 'Điện thoại', 'Khác']}
            />
            <Input
              label="Mô tả lỗi"
              name="description"
              multiline
              rows={4}
              placeholder="Máy không lên nguồn, màn hình sọc…"
              hint="Càng chi tiết, báo giá càng chính xác."
            />
            <Checkbox name="vat" label="Tôi cần xuất hoá đơn VAT" />
            <Input label="Bị khoá" name="disabled" disabled defaultValue="Không sửa được" />
            <div>
              <Button type="submit" size="lg" iconRight="arrow-right">
                Gửi yêu cầu
              </Button>
            </div>
          </form>
        </Block>

        <Block title="Phân trang">
          <Pagination page={4} total={9} hrefFor={(p) => `/_styleguide?trang=${p}`} />
          <Pagination
            page={1}
            total={3}
            hrefFor={(p) => `/_styleguide?trang=${p}`}
            className={styles.spaced}
          />
        </Block>

        <Block title="Placeholder ảnh">
          <div className="lb-grid-3">
            <Placeholder label="ẢNH XƯỞNG SỬA CHỮA" ratio="4/5" />
            <Placeholder label="CHÂN DUNG" ratio="4/5" />
            <Placeholder ratio="4/5" />
          </div>
        </Block>

        <section className="lb-container lb-section">
          <SectionHead
            title="Dịch vụ"
            intro="Một nơi cho toàn bộ thiết bị công nghệ của bạn và doanh nghiệp."
            aside={
              <Button variant="ghost" iconRight="arrow-up-right" href="/dat-lich">
                Nhận báo giá
              </Button>
            }
          />
          <p className={styles.muted}>
            SectionHead: kẻ ink phía trên, h2, đoạn giới thiệu, CTA bên phải.
          </p>
        </section>
      </main>
      <Footer
        nav={DEMO_NAV}
        contact={DEMO_CONTACT}
        about="Trung tâm sửa chữa thiết bị công nghệ và máy tính. Thành lập năm 2012 với tên LAPPY."
        copyright="© 2026 Công ty TNHH LAPBEE"
        since="2012 → 2026"
      />
    </>
  );
}
