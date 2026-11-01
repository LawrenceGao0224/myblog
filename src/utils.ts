import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());
}

/** 加上 base（/myblog），所有站內連結都要經過這裡 */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export const postUrl = (post: Post) => url(`/posts/${post.id}/`);
export const tagUrl = (tag: string) => url(`/tags/${encodeURIComponent(tag)}/`);

export function formatDate(date: Date): string {
  return date.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Taipei' });
}

export function allTags(posts: Post[]): [string, number][] {
  const counts = new Map<string, number>();
  for (const p of posts) for (const t of p.data.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

/** 閱讀時間：中文每分鐘約 400 字、英文約 200 字 */
export function readingMinutes(post: Post): number {
  const body = (post.body ?? '').replace(/<[^>]*>/g, ' ').replace(/\]\([^)]*\)/g, ']');
  const cjk = (body.match(/[\u4e00-\u9fff]/g) ?? []).length;
  const words = body.replace(/[\u4e00-\u9fff]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(cjk / 400 + words / 200));
}
