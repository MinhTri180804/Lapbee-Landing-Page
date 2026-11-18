import type { Metadata } from 'next';

import { listingMetadata, PostsListingView } from './_shared/listing';

/** ISR: danh sách bài (tag `posts`, `categories`), làm mới sau 3600s hoặc khi webhook revalidate. */
export const revalidate = 3600;

export function generateMetadata(): Promise<Metadata> {
  return listingMetadata({});
}

/** /bai-dang — trang 1 của tất cả bài viết. */
export default function PostsPage() {
  return <PostsListingView />;
}
