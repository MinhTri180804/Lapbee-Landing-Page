import Image from 'next/image';

import type { TPostSummary } from '@/lib/api/schemas';
import { formatDate } from '@/lib/format';
import { routes } from '@/lib/routes';
import { Badge } from '@/components/ui/Badge';
import { Card, CardLink } from '@/components/ui/Card';

import styles from './PostCard.module.css';

type PostCardProps = {
  post: TPostSummary;
  /** Thẻ lớn (bài nổi bật đầu danh sách). */
  large?: boolean;
  /** Hậu tố thời gian đọc, vd. "đọc" → "4 phút đọc". */
  readingTimeSuffix?: string;
  /** Mức heading của tiêu đề bài (mặc định h3). */
  headingLevel?: 'h2' | 'h3';
  /** Ảnh nằm trong màn hình đầu → tải sớm. */
  priority?: boolean;
};

/** Thẻ bài viết: ảnh bìa, danh mục, ngày, tiêu đề (link phủ cả thẻ), tóm tắt, thời gian đọc. */
export function PostCard({
  post,
  large = false,
  readingTimeSuffix = 'đọc',
  headingLevel: Heading = 'h3',
  priority = false,
}: PostCardProps) {
  return (
    <Card as="article" interactive padding={0} className={styles.card}>
      <div className={styles.cover} style={{ aspectRatio: large ? '16/9' : '3/2' }}>
        <Image
          src={post.cover.url}
          alt={post.cover.alt}
          fill
          sizes={
            large
              ? '(max-width: 820px) 100vw, 1240px'
              : '(max-width: 560px) 100vw, (max-width: 820px) 50vw, 400px'
          }
          priority={priority}
          className={`${styles.img} lb-photo`}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          {post.category ? (
            <Badge tone={post.category.slug === 'khuyen-mai' ? 'brand' : 'neutral'}>
              {post.category.name}
            </Badge>
          ) : (
            <span />
          )}
          <time className="lb-label" dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
        </div>
        <Heading className={large ? styles.titleLarge : styles.title}>
          <CardLink href={routes.post(post.slug)}>{post.title}</CardLink>
        </Heading>
        <p className={styles.excerpt}>{post.excerpt}</p>
        {post.readingMinutes && (
          <span className={`lb-label ${styles.reading}`}>
            {post.readingMinutes} phút {readingTimeSuffix}
          </span>
        )}
      </div>
    </Card>
  );
}
