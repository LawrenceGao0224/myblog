# 發文操作手冊

這份手冊教你從零開始寫一篇文章、放照片、預覽，到發佈上線。
最後附上常見錯誤的解法和撰寫建議。

> **一句話流程**
> `npm run new -- 名稱` → 寫文章、放照片 → `npm run images` → `npm run dev` 預覽 → `git push` 上線

---

## 0. 開始前（每次開終端機都要確認）

所有指令都在部落格資料夾裡執行：

```bash
cd ~/myBlog
```

確認 Node 是新版（要顯示 `v24.x.x`）：

```bash
node -v
```

如果顯示 `v12`，代表還沒設定 PATH，執行一次這行就好（以後開新視窗都會生效）：

```bash
echo 'export PATH="$HOME/.local/node24/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc
```

---

## 1. 建立新文章

```bash
npm run new -- kyoto-2027
```

`kyoto-2027` 是文章的**網址名稱**，文章網址會是
`https://lawrencegao0224.github.io/myblog/posts/kyoto-2027/`

**命名規則**
- 只能用**小寫英文、數字、`-`**，例如 `kyoto-2027`、`taipei-marathon`
- 不能有空格、中文、大寫
- **發佈後不要再改名**，否則舊網址會失效，別人分享出去的連結會壞掉

執行後會產生一個資料夾：

```
src/content/posts/kyoto-2027/
└── index.md      ← 文章內容
```

照片也放在這個資料夾裡。

---

## 2. 填寫文章開頭（front-matter）

打開 `index.md`，最上面兩條 `---` 之間是文章設定：

```yaml
---
title: 京都賞楓 2027.11.20~2027.11.25
description: 清水寺、嵐山、伏見稻荷，五天四夜慢慢走
published: 2027-11-28T20:00:00+08:00
cover: ./header.jpg
tags:
- Travel
category: Blog
draft: true
---
```

| 欄位 | 必填 | 說明 |
|---|---|---|
| `title` | ✅ | 文章標題。沒填會無法建置 |
| `description` | | 副標題。會顯示在首頁卡片、輪播、文章開頭和 Google 搜尋結果，**強烈建議填** |
| `published` | ✅ | 發佈時間，決定文章排序。格式照抄範例，`+08:00` 代表台灣時間 |
| `cover` | | 封面圖。**有封面的最新 5 篇會出現在首頁輪播**，沒封面的不會 |
| `tags` | | 標籤，可以多個。頁首選單「旅遊／生活／工作」分別對應 `Travel`／`Blog`／`Work` |
| `category` | | 分類，只能一個。目前用 `Blog` 或 `Work` |
| `toc` | | 是否顯示目錄，預設 `true`。短文可以寫 `toc: false` |
| `draft` | | `true` = 草稿：本機預覽看得到、**不會發佈**。寫完要刪掉這行或改成 `false` |

**注意**
- 冒號後面要有**一個半形空格**：`title: 京都`（✅）、`title:京都`（❌）
- 標題如果有半形冒號 `:` 或以 `#`、`[` 開頭，要用引號包起來：`title: "東京：第一天"`
- 標籤大小寫要一致：`Travel` 和 `travel` 會變成兩個不同的標籤
- `tags` 每一行前面是 `- `（減號＋空格）

---

## 3. 寫內文（Markdown 語法）

### 標題層級

```markdown
# 行前準備          ← 大段落（會出現在目錄）
## Day 1            ← 小段落（會出現在目錄，縮排）
### 午餐            ← 更小的段落（不會出現在目錄）
```

目錄只顯示 `#` 和 `##`。遊記建議：`#` 放「行前準備／行程／心得／總花費」，`##` 放「Day 1、Day 2…」。

### 常用語法

```markdown
一般段落，直接打字。
按 Enter = 換行（同一段）。

空一行 = 新段落（段落之間會有間距）。

**粗體**、*斜體*

> 引用文字（會以琥珀色線條＋斜體凸顯，適合放心得重點）

- 清單項目
- 清單項目

1. 有編號的清單
2. 第二項

[連結文字](https://www.example.com)

---              ← 分隔線（顯示為 · · ·）
```

### 插入照片

1. 把照片放進文章資料夾（和 `index.md` 同一層）
2. 在內文寫：

```markdown
![清水寺的夕陽](./1.jpg)
```

- **一定要 `./` 開頭**
- 中括號裡是照片說明，給視障讀者和 Google 用。可以留空 `![](./1.jpg)`，但建議寫
- 讀者點照片會放大全螢幕
- 不用自己縮圖或轉格式，網站會自動轉成 WebP、產生手機／平板／電腦三種尺寸

### 插入 Google 地圖

Google 地圖 → 搜尋地點 → **分享** → **嵌入地圖** → **複製 HTML**，直接貼進內文：

```html
<iframe src="https://www.google.com/maps/embed?pb=..." width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
```

寬高不用改，手機上會自動縮放。

### 插入 YouTube 影片

最簡單的方式是放連結：

```markdown
[旅遊影片回憶：YouTube](https://www.youtube.com/watch?v=xxxx)
```

想直接嵌入播放器：YouTube 影片 → **分享** → **嵌入** → 複製 iframe 貼上。

### 強調文字（螢光筆效果）

```html
<mark>總花費：65194 台幣</mark>
```

---

## 4. 照片規則（最常出錯的地方）

| 規則 | 原因 |
|---|---|
| **檔名用英文小寫或數字**：`1.jpg`、`header.jpg`、`kiyomizu.jpg` | 中文、空格容易出問題 |
| **檔名大小寫要和文章裡寫的完全一樣** | Mac 不分大小寫，GitHub 有分。文章寫 `1.jpg` 但檔案是 `1.JPG`，在你電腦正常，上線就壞 |
| **副檔名用 `.jpg`、`.png`、`.webp`** | iPhone 預設的 `.HEIC` 不能用，分享時選「最相容」或先轉成 JPG |
| **單張超過 600 KB 要先壓縮** | 執行 `npm run images`，否則發佈會失敗 |
| **封面圖用橫的** | 輪播和卡片會裁成橫幅，直式照片會只剩中間一段 |
| **封面圖寬度至少 1600px** | 輪播是滿版大圖，太小會模糊 |

### 壓縮照片

放完照片後執行：

```bash
npm run images
```

- 超過 600 KB 的照片會縮到最長邊 1600px（封面 1920px）
- **會直接覆蓋原檔**，想留原圖請先另外備份
- 只想檢查不想改檔：`npm run images -- --check`

### 隱私提醒：照片的 GPS 位置

手機拍的照片通常帶有 **GPS 位置**（拍攝地點）。

- **網站上顯示的照片**：會自動移除位置資訊，讀者看不到 ✅
- **GitHub 上的原始照片**：會保留位置資訊。你的 GitHub repo 是公開的，任何人都能下載原檔查看拍攝地點 ⚠️

住家、公司附近拍的照片，放進文章資料夾前請先移除位置：
- **iPhone**：照片 App → 選照片 → 分享 → 左上「選項」→ 關閉「位置」→ 儲存到檔案
- **Mac**：預覽程式打開 → 工具 → 顯示檢閱器 →「ⓘ」→ GPS 分頁 →「移除位置資訊」

---

## 5. 本機預覽

```bash
npm run dev
```

打開 http://localhost:4321/myblog/

- 存檔後畫面會自動更新
- **草稿（`draft: true`）在這裡看得到**，上線後看不到
- 記得用瀏覽器的手機模式也看一下（Chrome：右鍵 → 檢查 → 左上角手機圖示）
- 按 `Ctrl + C` 停止

---

## 6. 發佈上線

### 發佈前檢查清單

- [ ] `title`、`description`、`published` 都填了
- [ ] 刪掉 `draft: true`
- [ ] 有封面圖 `cover`（想上首頁輪播的話）
- [ ] 執行過 `npm run images`，顯示「照片大小都 OK」
- [ ] `npm run dev` 預覽過，照片都有出來

### 發佈

```bash
git add -A
```

```bash
git commit -m "新增：京都賞楓"
```

```bash
git push
```

約 **1–2 分鐘**後上線。
到 https://github.com/LawrenceGao0224/myblog/actions 可以看進度：
- 🟡 黃色 = 進行中
- ✅ 綠色勾勾 = 成功
- ❌ 紅色叉叉 = 失敗，網站維持舊版本，不會壞掉（看第 8 節）

上線後如果看到的還是舊畫面，按 **Cmd + Shift + R** 強制重新整理。

---

## 7. 修改、刪除、草稿

**修改已發佈的文章**：直接改 `index.md`，存檔後照第 6 節 `git add / commit / push`。

**修改發佈日期**：改 `published`，文章在首頁的排序會跟著變。

**先存草稿、之後再發**：保留 `draft: true` 照樣 commit + push，上線也看不到；寫完再刪掉那行重新 push。

**刪除文章**：刪掉整個 `src/content/posts/文章名稱/` 資料夾，再 commit + push。

**調整首頁右側「推薦閱讀」**：改 `src/config.ts` 的 `FEATURED`，填文章資料夾名稱：

```ts
export const FEATURED = ['kyoto-2027', 'japan-tokyo', 'alishan'];
```

---

## 8. 常見錯誤與解法

錯誤訊息會出現在終端機（`npm run dev`／`npm run images`）或 GitHub Actions 的紅色叉叉裡。

| 看到的訊息 | 原因 | 解法 |
|---|---|---|
| `檔名不符：…寫的是 1.JPG，實際檔名是 1.jpg` | 大小寫不一致 | 把文章裡的檔名改成和實際檔案一樣 |
| `有 N 張照片過大` | 照片超過 600 KB | 執行 `npm run images`，再 commit + push |
| `Could not find requested image ./xxx.jpg` | 照片不存在或檔名打錯 | 檢查檔案是否在文章資料夾裡、檔名是否正確、有沒有 `./` |
| `does not match collection schema` 加上 `title: Required` | 少了 `title`，或 `title:` 後面沒空格 | 補上標題，冒號後加一個空格 |
| `does not match collection schema` 加上 `published: Expected type "date"` | 日期格式錯 | 照範例寫：`2027-11-28T20:00:00+08:00` |
| `Nested mappings are not allowed…`（下面會用 `^` 指出位置） | 標題裡有半形冒號 `:` | 整個標題用引號包起來：`title: "京都: 第一天"` |
| 其他看不懂的錯誤，或指令完全跑不起來 | 可能用到舊版 Node | 執行 `node -v`，不是 `v24` 就照第 0 節設定 |
| 預覽時新文章沒出現 | 還是草稿？ | 正式上線看不到草稿；本機 `npm run dev` 應該看得到 |
| 上線後首頁沒變 | 瀏覽器快取 | Cmd + Shift + R |

**小提醒**：日期寫錯但「看起來像日期」時不會報錯，例如 `2027-13-45` 會被當成 2028 年 2 月。發佈前在預覽確認一下日期。

---

## 9. 撰寫建議

### 讓文章更好讀
- **段落短**：手機上 3–4 行就換段，大段文字很難讀
- **善用 `##` 分天**：讀者可以從目錄直接跳到想看的那天
- **一個重點一張照片**：照片放在說明文字的正下方，比一次放 10 張好讀
- **用引用框放心得**：`> 一句話總結`，讀者掃一眼就知道重點
- **文末放實用資訊**：總花費、交通方式、推薦清單，讀者最常回來查的就是這些

### 讓更多人看到
- **一定要寫 `description`**：Google 搜尋結果和社群分享預覽都會用它
- **標題放關鍵字**：`京都賞楓 5 天自由行 2027.11` 比 `秋天的旅行` 容易被搜尋到
- **封面選最好看的一張**：首頁輪播、卡片、Facebook/LINE 分享預覽都用它

### 避免的事
- 不要放身分證、護照、機票、登機證等含個資的照片
- 不要直接貼別人的文章或照片，引用請附來源連結
- 發佈後不要改資料夾名稱（網址會變）

---

## 10. 範本：遊記

可以直接複製這段開始寫：

```markdown
---
title: 地點 YYYY.MM.DD~YYYY.MM.DD
description: 一句話形容這趟旅行
published: 2027-01-01T20:00:00+08:00
cover: ./header.jpg
tags:
- Travel
category: Blog
draft: true
---

> 這趟旅行最想記住的一句話

[旅遊影片回憶：YouTube](https://www.youtube.com/...)

# 行前準備

1. 簽證／入境文件
2. 換匯
3. 網路（eSIM／WiFi 機）

# 行程

## Day 1

抵達、入住。

![住宿外觀](./1.jpg)

## Day 2

![景點](./2.jpg)

# 總花費

<mark>總花費：00000 台幣</mark>

| 項目 | 金額 |
|---|---|
| 機票 | |
| 住宿 | |
| 交通 | |
| 餐飲 | |

# 心得

寫下這趟旅行的感想。
```
