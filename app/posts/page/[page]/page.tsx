import type { Metadata } from 'next';

import { routes } from '@/lib/routes';

import {
  listingMetadata,
  parsePageParam,
  PostsListingView,
  prerenderedPages,
} from '../../_shared/listing';

export const revalidate = 3600;
/** Trang chưa prerender (sau PRERENDER_PAGES) render theo yêu cầu rồi cache; quá tổng số trang → 404. */
export const dynamicParams = true;

export function generateStaticParams() {
  return prerenderedPages();
}

export async function generateMetadata({
  params,
}: PageProps<'/posts/page/[page]'>): Promise<Metadata> {
  const page = parsePageParam((await params).page, routes.posts());
  return listingMetadata({ page });
}

/** /bai-dang/trang/[page] (page ≥ 2; `/trang/1` → 308 về /bai-dang). */
export default async function PostsPagedPage({ params }: PageProps<'/posts/page/[page]'>) {
  const page = parsePageParam((await params).page, routes.posts());
  return <PostsListingView page={page} />;
}
