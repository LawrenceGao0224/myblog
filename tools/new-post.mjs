// 新增文章：npm run new -- 網址名稱
// 例：npm run new -- tokyo-2027  →  src/content/posts/tokyo-2027/index.md（中文）＋ index.en.md（英文）
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';

const slug = process.argv[2];
if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error('請提供網址名稱（小寫英文、數字、-），例如：npm run new -- tokyo-2027');
  process.exit(1);
}
const dir = `src/content/posts/${slug}`;
if (existsSync(dir)) {
  console.error(`${dir} 已存在`);
  process.exit(1);
}
const now = new Date(Date.now() + 8 * 3600e3).toISOString().slice(0, 19);
mkdirSync(dir, { recursive: true });
writeFileSync(`${dir}/index.md`, `---
title: 文章標題
description: 一句話副標題
published: ${now}+08:00
# cover: ./header.jpg   # 封面圖：把照片放進這個資料夾後取消註解
tags:
- Travel
category: Blog
draft: true             # 寫完改成 false（或刪掉這行）才會發佈
---

開始寫吧！

<!-- 插入照片：把 1.jpg 放進這個資料夾，再寫 ![照片說明](./1.jpg) -->
`);
writeFileSync(`${dir}/index.en.md`, `---
title: Post title
description: One-line subtitle
published: ${now}+08:00
# cover: ./header.jpg   # 和中文版用同一張封面
tags:
- Travel
category: Blog
draft: true             # 英文版寫完再刪掉這行；沒寫完就保持 draft，英文網站不會出現這篇
---

Start writing in English here. Use the same photos as the Chinese version, e.g. ![caption](./1.jpg)
`);
console.log(`已建立 ${dir}/index.md（中文）和 ${dir}/index.en.md（英文）`);
