export interface InputProps {
  label?: string;
  hint?: string;
  /** Error message; turns border red. */
  error?: string;
  /** Leading Lucide icon. */
  icon?: string;
  /** Render a textarea. */
  multiline?: boolean;
  rows?: number;
  type?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (e: any) => void;
  style?: React.CSSProperties;
}
export declare function Input(props: InputProps): JSX.Element;
