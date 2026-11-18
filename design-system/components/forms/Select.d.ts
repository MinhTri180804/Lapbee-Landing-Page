export interface SelectOption { value: string; label: string; }
export interface SelectProps {
  label?: string;
  hint?: string;
  error?: string;
  options?: Array<string | SelectOption>;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (e: any) => void;
  style?: React.CSSProperties;
}
export declare function Select(props: SelectProps): JSX.Element;
