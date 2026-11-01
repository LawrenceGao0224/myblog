// 中英文介面文字。中文網址維持原樣，英文版放在 /en/ 底下
export type Lang = 'zh' | 'en';

export const LOCALE: Record<Lang, { html: string; date: string; giscus: string }> = {
  zh: { html: 'zh-TW', date: 'zh-TW', giscus: 'zh-TW' },
  en: { html: 'en', date: 'en-US', giscus: 'en' },
};

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** 從網址判斷目前語言 */
export function langOf(u: URL): Lang {
  return u.pathname === `${BASE}/en` || u.pathname.startsWith(`${BASE}/en/`) ? 'en' : 'zh';
}

/** 同一頁的另一種語言網址 */
export function otherLangPath(u: URL): string {
  const rest = u.pathname.slice(BASE.length) || '/';
  if (langOf(u) === 'en') return `${BASE}${rest.replace(/^\/en(\/|$)/, '/')}`;
  return `${BASE}/en${rest}`;
}

export const T = {
  zh: {
    home: '首頁',
    travel: '旅遊',
    life: '生活',
    work: '工作',
    allPosts: '所有文章',
    about: '關於',
    mainMenu: '主選單',
    mobileMenu: '手機選單',
    openMenu: '開啟選單',
    toggleTheme: '切換深色／淺色',
    switchLang: 'Read in English',
    switchLabel: 'EN',
    kicker: 'Travel · Work · Life',
    latest: '最新文章',
    more: '更多文章',
    browseAll: (n: number) => `瀏覽全部 ${n} 篇文章 →`,
    minRead: (n: number) => `${n} 分鐘閱讀`,
    featured: '精選文章',
    prev: '上一篇',
    next: '下一篇',
    pickSlide: '選擇文章',
    slideN: (n: number) => `第 ${n} 篇`,
    meetMe: '認識我 →',
    picks: '推薦閱讀',
    categories: '分類',
    tags: '標籤',
    toc: '本文目錄',
    share: '分享',
    shareTo: (s: string) => `分享到 ${s}`,
    copyLink: '複製連結',
    aboutAuthor: '關於作者',
    prevNextNav: '上一篇／下一篇',
    related: '延伸閱讀',
    archiveSub: (n: number) => `2017 年至今，共 ${n} 篇`,
    explore: '分類與標籤',
    exploreSub: '依主題找文章',
    countPosts: (n: number) => `${n} 篇`,
    nPosts: (n: number) => `${n} 篇文章`,
    zoom: '放大圖片',
  },
  en: {
    home: 'Home',
    travel: 'Travel',
    life: 'Life',
    work: 'Work',
    allPosts: 'All posts',
    about: 'About',
    mainMenu: 'Main menu',
    mobileMenu: 'Mobile menu',
    openMenu: 'Open menu',
    toggleTheme: 'Toggle dark / light',
    switchLang: '切換成中文',
    switchLabel: '中',
    kicker: 'Travel · Work · Life',
    latest: 'Latest',
    more: 'More stories',
    browseAll: (n: number) => `Browse all ${n} posts →`,
    minRead: (n: number) => `${n} min read`,
    featured: 'Featured posts',
    prev: 'Previous',
    next: 'Next',
    pickSlide: 'Choose a post',
    slideN: (n: number) => `Post ${n}`,
    meetMe: 'More about me →',
    picks: 'Recommended',
    categories: 'Categories',
    tags: 'Tags',
    toc: 'Contents',
    share: 'Share',
    shareTo: (s: string) => `Share on ${s}`,
    copyLink: 'Copy link',
    aboutAuthor: 'About the author',
    prevNextNav: 'Previous / next post',
    related: 'Keep reading',
    archiveSub: (n: number) => `${n} posts since 2017`,
    explore: 'Categories & tags',
    exploreSub: 'Find posts by topic',
    countPosts: (n: number) => `${n} ${n === 1 ? 'post' : 'posts'}`,
    nPosts: (n: number) => `${n} ${n === 1 ? 'post' : 'posts'}`,
    zoom: 'Enlarged image',
  },
} satisfies Record<Lang, Record<string, unknown>>;
