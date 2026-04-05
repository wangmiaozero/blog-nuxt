/**
 * Generates a stable cover image URL from picsum.photos using a seed.
 * Using seed-based URLs avoids the solid-color blocks that /id/N sometimes returns.
 */
export function mockArticleCoverUrl(articleId: string | number): string {
  const raw = String(articleId ?? '0').replace(/[^a-zA-Z0-9_-]/g, '')
  return `https://picsum.photos/seed/blog-${raw || '0'}/800/450`
}

/** Placeholder cover used during lazy-load and when listPic is absent */
export const MOCK_REMOTE_PLACEHOLDER_COVER =
  'https://picsum.photos/seed/blog-placeholder/800/450'
