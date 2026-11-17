export interface PaginationProps {
  /** Current page, 1-based. */
  page?: number;
  /** Total number of pages. Renders nothing when ≤ 1. */
  total?: number;
  onChange?: (page: number) => void;
  /** Page numbers shown either side of the current one before collapsing to "…". */
  siblings?: number;
  style?: React.CSSProperties;
}
export declare function Pagination(props: PaginationProps): JSX.Element;
