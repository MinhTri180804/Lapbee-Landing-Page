import type { PageSource, SiteSource } from './adapters/types';
import {
  PageSchemas,
  type PageContent,
  type PageSlug,
  type RemotePage,
  type SectionKey,
} from './schemas/pages';
import { SiteSettings, type TSiteSettings } from './schemas/site';
import type { ContentSource, PageSourceConfig } from './sources.config';

/** Cấu hình nguồn sai với dữ liệu thực tế (vd. section 'api' nhưng backend không trả). */
export class ContentSourceError extends Error {
  override name = 'ContentSourceError';
}

/** Trang có dùng API ở bất kỳ phần nào không. */
export function usesApi<S extends PageSlug>(config: PageSourceConfig<S>): boolean {
  if (config.default === 'api' || config.seo === 'api') return true;
  return Object.values(config.sections ?? {}).some((source) => source === 'api');
}

function sourceOf<S extends PageSlug>(
  config: PageSourceConfig<S>,
  key: SectionKey<S>,
): ContentSource {
  return config.sections?.[key] ?? config.default;
}

type Sources = { staticSource: PageSource; apiSource: PageSource };

/**
 * Lõi của content layer (thuần, nhận nguồn qua tham số để test được).
 *
 * 1. Luôn đọc + validate nội dung tĩnh (sai cấu trúc → lỗi zod có đường dẫn field).
 * 2. Nếu không phần nào dùng 'api' → trả nội dung tĩnh, KHÔNG gọi mạng (trang là SSG thuần).
 * 3. Ngược lại gọi API một lần, validate theo schema `remote` (section có mặt phải đủ),
 *    rồi lấy từng section/seo theo cấu hình. Section 'api' mà backend không trả → throw.
 * 4. Validate lại toàn trang.
 */
export async function resolvePageContent<S extends PageSlug>(
  slug: S,
  config: PageSourceConfig<S>,
  { staticSource, apiSource }: Sources,
): Promise<PageContent<S>> {
  const schema = PageSchemas[slug];
  const localResult = schema.full.safeParse(await staticSource.getPage(slug));
  if (!localResult.success) {
    throw new ContentSourceError(
      `Nội dung tĩnh content/pages/${slug}.ts sai cấu trúc:\n${formatIssues(localResult.error.issues)}`,
    );
  }
  const local = localResult.data as PageContent<S>;
  if (!usesApi(config)) return local;

  const remoteResult = schema.remote.safeParse(await apiSource.getPage(slug));
  if (!remoteResult.success) {
    throw new ContentSourceError(
      `GET /pages/${slug} sai schema:\n${formatIssues(remoteResult.error.issues)}`,
    );
  }
  const remote = remoteResult.data as RemotePage<S>;
  // Duyệt section theo key dạng bản ghi chung; kết quả cuối được validate lại bằng schema đầy đủ.
  const remoteSections = remote.sections as Record<string, unknown>;
  const sections: Record<string, unknown> = { ...local.sections };
  for (const key of Object.keys(local.sections) as Array<SectionKey<S>>) {
    if (sourceOf(config, key) !== 'api') continue;
    const value = remoteSections[key];
    if (value === undefined) {
      throw new ContentSourceError(
        `Section "${slug}.${key}" cấu hình nguồn 'api' nhưng GET /pages/${slug} không trả section này`,
      );
    }
    sections[key] = value;
  }

  let seo = local.seo;
  if ((config.seo ?? config.default) === 'api') {
    if (!remote.seo) {
      throw new ContentSourceError(
        `SEO của "${slug}" cấu hình nguồn 'api' nhưng GET /pages/${slug} không trả "seo"`,
      );
    }
    seo = remote.seo;
  }

  return schema.full.parse({ seo, sections }) as PageContent<S>;
}

/** Thông tin chung của site theo nguồn cấu hình. */
export async function resolveSiteSettings(
  source: ContentSource,
  sources: { staticSource: SiteSource; apiSource: SiteSource },
): Promise<TSiteSettings> {
  const raw =
    source === 'api' ? await sources.apiSource.getSite() : await sources.staticSource.getSite();
  const result = SiteSettings.safeParse(raw);
  if (!result.success) {
    const where = source === 'api' ? 'GET /site' : 'content/site.ts';
    throw new ContentSourceError(`${where} sai cấu trúc:\n${formatIssues(result.error.issues)}`);
  }
  return result.data;
}

function formatIssues(issues: ReadonlyArray<{ path: PropertyKey[]; message: string }>): string {
  return issues
    .map((issue) => `  • ${issue.path.map(String).join('.') || '(gốc)'}: ${issue.message}`)
    .join('\n');
}
