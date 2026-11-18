import Image from 'next/image';
import Link from 'next/link';

import type { SectionData } from '@/content';
import type { TPost } from '@/lib/api/schemas';
import { formatDate } from '@/lib/format';
import { routes } from '@/lib/routes';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CtaButton } from '@/components/ui/CtaButton';

import { CopyLinkButton } from './CopyLinkButton';
import styles from './PostArticle.module.css';

type PostArticleProps = {
  post: TPost;
  /** Nội dung đã sanitize ở server (lib/html) — component không tự làm sạch. */
  html: string;
  readingMinutes: number;
  labels: SectionData<'posts', 'article'>;
  readingTimeSuffix: string;
  /** URL tuyệt đối của bài (nút sao chép liên kết). */
  shareUrl: string;
};

/** Trang chi tiết bài viết theo design: meta, h1, tóm tắt, byline, ảnh bìa, nội dung, CTA. */
export function PostArticle({
  post,
  html,
  readingMinutes,
  labels,
  readingTimeSuffix,
  shareUrl,
}: PostArticleProps) {
  return (
    <article className={`lb-container-narrow ${styles.article}`}>
      <Button href={routes.posts()} variant="ghost" size="sm" iconLeft="arrow-left">
        {labels.backLabel}
      </Button>

      <div className={styles.meta}>
        {post.category && (
          <Link href={routes.category(post.category.slug)} className={styles.category}>
            <Badge tone={post.category.slug === 'khuyen-mai' ? 'brand' : 'neutral'}>
              {post.category.name}
            </Badge>
          </Link>
        )}
        <span className="lb-label">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> · {readingMinutes}{' '}
          phút {readingTimeSuffix}
        </span>
      </div>

      <h1 className={styles.title}>{post.title}</h1>
      {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}

      <div className={styles.byline}>
        <span>
          {labels.bylinePrefix} <b>{labels.author}</b>
        </span>
        <CopyLinkButton
          url={shareUrl}
          label={labels.copyLinkLabel}
          copiedLabel={labels.copiedLabel}
        />
      </div>

      <div className={styles.cover}>
        <Image
          src={post.cover.url}
          alt={post.cover.alt}
          width={post.cover.width}
          height={post.cover.height}
          sizes="(max-width: 820px) 100vw, 760px"
          priority
          className="lb-photo"
        />
      </div>

      {/* HTML đã qua sanitizePostHtml (whitelist thẻ/thuộc tính) ở server. */}
      <div className={styles.prose} dangerouslySetInnerHTML={{ __html: html }} />

      <aside className={styles.cta} aria-label={labels.cta.title}>
        <div>
          <h2 className={styles.ctaTitle}>{labels.cta.title}</h2>
          <p className={styles.ctaBody}>{labels.cta.body}</p>
        </div>
        <CtaButton cta={labels.cta.cta} />
      </aside>
    </article>
  );
}
