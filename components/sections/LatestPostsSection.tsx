import type { SectionData } from '@/content';
import type { TPostSummary } from '@/lib/api/schemas';
import { PostCard } from '@/components/blog/PostCard';
import { SectionHead } from '@/components/layout/SectionHead';
import { CtaButton } from '@/components/ui/CtaButton';

type LatestPostsSectionProps = {
  data: SectionData<'home', 'latestPosts'>;
  /** Bài mới nhất từ blog API (trang lấy, component chỉ hiển thị). */
  posts: readonly TPostSummary[];
};

/** "Bài đăng mới" ở trang chủ. Không có bài → không render section. */
export function LatestPostsSection({ data, posts }: LatestPostsSectionProps) {
  if (posts.length === 0) return null;
  return (
    <section className="lb-container lb-section" aria-labelledby="latest-posts-title">
      <SectionHead
        id="latest-posts-title"
        title={data.title}
        aside={<CtaButton cta={data.cta} fallbackVariant="outline" />}
      />
      <ul className="lb-grid-3" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {posts.map((post) => (
          <li key={post.slug} data-reveal="">
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
