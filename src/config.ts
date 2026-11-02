// 網站設定：改這裡就好
export const SITE = {
  title: "KSY's Blog",
  subtitle: 'I have been exploring and recording my journey since 2018.',
  author: 'Lawrence Kao',
  description: {
    zh: '高碩輿的旅遊與工作紀錄',
    en: "Lawrence Kao's notes on travel, work and life",
  },
};

// 側邊欄與文章結尾的作者卡片（中文／英文）
export const AUTHOR = {
  zh: {
    name: '高碩輿 Lawrence Kao',
    role: '科技業技術顧問・旅人',
    bio: '從 2018 年開始記錄旅行、工作與生活。喜歡跳舞、球類運動和閱讀。',
  },
  en: {
    name: 'Lawrence Kao',
    role: 'Tech consultant · Traveler',
    bio: "Writing about travel, work and life since 2018. I love dancing, ball sports and reading.",
  },
};

// 側邊欄「推薦閱讀」：填文章資料夾名稱，依序顯示
export const FEATURED = ['japan-tokyo', 'alishan', 'lookforjobs', 'aroundtaiwan', 'hanoi'];

export const SOCIAL = [
  { label: 'GitHub', icon: 'github', href: 'https://github.com/LawrenceGao0224' },
  { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/shuo_yu_gao' },
  { label: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/Lawrence0224' },
  { label: 'Email', icon: 'mail', href: 'mailto:bightt53523@gmail.com' },
] as const;

export const FRIENDS = [
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
