import { useId } from 'react';
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

import { cx } from './cx';
import styles from './forms.module.css';
import { Icon } from './Icon';
import type { IconName } from './icons';

/**
 * Các ô form dùng phần tử HTML gốc (input/select/textarea), không cần JS:
 * gửi form được khi tắt JS, bàn phím và trình đọc màn hình hoạt động mặc định.
 * Trạng thái focus/checked vẽ bằng CSS.
 */

type FieldProps = {
  label?: string;
  hint?: string;
  /** Thông báo lỗi; viền đỏ + aria-invalid. */
  error?: string;
};

function FieldShell({
  id,
  label,
  hint,
  error,
  className,
  children,
}: FieldProps & { id: string; className?: string; children: ReactNode }) {
  return (
    <div className={cx(styles.field, className)}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      {children}
      {error ? (
        <span id={`${id}-msg`} className={styles.error} role="alert">
          {error}
        </span>
      ) : hint ? (
        <span id={`${id}-msg`} className={styles.hint}>
          {hint}
        </span>
      ) : null}
    </div>
  );
}

type InputBaseProps = FieldProps & {
  /** Icon đứng đầu ô (Lucide). */
  icon?: IconName;
  className?: string;
};

export type InputProps = InputBaseProps &
  (
    | ({ multiline?: false } & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>)
    | ({ multiline: true } & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>)
  );

/** Ô nhập một dòng, hoặc nhiều dòng với `multiline`. */
export function Input(props: InputProps) {
  const autoId = useId();
  const { label, hint, error, icon, className, ...rest } = props;
  const id = rest.id ?? autoId;
  const describedBy = error || hint ? `${id}-msg` : undefined;
  const a11y = { id, 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy };

  const boxClass = cx(
    styles.box,
    props.multiline && styles.boxMultiline,
    error && styles.boxInvalid,
    rest.disabled && styles.boxDisabled,
  );

  let control: ReactNode;
  if (rest.multiline) {
    const { multiline: _m, rows = 4, ...textareaProps } = rest;
    control = <textarea rows={rows} {...textareaProps} {...a11y} className={styles.control} />;
  } else {
    const { multiline: _m, type = 'text', ...inputProps } = rest;
    control = <input type={type} {...inputProps} {...a11y} className={styles.control} />;
  }

  return (
    <FieldShell id={id} label={label} hint={hint} error={error} className={className}>
      <span className={boxClass}>
        {icon && <Icon name={icon} size={18} className={styles.boxIcon} />}
        {control}
      </span>
    </FieldShell>
  );
}

export type SelectOption = { value: string; label: string };

export type SelectProps = FieldProps & {
  options: ReadonlyArray<string | SelectOption>;
  /** Dòng đầu không chọn được, hiển thị khi chưa chọn. */
  placeholder?: string;
  className?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className' | 'children'>;

export function Select({
  label,
  hint,
  error,
  options,
  placeholder,
  className,
  defaultValue,
  ...rest
}: SelectProps) {
  const autoId = useId();
  const id = rest.id ?? autoId;
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} className={className}>
      <span className={styles.selectWrap}>
        <select
          {...rest}
          id={id}
          defaultValue={defaultValue ?? (placeholder && rest.value === undefined ? '' : undefined)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? `${id}-msg` : undefined}
          className={styles.select}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => {
            const opt = typeof o === 'string' ? { value: o, label: o } : o;
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
        <Icon name="chevron-down" size={18} className={styles.selectIcon} />
      </span>
    </FieldShell>
  );
}

export type CheckboxProps = {
  label: ReactNode;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'>;

export function Checkbox({ label, className, ...rest }: CheckboxProps) {
  return (
    <label className={cx(styles.choice, className)}>
      <input type="checkbox" {...rest} className={styles.choiceInput} />
      <span className={styles.checkbox} aria-hidden="true">
        <Icon name="check" size={14} />
      </span>
      {label}
    </label>
  );
}

export type RadioGroupProps = {
  /** Tên field khi gửi form. */
  name: string;
  /** Nhãn nhóm (legend). Ẩn khi `hideLegend`. */
  legend: string;
  hideLegend?: boolean;
  options: ReadonlyArray<string | SelectOption>;
  defaultValue?: string;
  direction?: 'row' | 'column';
  required?: boolean;
  className?: string;
};

/** Nhóm radio dùng <fieldset>/<legend> chuẩn. */
export function RadioGroup({
  name,
  legend,
  hideLegend = false,
  options,
  defaultValue,
  direction = 'column',
  required,
  className,
}: RadioGroupProps) {
  return (
    <fieldset className={cx(styles.radioGroup, className)}>
      <legend className={hideLegend ? 'lb-sr-only' : styles.label}>{legend}</legend>
      <div className={cx(styles.radioOptions, direction === 'row' && styles.radioRow)}>
        {options.map((o) => {
          const opt = typeof o === 'string' ? { value: o, label: o } : o;
          return (
            <label key={opt.value} className={styles.choice}>
              <input
                type="radio"
                name={name}
                value={opt.value}
                defaultChecked={defaultValue === opt.value}
                required={required}
                className={styles.choiceInput}
              />
              <span className={styles.radio} aria-hidden="true" />
              {opt.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
