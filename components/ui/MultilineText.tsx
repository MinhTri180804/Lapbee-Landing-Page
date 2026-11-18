import { Fragment, type ReactNode } from 'react';

type MultilineTextProps = {
  /** Chuỗi có thể chứa "\n" để xuống dòng có chủ đích. */
  text: string;
  /** Cụm từ được tô nền vàng (lần xuất hiện đầu tiên). */
  highlight?: string;
  highlightClassName?: string;
};

/** Render chuỗi nội dung: "\n" → <br />, tô nền cụm `highlight`. Dùng cho tiêu đề từ content layer. */
export function MultilineText({ text, highlight, highlightClassName }: MultilineTextProps) {
  const lines = text.split('\n');
  // Chỉ tô dòng đầu tiên chứa cụm từ (tính trước, không đổi biến trong lúc render).
  const highlightLine = highlight ? lines.findIndex((l) => l.includes(highlight)) : -1;
  return (
    <>
      {lines.map((line, i) => {
        let content: ReactNode = line;
        if (highlight && i === highlightLine) {
          const at = line.indexOf(highlight);
          content = (
            <>
              {line.slice(0, at)}
              <mark className={highlightClassName}>{highlight}</mark>
              {line.slice(at + highlight.length)}
            </>
          );
        }
        return (
          <Fragment key={i}>
            {content}
            {i < lines.length - 1 && <br />}
          </Fragment>
        );
      })}
    </>
  );
}
