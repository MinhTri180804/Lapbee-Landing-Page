import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';

import { PostList } from '@/components/blog/PostList';
import { PostsToolbar } from '@/components/blog/PostsToolbar';
import { PageHero } from '@/components/layout/PageHero';
import { getPageContent } from '@/content';
import { getCategories, getPosts } from '@/lib/api/posts';
import { routes } from '@/lib/routes';
import { buildMetadata } from '@/lib/seo/metadata';

/*
 * Phần dùng chung của /bai-dang, /bai-dang/trang/[page], /bai-dang/danh-muc/[category](/trang/[page]).
 * Thư mục `_shared` là private folder (không thành route).
 */

/** Số trang danh sách prerender lúc build (trang 2..N); trang sau render theo yêu cầu rồi cache. */
export const PRERENDER_PAGES = 5;

const PAGE_PARAM = /^[1-9]\d{0,3}$/;

/**
 * Đọc tham số `[page]` của URL. Không phải số dương → 404; `1` → redirect 308 về URL gốc
 * (`/bai-dang`, `/bai-dang/danh-muc/x`) để mỗi trang chỉ có một URL.
 */
export function parsePageParam(raw: string, firstPageHref: string): number {
  if (!PAGE_PARAM.test(raw)) notFound();
  const page = Number(raw);
  if (page === 1) permanentRedirect(firstPageHref);
  return page;
}

/** Danh mục theo slug; không có → 404. */
export async function requireCategory(slug: string) {
  const category = (await getCategories()).find((c) => c.slug === slug);
  if (!category) notFound();
  return category;
}

/** Danh sách các số trang 2..min(totalPages, PRERENDER_PAGES) cho generateStaticParams. */
export async function prerenderedPages(category?: string): Promise<{ page: string }[]> {
  const { sections } = await getPageContent('posts');
  const { totalPages } = await getPosts(1, sections.listing.pageSize, category);
  const last = Math.min(totalPages, PRERENDER_PAGES);
  return Array.from({ length: Math.max(0, last - 1) }, (_, i) => ({ page: String(i + 2) }));
}

/**
 * Metadata cho trang danh sách: trang > 1 thêm "– Trang n"; danh mục dùng tên danh mục.
 * Canonical là chính URL của trang (mỗi trang phân trang tự trỏ về mình, không trỏ về trang 1).
 */
export async function listingMetadata({
  page = 1,
  category,
}: {
  page?: number;
  category?: { slug: string; name: string };
}): Promise<Metadata> {
  const { seo } = await getPageContent('posts');
  const base = category ? `${category.name} – Bài đăng` : seo.title;
  const title = page > 1 ? `${base} – Trang ${page}` : base;
  const path = category ? routes.category(category.slug, page) : routes.posts(page);
  return buildMetadata({ seo: { ...seo, title, canonical: undefined }, path });
}

/** Nội dung trang danh sách (hero, thanh lọc, danh sách). Trang > tổng số trang → 404. */
export async function PostsListingView({
  page = 1,
  category,
}: {
  page?: number;
  category?: { slug: string; name: string };
}) {
  const [{ sections }, categories] = await Promise.all([getPageContent('posts'), getCategories()]);
  const { listing } = sections;
  const result = await getPosts(page, listing.pageSize, category?.slug);
  if (page > result.totalPages) notFound();

  const hrefFor = category
    ? (n: number) => routes.category(category.slug, n)
    : (n: number) => routes.posts(n);

  return (
    <>
      <PageHero {...sections.hero} />
      <section className="lb-container" aria-label={category?.name ?? listing.allCategoriesLabel}>
        <PostsToolbar
          labels={listing}
          categories={categories}
          activeCategory={category?.slug ?? null}
        />
        <PostList
          labels={listing}
          heading={category?.name ?? listing.allCategoriesLabel}
          posts={result.items}
          page={page}
          totalPages={result.totalPages}
          total={result.total}
          pageSize={listing.pageSize}
          highlightFeatured={page === 1}
          hrefFor={hrefFor}
        />
      </section>
    </>
  );
}
