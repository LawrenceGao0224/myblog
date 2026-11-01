# 部落格使用手冊（Astro 版）

架構：**Astro 7 + Node 24**，放在 GitHub `master` 分支，push 後由 GitHub Actions 自動建置並發佈到
https://lawrencegao0224.github.io/myblog/

```
npm run new -- 名稱 → 寫文章、放照片 → npm run dev（預覽）→ git commit → git push → 自動上線
```

> 📝 **要寫新文章？** 請看 [POSTING-GUIDE.md](POSTING-GUIDE.md)：撰寫格式、照片規則、發佈步驟、常見錯誤都在裡面。

## 和 Hexo 版有什麼不同

| | Hexo 版 | Astro 版 |
|---|---|---|
| 照片 | 原檔直接給讀者下載 | 自動轉成 WebP、產生手機／平板／電腦三種尺寸，讀者只下載需要的那張 |
| 清邁那篇的照片流量（手機） | 12.6 MB | 2.7 MB |
| 文章網址 | `/2026/07/24/chiangmai/` | `/posts/chiangmai/`（舊網址會自動轉過來） |
| 深色模式 | 無 | 預設淺色，右上角太陽／月亮可切換，會記住讀者的選擇 |
| 點照片放大 | 無 | 有 |
| 文章格式檢查 | 無 | 欄位寫錯會在建置時直接報錯 |
| 主題 | beantech（2016，Bootstrap 3 + jQuery） | 自製輕量主題，沒有 jQuery／Bootstrap |

---

## 日常使用

### 1. 新增文章

```bash
npm run new -- tokyo-2027
```

會建立 `src/content/posts/tokyo-2027/index.md`。網址名稱只能用小寫英文、數字和 `-`。

文章開頭（front-matter）：

```yaml
---
title: 東京 2027.3.1~2027.3.7   # 標題
description: 一句話副標題           # 副標題（首頁卡片也會顯示）
published: 2027-03-10T20:00:00+08:00
cover: ./header.jpg                # 封面圖，放在同一個資料夾
tags:
- Travel
category: Blog
toc: true                          # 顯示目錄（預設 true）
draft: true                        # 草稿：本機看得到、不會發佈。寫完刪掉這行
---
```

### 2. 插入照片

把照片放進文章資料夾（和 `index.md` 同一層），然後：

```markdown
![淺草寺夜景](./1.jpg)
```

- 一定要用 `./` 開頭
- 中括號裡的文字是圖片說明（給視障讀者和 Google），可以留空 `![](./1.jpg)`
- 檔名打錯或照片不存在，建置會直接報錯並告訴你哪一篇、哪張，不會上線一張破圖
- 不用再手動縮圖，Astro 會自動處理；但原檔超過 600 KB 時，發佈前的檢查會失敗，請先執行：

```bash
npm run images
```

### 3. 插入 Google 地圖

Google 地圖 → 分享 → 嵌入地圖 → 複製 iframe 貼上即可，手機上會自動縮放。

### 4. 本機預覽

```bash
npm run dev
```

打開 http://localhost:4321/myblog/ ，存檔後畫面會自動更新。按 `Ctrl + C` 停止。

### 5. 發佈

```bash
git add -A
git commit -m "新增：東京遊記"
git push
```

1–2 分鐘後上線。到 GitHub repo 的 **Actions** 分頁可看進度。

---

## 設定（`src/config.ts`）

網站標題、社群連結、朋友連結都在這裡改。

- `AUTHOR`：首頁右側和文章結尾的作者卡片（名字、職稱、簡介）
- `FEATURED`：右側「推薦閱讀」，填文章資料夾名稱，例如 `'japan-tokyo'`，依序顯示
- 首頁最上方的大型精選文章，自動使用最新一篇

以下選用功能留空就不會載入：

### Google Analytics 4
1. https://analytics.google.com 建立資源 → 網站資料串流，網址填 `https://lawrencegao0224.github.io/myblog/`
2. 複製評估 ID（`G-XXXXXXXXXX`）填入 `ANALYTICS.ga4Id`

### Cloudflare Web Analytics（免費、不用 cookie）
1. Cloudflare 後台 → **Analytics & Logs → Web Analytics → Add a site**
2. 複製 snippet 裡的 token 填入 `ANALYTICS.cloudflareToken`

### giscus 留言
1. repo **Settings → Features** 勾選 **Discussions**
2. 安裝 https://github.com/apps/giscus ，只選 `myblog`
3. 到 https://giscus.app/zh-TW 填 `LawrenceGao0224/myblog`、分類選 **Announcements**
4. 把產生的 `data-repo-id`、`data-category-id` 填入 `GISCUS.repoId`、`GISCUS.categoryId`

### Cloudflare Pages（選用，台灣讀者較快）
Cloudflare → **Workers & Pages → Create → Pages → Connect to Git** → 選 `myblog`：
- Build command：`npm run build:cloudflare`
- Build output directory：`dist`
- 環境變數：`NODE_VERSION` = `24`

專案名稱若不是 `lawrence-blog`，請改 `package.json` 裡 `build:cloudflare` 的 `SITE_URL`。

---

## 指令速查

| 指令 | 用途 |
|---|---|
| `npm run new -- 名稱` | 新增文章 |
| `npm run dev` | 本機預覽（含草稿） |
| `npm run images` | 壓縮過大的原始照片 |
| `npm run build` | 產生網站到 `dist/`（通常不用手動跑） |
| `npm run preview` | 預覽 `dist/` 的正式版本 |

## 檔案位置

| 位置 | 內容 |
|---|---|
| `src/content/posts/` | 所有文章（每篇一個資料夾） |
| `src/config.ts` | 網站設定 |
| `src/pages/` | 頁面：首頁、文章、標籤、關於、404 |
| `src/pages/about.astro` | 「關於我」內容 |
| `src/components/`、`src/layouts/` | 版面元件 |
| `src/styles/global.css` | 顏色、字體、文章樣式 |
| `src/assets/` | 首頁封面、大頭照 |
| `src/redirects.json` | 舊 Hexo 網址 → 新網址對照表 |
| `tools/` | 新增文章、壓縮照片、Hexo 轉換工具 |
