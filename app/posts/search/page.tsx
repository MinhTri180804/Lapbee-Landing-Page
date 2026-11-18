import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { PostList } from '@/components/blog/PostList';
import { PostsToolbar } from '@/components/blog/PostsToolbar';
import { PageHero } from '@/components/layout/PageHero';
import { getPageContent } from '@/content';
import { getCategories, getPosts } from '@/lib/api/posts';
import { routes } from '@/lib/routes';
import { buildMetadata } from '@/lib/seo/metadata';

import styles from './page.module.css';

/*
 * /bai-dang/tim-kiem?q=&page= — đọc searchParams nên render theo từng request (dynamic).
 * Kết quả tìm kiếm không cache (lib/api/posts: có `q` → no-store); danh mục vẫn dùng cache.
 * Form tìm kiếm là GET thường → chạy khi tắt JS, không gọi API từ client. Không index.
 */

const MAX_QUERY = 100;

type Props = PageProps<'/posts/search'>;

async function readParams(searchParams: Props['searchParams']) {
  const sp = await searchParams;
  const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? '';
  const q = first(sp.q).trim().replace(/\s+/g, ' ').slice(0, MAX_QUERY);
  const rawPage = first(sp.page);
  const page = /^[1-9]\d{0,3}$/.test(rawPage) ? Number(rawPage) : 1;
  return { q, page };
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const [{ sections }, { q }] = await Promise.all([
    getPageContent('posts'),
    readParams(searchParams),
  ]);
  const { search } = sections.listing;
  // Không index (kết quả theo từ khoá tuỳ ý); canonical về trang tìm kiếm gốc.
  return buildMetadata({
    seo: {
      title: q ? search.resultsTitle.replace('{q}', q) : search.seoTitle,
      description: search.seoDescription,
      noindex: true,
    },
    path: routes.search(),
  });
}

export default async function SearchPage({ searchParams }: Props) {
  const [{ sections }, categories, { q, page }] = await Promise.all([
    getPageContent('posts'),
    getCategories(),
    readParams(searchParams),
  ]);
  const { listing } = sections;
  const { search } = listing;
  const result = q ? await getPosts(page, listing.pageSize, undefined, q) : null;
  // Số trang vượt quá kết quả (link cũ, sửa tay URL) → về trang 1 của cùng từ khoá.
  if (result && page > result.totalPages) redirect(routes.search(q));

  return (
    <>
      <PageHero
        eyebrow={search.eyebrow}
        title={q ? search.resultsTitle.replace('{q}', q) : search.title}
      />
      <section className="lb-container" aria-label={search.title}>
        <PostsToolbar
          labels={listing}
          categories={categories}
          activeCategory={null}
          searching
          query={q}
        />
        {result ? (
          <PostList
            labels={listing}
            heading={search.eyebrow}
            posts={result.items}
            page={page}
            totalPages={result.totalPages}
            total={result.total}
            pageSize={listing.pageSize}
            hrefFor={(n) => routes.search(q, n)}
          />
        ) : (
          <p className={styles.prompt}>{search.promptText}</p>
        )}
      </section>
    </>
  );
}
