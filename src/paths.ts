// 文章／標籤／分類頁的路徑，中英文共用
import type { Lang } from './i18n';
import { allCategories, allTags, getPosts } from './utils';

export async function postPaths(lang: Lang) {
  const posts = await getPosts(lang);
  // 另一種語言有沒有這篇（沒有的話，切換按鈕改去另一語言的首頁）
  const other = new Set((await getPosts(lang === 'zh' ? 'en' : 'zh')).map((p) => p.id));
  return posts.map((post, i) => ({
    params: { slug: post.id },
    props: { post, posts, newer: posts[i - 1], older: posts[i + 1], translated: other.has(post.id) },
  }));
}

export async function tagPaths(lang: Lang) {
  const posts = await getPosts(lang);
  return allTags(posts).map(([tag]) => ({
    params: { tag },
    props: { all: posts, posts: posts.filter((p) => p.data.tags.includes(tag)) },
  }));
}

export async function categoryPaths(lang: Lang) {
  const posts = await getPosts(lang);
  return allCategories(posts).map(([category]) => ({
    params: { category },
    props: { all: posts, posts: posts.filter((p) => p.data.category === category) },
  }));
}
