import type { Metadata } from 'next';

import { getCategories } from '@/lib/api/posts';

import { listingMetadata, PostsListingView, requireCategory } from '../../_shared/listing';

export const revalidate = 3600;
/** Danh mục mới (chưa có lúc build) render theo yêu cầu; slug không có trong /categories → 404. */
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getCategories()).map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/posts/category/[category]'>): Promise<Metadata> {
  const category = await requireCategory((await params).category);
  return listingMetadata({ category });
}

/** /bai-dang/danh-muc/[category] — trang 1 của một danh mục. */
export default async function CategoryPage({ params }: PageProps<'/posts/category/[category]'>) {
  const category = await requireCategory((await params).category);
  return <PostsListingView category={category} />;
}
