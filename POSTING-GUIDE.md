# 發文操作手冊

這份手冊教你從零開始寫一篇文章：中文版、英文版、照片、YouTube 影片、預覽，到發佈上線。
最後附上常見錯誤的解法和撰寫建議。

> **一句話流程**
> `npm run new -- 名稱` → 寫中文版 → 寫英文版 → 放照片、貼影片網址 → `python3 tools/embed-youtube.py` → `npm run images` → `npm run dev` 預覽 → `git push` 上線

**目錄**
0. 開始前　1. 建立新文章　2. 文章開頭設定　**3. 中文版與英文版**　4. 寫內文　**5. 插入 YouTube 影片**
6. 照片規則　7. 本機預覽　8. 發佈上線　9. 修改、刪除、草稿　10. 常見錯誤　11. 撰寫建議　12. 範本

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
英文版網址是 `https://lawrencegao0224.github.io/myblog/en/posts/kyoto-2027/`

**命名規則**
- 只能用**小寫英文、數字、`-`**，例如 `kyoto-2027`、`taipei-marathon`
- 不能有空格、中文、大寫
- **發佈後不要再改名**，否則舊網址會失效，別人分享出去的連結會壞掉

執行後會產生一個資料夾：

```
src/content/posts/kyoto-2027/
├── index.md      ← 中文版
└── index.en.md   ← 英文版（預設是草稿，見第 3 節）
```

照片也放在這個資料夾裡，中英文版共用。

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

## 3. 中文版與英文版

網站是中英雙語。每篇文章資料夾裡有兩個檔案：

| 檔案 | 語言 | 網址 |
|---|---|---|
| `index.md` | 中文 | `/myblog/posts/kyoto-2027/` |
| `index.en.md` | 英文 | `/myblog/en/posts/kyoto-2027/` |

讀者按右上角 **EN** 會跳到同一篇的英文版，按 **中** 跳回中文版。

### 3.1 兩個檔案哪些要一樣、哪些不一樣

| 項目 | 中文版 `index.md` | 英文版 `index.en.md` |
|---|---|---|
| `title`、`description` | 中文 | 英文 |
| `published` | **一模一樣** | **一模一樣** |
| `cover` | **一模一樣**（`./header.jpg`） | **一模一樣** |
| `tags` | **一模一樣，用英文**：`Travel`、`Blog`、`Work` | **一模一樣** |
| `category` | **一模一樣**：`Blog` 或 `Work` | **一模一樣** |
| `toc`、`draft` | 依需要 | 依需要（可以不同，見 3.3） |
| 照片 | `![清水寺夕陽](./1.jpg)` | `![Sunset at Kiyomizu-dera](./1.jpg)`：**路徑一樣，說明翻譯** |
| YouTube 影片 | 中文說明 + 網址 | 英文說明 + **同一個網址** |
| Google 地圖 iframe | 貼一次 | **同一段原封不動再貼一次** |
| 標題層級（`#`、`##`） | 照你的結構 | **跟中文版一樣**，翻譯文字就好 |

**重要**
- **標籤不要翻譯**：中文版也寫 `Travel`，不要寫 `旅遊`。網站選單會自動顯示成「旅遊／生活／工作」或「Travel／Life／Work」。標籤寫成中文會變成另一個標籤，選單點不到。
- **照片只放一份**：兩個檔案共用同一個資料夾裡的照片，不用複製。
- **中文版只寫中文**：不要再在中文段落後面附英文翻譯，英文寫在 `index.en.md`。地名、品牌、技術名詞照常用英文沒關係（例如 Uniqlo、DisneySea、Python）。

### 3.2 建議的寫作流程

1. `npm run new -- kyoto-2027`，同時產生 `index.md` 和 `index.en.md`
2. **先寫中文版** `index.md`，照片、影片網址都放好
3. 預覽中文版確認沒問題
4. **寫英文版**：把中文版整篇複製到 `index.en.md`，再逐段翻譯（這樣圖片、影片、地圖、標題層級一定跟中文版一致）
5. 兩個檔案都刪掉 `draft: true`
6. 執行 `python3 tools/embed-youtube.py`（有貼影片的話，見第 5 節）
7. 預覽兩種語言：http://localhost:4321/myblog/ 和 http://localhost:4321/myblog/en/
8. 發佈

### 3.3 英文版還沒寫好怎麼辦？

英文版保持 `draft: true` 就好，中文版照常刪掉 `draft: true` 發佈：

- 中文網站：正常顯示這篇 ✅
- 英文網站：不會出現這篇（不會有空白或壞掉的頁面）✅
- 讀者在這篇中文文章按 **EN**：會到英文首頁，而不是 404 ✅

之後寫好英文版，刪掉 `index.en.md` 的 `draft: true` 再發佈一次即可。

### 3.4 請 AI 幫忙翻譯

可以把整篇 `index.md` 貼給 Claude，附上這段指示：

```text
請把這篇部落格文章翻成自然、口語的英文（第一人稱、旅遊部落格語氣）。
規則：
- front-matter：title、description 翻成英文；published、cover、tags、category、toc 完全不變
- 標題層級（#、##、###）、段落順序、換行都保持一樣
- 圖片路徑 ./xxx.jpg 不變，只翻譯中括號裡的說明
- iframe、<div class="videos">、<mark> 等 HTML 原封不動，只翻譯 <mark> 裡的文字
- 網址不變，翻譯連結文字
- 台灣的地名、小吃用拼音，第一次出現時括號附中文，例如 Jiufen (九份)
- 金額保留 NT$、¥ 等幣別
```

翻完貼進 `index.en.md`，**自己讀一遍**，特別是地名、店名、專有名詞。

### 3.5 修改已發佈的文章

改了中文版，記得英文版也要改對應的地方（反之亦然）：

- 換照片、加照片 → 兩個檔案都要加 `![...](./新照片.jpg)`
- 改日期、封面、標籤 → 兩個檔案都要改成一樣
- 改錯字、改文字 → 只改那個語言就好

### 3.6 只寫英文、不寫中文？

可以，但不建議（網站以中文為主）。做法：英文版刪掉 `draft: true`，中文版保持 `draft: true`。
這篇只會出現在英文網站，讀者在英文版按 **中** 會到中文首頁。

---

## 4. 寫內文（Markdown 語法）

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
- 英文版照片路徑一樣，只把說明翻成英文（見 3.1）
- 不用自己縮圖或轉格式，網站會自動轉成 WebP、產生手機／平板／電腦三種尺寸

### 插入 Google 地圖

Google 地圖 → 搜尋地點 → **分享** → **嵌入地圖** → **複製 HTML**，直接貼進內文：

```html
<iframe src="https://www.google.com/maps/embed?pb=..." width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
```

寬高不用改，手機上會自動縮放。

### 插入 YouTube 影片

見第 5 節。

### 強調文字（螢光筆效果）

```html
<mark>總花費：65194 台幣</mark>
```

---

## 5. 插入 YouTube 影片

不用自己寫 HTML：**貼網址 → 執行一個指令**，就會變成可以直接在文章裡播放的影片。

### 5.1 三個步驟

**步驟 1**：在文章裡貼 YouTube 網址，**一行一個**，前面可以加說明文字：

```markdown
清邁旅遊影片：https://www.youtube.com/shorts/FVwDx9CRbL8
```

**步驟 2**：在部落格資料夾執行：

```bash
python3 tools/embed-youtube.py
```

它會掃描**所有文章的中文版和英文版**，把影片網址換成播放器，並列出改了哪幾篇。

**步驟 3**：`npm run dev` 預覽，確認影片出現、可以播放。

> 這個指令可以重複執行，已經轉過的不會再轉一次。

### 5.2 寫法與結果

| 你寫的 | 轉換後 |
|---|---|
| `https://www.youtube.com/watch?v=XXXX`（單獨一行） | 只有影片 |
| `京都影片：https://youtu.be/XXXX` | 上面一行文字「京都影片」，下面是影片 |
| `[第一天 vlog](https://www.youtube.com/watch?v=XXXX)` | 上面一行文字「第一天 vlog」，下面是影片 |
| `https://www.youtube.com/watch?v=XXXX&t=95s` | 影片會從 **1 分 35 秒**開始播（`t=1m35s`、`t=95` 也可以） |
| `https://www.youtube.com/shorts/XXXX` | 自動用**直式** 9:16 比例 |

**支援的網址格式**：`youtube.com/watch?v=`、`youtu.be/`、`youtube.com/shorts/`、手機版 `m.youtube.com`；後面帶 `?si=...` 之類的參數也沒關係。

### 5.3 好幾支影片：自動並排

連續的影片網址（中間只有空行，沒有其他文字）會放在同一組：

```markdown
清邁短影音：
https://www.youtube.com/shorts/AAAA
https://www.youtube.com/shorts/BBBB
https://www.youtube.com/shorts/CCCC
```

- **Shorts 直式影片**：電腦上一排並排三支，手機上一排一支
- **一般橫式影片**：每支都是整個內文寬度（16:9）
- 想要**分開成不同組**：中間寫一行文字（或寫不同的說明）

```markdown
Day 1：https://youtu.be/AAAA

Day 2：https://youtu.be/BBBB
```

### 5.4 英文版怎麼寫

英文版貼**同一個網址**，說明改成英文，一樣執行 `python3 tools/embed-youtube.py`（同一個指令會一起處理中英文）：

| 中文版 `index.md` | 英文版 `index.en.md` |
|---|---|
| `旅遊影片回憶：https://youtu.be/XXXX` | `Trip video: https://youtu.be/XXXX` |

如果中文版已經轉成播放器了，也可以直接把中文版那段 `<div class="videos">…</div>` **整段複製**到英文版，只把上面那行說明翻成英文。

### 5.5 不會被轉換的情況

| 情況 | 結果 | 怎麼辦 |
|---|---|---|
| 播放清單 `youtube.com/playlist?list=...` | 保持一般連結 | 改貼單支影片網址 |
| 頻道 `youtube.com/@xxx`、`/channel/...` | 保持一般連結 | 這是正常的，頻道沒辦法嵌入 |
| 網址在程式碼區塊 ```` ``` ```` 裡 | 不轉換 | 正常，程式碼不會被改 |
| 網址夾在句子中間：`我拍了 https://youtu.be/XXXX 很好看` | 會轉換，但句子中間留下一個空洞 | **網址放在一行的最後**或**自己一行** |

### 5.6 想自己寫 HTML

不用工具也可以，複製這段、把 `影片ID` 換掉（網址 `watch?v=` 後面那 11 個字元）：

```html
<div class="videos">
<iframe class="yt" src="https://www.youtube-nocookie.com/embed/影片ID" title="YouTube video" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
```

- Shorts 直式影片：`class="yt"` 改成 `class="yt short"`
- 從第 95 秒開始：`embed/影片ID?start=95`
- **`<div class="videos">` 前後要各空一行**，否則下一段文字可能不會正常顯示
- 不建議直接用 YouTube「分享 → 嵌入」複製的原始碼：網站會把它當成一般 iframe，顯示成 4:3，影片上下會有黑邊，Shorts 也不會是直的

### 5.7 注意事項

- 影片要是**公開**或**不公開（有連結的人可看）**。**私人**影片讀者看不到
- 如果影片上傳者關閉了「允許嵌入」，播放器會顯示「影片無法播放」，這時改用一般連結 `[影片標題](網址)`
- 播放器用 `youtube-nocookie.com`：讀者按播放前不會被 YouTube 追蹤
- 播放器只在讀者捲到附近時才載入，不會拖慢頁面

---

## 6. 照片規則（最常出錯的地方）

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

## 7. 本機預覽

```bash
npm run dev
```

打開 http://localhost:4321/myblog/

- 存檔後畫面會自動更新
- **草稿（`draft: true`）在這裡看得到**，上線後看不到
- 記得用瀏覽器的手機模式也看一下（Chrome：右鍵 → 檢查 → 左上角手機圖示）
- 按 `Ctrl + C` 停止

---

## 8. 發佈上線

### 發佈前檢查清單

- [ ] `title`、`description`、`published` 都填了
- [ ] 中文版刪掉 `draft: true`
- [ ] 英文版 `index.en.md` 寫好並刪掉 `draft: true`，或保持 `draft: true` 之後再補
- [ ] 中英文的 `published`、`cover`、`tags`、`category` 一樣
- [ ] 有貼影片的話，執行過 `python3 tools/embed-youtube.py`
- [ ] 有封面圖 `cover`（想上首頁輪播的話）
- [ ] 執行過 `npm run images`，顯示「照片大小都 OK」
- [ ] `npm run dev` 預覽過中文版和英文版（`/myblog/en/`），照片、影片都有出來

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
- ❌ 紅色叉叉 = 失敗，網站維持舊版本，不會壞掉（看第 10 節）

上線後如果看到的還是舊畫面，按 **Cmd + Shift + R** 強制重新整理。

---

## 9. 修改、刪除、草稿

**修改已發佈的文章**：直接改 `index.md`（和 `index.en.md`，見 3.5），存檔後照第 8 節 `git add / commit / push`。

**修改發佈日期**：改 `published`，文章在首頁的排序會跟著變。

**先存草稿、之後再發**：保留 `draft: true` 照樣 commit + push，上線也看不到；寫完再刪掉那行重新 push。中英文的 `draft` 各自獨立。

**刪除文章**：刪掉整個 `src/content/posts/文章名稱/` 資料夾（中英文一起刪），再 commit + push。

**調整首頁右側「推薦閱讀」**：改 `src/config.ts` 的 `FEATURED`，填文章資料夾名稱：

```ts
export const FEATURED = ['kyoto-2027', 'japan-tokyo', 'alishan'];
```

---

## 10. 常見錯誤與解法

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
| 英文網站看不到新文章 | `index.en.md` 還是 `draft: true` | 寫好後刪掉那行 |
| 中文文章按 EN 跑到英文首頁，不是這篇 | 英文版還是草稿或不存在 | 同上；這是刻意的，避免讀者看到壞掉的頁面 |
| 選單「旅遊」點進去找不到這篇 | 標籤寫成中文 `旅遊` | 中英文版都寫 `Travel`（見 3.1） |
| 執行 `embed-youtube.py` 後網址沒變成影片 | 網址是播放清單／頻道，或在程式碼區塊裡 | 見 5.5 |
| 影片顯示「影片無法播放」 | 私人影片，或上傳者禁止嵌入 | 改成公開／不公開，或改用一般連結 |
| 影片下一段的文字格式怪怪的 | 自己寫的 `<div class="videos">` 前後沒空行 | 前後各空一行 |

**小提醒**：日期寫錯但「看起來像日期」時不會報錯，例如 `2027-13-45` 會被當成 2028 年 2 月。發佈前在預覽確認一下日期。

---

## 11. 撰寫建議

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

## 12. 範本：遊記（中文＋英文）

### 中文版 `index.md`

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

旅遊影片回憶：https://www.youtube.com/shorts/影片ID

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

### 英文版 `index.en.md`

```markdown
---
title: Place YYYY.MM.DD~YYYY.MM.DD
description: One line about this trip
published: 2027-01-01T20:00:00+08:00
cover: ./header.jpg
tags:
- Travel
category: Blog
draft: true
---

> The one thing I want to remember from this trip

Trip video: https://www.youtube.com/shorts/影片ID

# Preparation

1. Visa / entry documents
2. Currency exchange
3. Internet (eSIM / pocket Wi-Fi)

# Itinerary

## Day 1

Arrived and checked in.

![Our stay](./1.jpg)

## Day 2

![Sightseeing](./2.jpg)

# Total cost

<mark>Total: NT$00000</mark>

| Item | Cost |
|---|---|
| Flights | |
| Accommodation | |
| Transport | |
| Food | |

# Thoughts

What I took away from this trip.
```

注意兩個檔案的 `published`、`cover`、`tags`、`category`、照片路徑、影片網址都一樣，只有文字不同。
