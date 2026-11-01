// 網站設定：改這裡就好
export const SITE = {
  title: "KSY's Blog",
  subtitle: 'I have been exploring and recording my journey since 2018.',
  author: 'Lawrence Kao',
  description: '高碩輿的旅遊與工作紀錄',
  lang: 'zh-TW',
  postsPerPage: 10,
};

export const SOCIAL = [
  { label: 'GitHub', href: 'https://github.com/LawrenceGao0224' },
  { label: 'Instagram', href: 'https://www.instagram.com/shuo_yu_gao' },
  { label: 'Facebook', href: 'https://www.facebook.com/Lawrence0224' },
  { label: 'Email', href: 'mailto:bightt53523@gmail.com' },
];

export const FRIENDS = [
  { label: 'Cozy Night In', href: 'https://cozynightin.com/' },
  { label: 'My Reading List', href: 'https://lawrencekao.notion.site/1a7fb57a6f3c4e30a8f1f5e45677b129?v=e89018e9e9c54144977390b1195ad432&pvs=4' },
];

// 選用功能：留空就不載入
export const ANALYTICS = {
  ga4Id: '', // Google Analytics 4，格式 G-XXXXXXXXXX
  cloudflareToken: '', // Cloudflare Web Analytics token
};

// giscus 留言（https://giscus.app/zh-TW），repoId 留空就不顯示
export const GISCUS = {
  repo: 'LawrenceGao0224/myblog',
  repoId: '',
  category: 'Announcements',
  categoryId: '',
};
