# 部落格使用手冊

現在的架構：**Hexo 8 + Node 24**，原始碼放在 GitHub `master` 分支，
**push 之後 GitHub Actions 會自動建置並發佈**，不用再在本機跑 `hexo deploy`。

```
寫文章 → npm run images → npm run server（本機預覽）→ git commit → git push → 自動上線（約 1–2 分鐘）
```

---

## 一、一次性設定（只需做一次）

### 1. 讓終端機使用 Node 24

Node 24 已安裝在 `~/.local/node24`（沒有動到系統原本的 Node 12）。
把它加到 PATH，以後打開終端機就會用新版：

```bash
echo 'export PATH="$HOME/.local/node24/bin:$PATH"' >> ~/.zshrc
```

重新開一個終端機視窗後確認：

```bash
node -v
```

應該顯示 `v24.x.x`。

> 之後若想改用 Homebrew 管理：先執行 `sudo xcodebuild -license accept`，再 `brew install node@24`。

### 2. GitHub Pages 改成由 Actions 發佈

1. 打開 https://github.com/LawrenceGao0224/myblog/settings/pages
2. **Build and deployment → Source** 選 **GitHub Actions**
3. push 一次 `master`，到 repo 的 **Actions** 分頁看「Deploy blog」變成綠色勾勾就完成了

網址不變：https://lawrencegao0224.github.io/myblog/
舊的 `gh-pages` 分支之後可以刪除（確認新流程正常後再刪）。

---

## 二、日常使用

### 寫新文章

```bash
npx hexo new "文章網址名稱"
```

會產生：
- `source/_posts/文章網址名稱.md`：文章內容
- `source/_posts/文章網址名稱/`：放這篇文章的照片

文章開頭（front-matter）範例：

```yaml
---
title: 泰國清邁 2026.07.13~2026.07.22
subtitle: 超多市集、夜市，東西便宜～
date: 2026-07-24 16:44:36
catalog: true          # 右側顯示目錄
header-img: header.jpg # 封面圖（放在同名資料夾裡）
tags:
- Travel
categories:
- Blog
---
```

插入照片（照片放在同名資料夾裡，直接寫檔名）：

```html
<img src="1.jpg" width=300 />
```

插入 Google 地圖：直接貼 Google 地圖「分享 → 嵌入地圖」的 iframe 即可，手機上會自動縮放。

### 壓縮照片（每次加照片後都要做）

```bash
npm run images
```

- 會把 `source/` 裡超過 600 KB 的照片縮到最長邊 1600px（封面 1920px）
- **會直接覆蓋原檔**，想保留原圖請先另外備份
- GitHub Actions 每次發佈前會自動檢查，若有過大的照片，發佈會失敗並列出檔名

### 本機預覽

```bash
npm run server
```

打開 http://localhost:4000/myblog/ ，存檔後重新整理就能看到變化。按 `Ctrl + C` 停止。

### 發佈

```bash
git add -A
git commit -m "新增：清邁遊記"
git push
```

push 後到 GitHub repo 的 **Actions** 分頁可以看進度，1–2 分鐘後上線。
如果紅色叉叉失敗，點進去看錯誤訊息（最常見的是照片太大 → 執行 `npm run images` 後重新 commit）。

---

## 三、選用功能（填好設定就會生效，留空則不載入）

都在 `_config.yml` 裡，改完 commit + push 即可。

### 流量統計：Google Analytics 4

1. 到 https://analytics.google.com 建立「資源」→ 網站資料串流，網址填 `https://lawrencegao0224.github.io/myblog/`
2. 複製「評估 ID」（格式 `G-XXXXXXXXXX`）
3. 填入 `_config.yml`：`ga4_id: G-XXXXXXXXXX`

### 流量統計：Cloudflare Web Analytics（免費、不用 cookie，二選一或都用）

1. 登入 Cloudflare → **Analytics & Logs → Web Analytics → Add a site**
2. 填入網址，複製 snippet 裡的 `token` 值
3. 填入 `_config.yml`：`cf_analytics_token: 你的token`

### 留言功能：giscus

留言會存在 GitHub Discussions，讀者用 GitHub 帳號登入留言。

1. 到 https://github.com/LawrenceGao0224/myblog/settings → **Features** 勾選 **Discussions**
2. 安裝 giscus app：https://github.com/apps/giscus → 只選 `myblog` repo
3. 到 https://giscus.app/zh-TW ，repo 填 `LawrenceGao0224/myblog`，分類選 **Announcements**
4. 頁面下方會產生程式碼，把 `data-repo-id` 和 `data-category-id` 的值填入 `_config.yml`：

```yaml
giscus:
  repo: LawrenceGao0224/myblog
  repo_id: R_xxxxxxxx
  category: Announcements
  category_id: DIC_xxxxxxxx
```

### 改用 Cloudflare Pages（台灣讀者較快，可與 GitHub Pages 並存）

1. 登入 https://dash.cloudflare.com → **Workers & Pages → Create → Pages → Connect to Git**
2. 選 `LawrenceGao0224/myblog`，設定：
   - Production branch：`master`
   - Build command：`npm run build:cloudflare`
   - Build output directory：`public`
   - 環境變數：`NODE_VERSION` = `24`
3. 專案名稱建議取 `lawrence-blog`，網址會是 https://lawrence-blog.pages.dev
   若取別的名字或綁自訂網域，請修改 `_config.cloudflare.yml` 裡的 `url`

之後每次 push，GitHub Pages 和 Cloudflare Pages 會同時更新。

---

## 四、常用指令速查

| 指令 | 用途 |
| --- | --- |
| `npx hexo new "名稱"` | 新增文章 |
| `npm run images` | 壓縮過大的照片 |
| `npm run images -- --check` | 只檢查不壓縮 |
| `npm run server` | 本機預覽 |
| `npm run build` | 產生網站到 `public/`（通常不用手動跑） |
| `git push` | 發佈 |

## 五、檔案說明

| 檔案 | 用途 |
| --- | --- |
| `_config.yml` | 網站主設定（標題、統計、留言） |
| `_config.cloudflare.yml` | Cloudflare Pages 專用網址設定 |
| `.github/workflows/deploy.yml` | 自動部署流程 |
| `tools/optimize-images.mjs` | 照片壓縮工具 |
| `themes/beantech/source/css/responsive.css` | 手機版面修正 |
| `BLOG-REVIEW.md` | 上次校稿中待你確認的文字 |
