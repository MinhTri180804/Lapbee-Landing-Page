/** Ghép className, bỏ giá trị rỗng. */
export function cx(...names: Array<string | false | null | undefined>): string {
  return names.filter(Boolean).join(' ');
}
