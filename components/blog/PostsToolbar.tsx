import type { SectionData } from '@/content';
import type { TCategory } from '@/lib/api/schemas';
import { routes } from '@/lib/routes';
import { Input } from '@/components/ui/forms';
import { Tag } from '@/components/ui/Tag';

import styles from './PostsToolbar.module.css';

type PostsToolbarProps = {
  labels: SectionData<'posts', 'listing'>;
  categories: readonly TCategory[];
  /** Danh mục đang xem; `null` = tất cả (hoặc trang tìm kiếm khi `query` có giá trị). */
  activeCategory: string | null;
  /** Đang ở trang tìm kiếm → không tag nào được chọn. */
  searching?: boolean;
  /** Từ khoá hiện tại (điền sẵn vào ô tìm kiếm). */
  query?: string;
};

/**
 * Thanh lọc: danh mục là link (mỗi danh mục một URL — chạy khi tắt JS, bot đọc được) và
 * form tìm kiếm GET tới `/bai-dang/tim-kiem` (server render, không gọi API từ client).
 */
export function PostsToolbar({
  labels,
  categories,
  activeCategory,
  searching = false,
  query,
}: PostsToolbarProps) {
  const total = categories.reduce((n, c) => n + c.count, 0);
  return (
    <div className={styles.toolbar}>
      <nav aria-label={labels.categoriesLabel}>
        <ul className={styles.tags}>
          <li>
            <Tag
              href={routes.posts()}
              selected={!searching && activeCategory === null}
              count={total}
            >
              {labels.allCategoriesLabel}
            </Tag>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <Tag
                href={routes.category(c.slug)}
                selected={!searching && activeCategory === c.slug}
                count={c.count}
              >
                {c.name}
              </Tag>
            </li>
          ))}
        </ul>
      </nav>
      <form action={routes.search()} method="get" role="search" className={styles.search}>
        <Input
          type="search"
          name="q"
          icon="search"
          aria-label={labels.searchLabel}
          placeholder={labels.searchPlaceholder}
          defaultValue={query}
          maxLength={100}
          enterKeyHint="search"
        />
        <button type="submit" className="lb-sr-only">
          {labels.searchSubmitLabel}
        </button>
      </form>
    </div>
  );
}
