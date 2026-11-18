'use client';

import { useActionState } from 'react';

import type { SectionData } from '@/content';
import type { BookingFormState } from '@/lib/booking';
import { telHref } from '@/components/layout/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Checkbox, Input, RadioGroup, Select } from '@/components/ui/forms';
import { Icon } from '@/components/ui/Icon';

import styles from './BookingSection.module.css';

type BookingFormSectionProps = {
  data: SectionData<'booking', 'form'>;
  /** Server action (app/booking/actions.ts) — truyền từ trang. */
  action: (state: BookingFormState, formData: FormData) => Promise<BookingFormState>;
  initialState: BookingFormState;
  /** Hotline để hướng dẫn khi đặt lịch trực tuyến chưa sẵn sàng. */
  phone: string;
};

/**
 * Form đặt lịch theo design. Dùng phần tử form gốc + server action nên gửi được khi tắt JS;
 * có JS thì không tải lại trang và nút hiện trạng thái đang gửi.
 */
export function BookingFormSection({ data, action, initialState, phone }: BookingFormSectionProps) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const errors = state.status === 'invalid' ? state.errors : {};
  const values = 'values' in state ? state.values : {};
  // Đổi key khi có kết quả mới để các ô (uncontrolled) nhận lại giá trị đã nhập.
  const formKey = `${state.status}:${JSON.stringify(values)}`;

  return (
    <Card padding="clamp(20px,4vw,36px)" className={styles.formCard}>
      <h2 id="booking-form-title" className="lb-sr-only">
        {data.submitLabel}
      </h2>
      <form
        key={formKey}
        action={formAction}
        className={styles.form}
        aria-labelledby="booking-form-title"
        noValidate
      >
        <RadioGroup
          name="customerType"
          legend={data.customerTypeLegend}
          hideLegend
          options={data.customerTypes}
          defaultValue={values.customerType ?? data.customerTypes[0]?.value}
          direction="row"
          required
        />
        <div className="lb-grid-2">
          <Input
            label={data.nameLabel}
            name="name"
            placeholder={data.namePlaceholder}
            autoComplete="name"
            required
            defaultValue={values.name}
            error={errors.name}
          />
          <Input
            label={data.phoneLabel}
            name="phone"
            icon="phone"
            type="tel"
            inputMode="tel"
            placeholder={data.phonePlaceholder}
            autoComplete="tel"
            required
            defaultValue={values.phone}
            error={errors.phone}
          />
        </div>
        <Select
          label={data.deviceLabel}
          name="device"
          placeholder={data.devicePlaceholder}
          options={data.devices}
          required
          defaultValue={values.device || ''}
          error={errors.device}
        />
        <Input
          label={data.descriptionLabel}
          name="description"
          multiline
          rows={4}
          placeholder={data.descriptionPlaceholder}
          required
          defaultValue={values.description}
          error={errors.description}
        />
        <Checkbox
          name="needVatInvoice"
          label={data.vatLabel}
          defaultChecked={values.needVatInvoice === 'on'}
        />

        {state.status === 'not_connected' && (
          <div className={styles.notice} role="status">
            <Icon name="phone-call" size={20} />
            <p>
              {data.notConnectedMessage}{' '}
              <a href={telHref(phone)} className={styles.noticeLink}>
                {phone}
              </a>
            </p>
          </div>
        )}

        <div>
          <Button
            type="submit"
            size="lg"
            iconRight="arrow-right"
            disabled={pending}
            aria-busy={pending}
          >
            {data.submitLabel}
          </Button>
        </div>
      </form>
    </Card>
  );
}
