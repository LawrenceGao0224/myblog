import { getCollection, type CollectionEntry } from 'astro:content';
import { LOCALE, type Lang } from './i18n';

export type Post = CollectionEntry<'posts'> | CollectionEntry<'postsEn'>;

export async function getPosts(lang: Lang = 'zh'): Promise<Post[]> {
  const keep = ({ data }: Post) => import.meta.env.DEV || !data.draft;
  const posts: Post[] = lang === 'en' ? await getCollection('postsEn', keep) : await getCollection('posts', keep);
  return posts.sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());
}

/** 加上 base（/myblog），所有站內連結都要經過這裡 */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/** 依語言加上 /en 前綴 */
export const langUrl = (lang: Lang, path = '/') => url(lang === 'en' ? `/en${path}` : path);
export const langOfPost = (post: Post): Lang => (post.collection === 'postsEn' ? 'en' : 'zh');

export const postUrl = (post: Post) => langUrl(langOfPost(post), `/posts/${post.id}/`);
export const tagUrl = (tag: string, lang: Lang = 'zh') => langUrl(lang, `/tags/${encodeURIComponent(tag)}/`);
export const categoryUrl = (cat: string, lang: Lang = 'zh') => langUrl(lang, `/categories/${encodeURIComponent(cat)}/`);

export function formatDate(date: Date, lang: Lang = 'zh'): string {
  return lang === 'en'
    ? date.toLocaleDateString(LOCALE.en.date, { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'Asia/Taipei' })
    : date.toLocaleDateString(LOCALE.zh.date, { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Taipei' });
}

/** 年份（台灣時間），文章列表依年份分組用 */
export const yearOf = (date: Date) =>
  date.toLocaleDateString('en-US', { year: 'numeric', timeZone: 'Asia/Taipei' });

export function allTags(posts: Post[]): [string, number][] {
  const counts = new Map<string, number>();
  for (const p of posts) for (const t of p.data.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

export function allCategories(posts: Post[]): [string, number][] {
  const counts = new Map<string, number>();
  for (const p of posts) if (p.data.category) counts.set(p.data.category, (counts.get(p.data.category) ?? 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1]);
}

/** 同標籤的文章優先，再補最新的 */
export function relatedPosts(post: Post, posts: Post[], n = 3): Post[] {
  const others = posts.filter((p) => p.id !== post.id);
  const shared = (p: Post) => p.data.tags.filter((t) => post.data.tags.includes(t)).length;
  return [...others].sort((a, b) => shared(b) - shared(a)).slice(0, n);
}

/** 閱讀時間：中文每分鐘約 400 字、英文約 200 字 */
export function readingMinutes(post: Post): number {
  const body = (post.body ?? '').replace(/<[^>]*>/g, ' ').replace(/\]\([^)]*\)/g, ']');
  const cjk = (body.match(/[一-鿿]/g) ?? []).length;
  const words = body.replace(/[一-鿿]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(cjk / 400 + words / 200));
}
