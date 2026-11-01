import rss from '@astrojs/rss';
import { SITE } from './config';
import type { Lang } from './i18n';
import { getPosts, postUrl } from './utils';

export async function feed(lang: Lang, site: URL) {
  const posts = await getPosts(lang);
  return rss({
    title: SITE.title,
    description: SITE.description[lang],
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.published,
      link: postUrl(post),
    })),
  });
}
