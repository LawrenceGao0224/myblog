import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import redirects from './src/redirects.json' with { type: 'json' };

// 部署到 Cloudflare Pages 時：SITE_URL=https://xxx.pages.dev BASE_PATH=/ npm run build
const site = process.env.SITE_URL ?? 'https://lawrencegao0224.github.io';
const base = process.env.BASE_PATH ?? '/myblog';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  // 舊的 Hexo 網址（/2026/07/24/chiangmai/）自動轉到新網址
  redirects: Object.fromEntries(
    Object.entries(redirects).map(([from, to]) => [from, base.replace(/\/$/, '') + to]),
  ),
  integrations: [sitemap()],
  image: {
    layout: 'constrained',
    // 每張照片只產生三種寬度：手機、平板、電腦
    breakpoints: [480, 800, 1200],
    responsiveStyles: true,
  },
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },
});
