import type { Metadata } from 'next';

import { routes } from '@/lib/routes';

import {
  listingMetadata,
  parsePageParam,
  PostsListingView,
  requireCategory,
} from '../../../../_shared/listing';

export const revalidate = 3600;
export const dynamicParams = true;

/** Không prerender lúc build (số trang mỗi danh mục ít); render lần đầu theo yêu cầu rồi cache. */
export function generateStaticParams() {
  return [];
}

type Props = PageProps<'/posts/category/[category]/page/[page]'>;

async function resolve(params: Props['params']) {
  const { category: slug, page: raw } = await params;
  const page = parsePageParam(raw, routes.category(slug));
  const category = await requireCategory(slug);
  return { page, category };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page, category } = await resolve(params);
  return listingMetadata({ page, category });
}

/** /bai-dang/danh-muc/[category]/trang/[page] */
export default async function CategoryPagedPage({ params }: Props) {
  const { page, category } = await resolve(params);
  return <PostsListingView page={page} category={category} />;
}
