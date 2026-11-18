import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PostArticle } from '@/components/blog/PostArticle';
import { JsonLd } from '@/components/seo/JsonLd';
import { getPageContent, getSiteSettings } from '@/content';
import { isApiNotFound } from '@/lib/api/errors';
import { getPost, getPostSlugs } from '@/lib/api/posts';
import { PostSlug, type TPost } from '@/lib/api/schemas';
import { getServerEnv } from '@/lib/env';
import { estimateReadingMinutes, renderPostContent } from '@/lib/html/content';
import { routes } from '@/lib/routes';
import { articleJsonLd, breadcrumbJsonLd, type Crumb } from '@/lib/seo/jsonld';
import { buildMetadata } from '@/lib/seo/metadata';

/*
 * /bai-dang/[slug] — ISR. Build prerender tối đa 50 bài mới nhất; bài khác render lần đầu theo yêu cầu
 * rồi cache (dynamicParams). Tags `posts`, `post:<slug>` (lib/api/posts). API lỗi → throw → Next giữ
 * bản cache cũ (hoặc trang lỗi nếu chưa có cache). Bài không tồn tại / chưa đăng → 404.
 */
export const revalidate = 3600;
export const dynamicParams = true;

const MAX_PRERENDER = 50;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return [...slugs]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, MAX_PRERENDER)
    .map(({ slug }) => ({ slug }));
}

/** Bài đã đăng theo slug; slug sai định dạng, không có trên backend hoặc chưa `published` → 404. */
async function loadPost(slug: string): Promise<TPost> {
  if (!PostSlug.safeParse(slug).success) notFound();
  let post: TPost;
  try {
    post = await getPost(slug);
  } catch (error) {
    if (isApiNotFound(error)) notFound();
    throw error;
  }
  if (post.status !== 'published') notFound();
  return post;
}

type Props = PageProps<'/posts/[slug]'>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await loadPost((await params).slug);
  return buildMetadata({
    seo: post.seo,
    path: routes.post(post.slug),
    images: [
      {
        url: post.cover.url,
        width: post.cover.width,
        height: post.cover.height,
        alt: post.cover.alt,
      },
    ],
    article: {
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      section: post.category?.name,
    },
  });
}

export default async function PostPage({ params }: Props) {
  const post = await loadPost((await params).slug);
  const [{ sections }, site] = await Promise.all([getPageContent('posts'), getSiteSettings()]);
  const { siteUrl } = getServerEnv();
  const crumbs: Crumb[] = [
    {
      name: site.nav.find((n) => n.href === routes.home())?.label ?? site.name,
      path: routes.home(),
    },
    { name: sections.article.backLabel, path: routes.posts() },
    ...(post.category
      ? [{ name: post.category.name, path: routes.category(post.category.slug) }]
      : []),
    { name: post.title, path: routes.post(post.slug) },
  ];

  const html = renderPostContent(post.content, post.contentFormat, { siteOrigin: siteUrl });
  const readingMinutes = post.readingMinutes ?? estimateReadingMinutes(html);

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd(post, site, siteUrl, sections.article.author),
          breadcrumbJsonLd(crumbs, siteUrl),
        ]}
      />
      <PostArticle
        post={post}
        html={html}
        readingMinutes={readingMinutes}
        labels={sections.article}
        readingTimeSuffix={sections.listing.readingTimeSuffix}
        shareUrl={new URL(routes.post(post.slug), siteUrl).toString()}
      />
    </>
  );
}
