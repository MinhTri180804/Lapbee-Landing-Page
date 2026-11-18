export interface TagProps {
  selected?: boolean;
  /** Optional mono counter after the label. */
  count?: number;
  onClick?: (e: any) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Tag(props: TagProps): JSX.Element;
