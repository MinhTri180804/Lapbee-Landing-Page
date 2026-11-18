import type { CSSProperties, ReactNode } from 'react';

import type { SectionData } from '@/content';
import type { TPostSummary } from '@/lib/api/schemas';
import { Pagination } from '@/components/ui/Pagination';

import { PostCard } from './PostCard';
import styles from './PostList.module.css';

type PostListProps = {
  labels: SectionData<'posts', 'listing'>;
  /** Nhãn của danh sách (h2), vd. "Tất cả", tên danh mục, "Kết quả cho …". */
  heading: string;
  posts: readonly TPostSummary[];
  page: number;
  totalPages: number;
  /** Tổng số bài (nếu API trả `total`) → hiện "1–6 / 18 bài viết". */
  total?: number;
  pageSize: number;
  /** Trang 1: bài `featured` đầu tiên hiển thị thẻ lớn. */
  highlightFeatured?: boolean;
  hrefFor: (page: number) => string;
  /** Nội dung thay cho thông báo "không có bài" (vd. gợi ý ở trang tìm kiếm). */
  empty?: ReactNode;
};

const order = (i: number) => ({ '--i': Math.min(i, 5) }) as CSSProperties;

/** Danh sách bài + dòng đếm + phân trang bằng link. Chỉ hiển thị dữ liệu được truyền vào. */
export function PostList({
  labels,
  heading,
  posts,
  page,
  totalPages,
  total,
  pageSize,
  highlightFeatured = false,
  hrefFor,
  empty,
}: PostListProps) {
  const featured = highlightFeatured ? posts.find((p) => p.featured) : undefined;
  const rest = featured ? posts.filter((p) => p !== featured) : posts;
  const from = (page - 1) * pageSize + 1;
  const to = from + posts.length - 1;
  const count =
    total === undefined
      ? `${page} / ${totalPages}`
      : total === 0
        ? `0 ${labels.countUnit}`
        : `${from}–${to} / ${total} ${labels.countUnit}`;

  return (
    <>
      <div className={styles.count}>
        <h2 className={`lb-label ${styles.heading}`}>{heading}</h2>
        {(posts.length > 0 || total !== undefined) && <span className="lb-label">{count}</span>}
      </div>

      <div className={styles.list}>
        {featured && (
          <div className={styles.item} style={order(0)}>
            <PostCard post={featured} large priority readingTimeSuffix={labels.readingTimeSuffix} />
          </div>
        )}
        {rest.length > 0 && (
          <ul
            className={`lb-grid-3 ${styles.grid}`}
            data-after-featured={featured ? '' : undefined}
          >
            {rest.map((post, i) => (
              <li key={post.slug} className={styles.item} style={order(i + (featured ? 1 : 0))}>
                <PostCard
                  post={post}
                  priority={!featured && i < 3}
                  readingTimeSuffix={labels.readingTimeSuffix}
                />
              </li>
            ))}
          </ul>
        )}
        {posts.length === 0 && (empty ?? <p className={styles.empty}>{labels.emptyText}</p>)}
      </div>

      <Pagination page={page} total={totalPages} hrefFor={hrefFor} className={styles.pager} />
    </>
  );
}
