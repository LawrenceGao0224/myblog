# 部落格修正紀錄（2026-11-01）

## 已修正

- **版面（手機／電腦）**：新增 `themes/beantech/source/css/responsive.css`
  - Google 地圖 iframe 原本固定 600px，手機會被切掉 → 改為隨螢幕縮放（4:3）
  - 長網址、程式碼區塊不再撐破畫面
  - 手機版標題、內文字級調整；圖片保持原比例
- **設定錯誤**
  - `_config.yml` 的 `url` 原本是 GitHub repo 網址 → 改為 `https://lawrencegao0224.github.io/myblog`（修正 canonical / sitemap / 標籤雲）
  - 所有文章 front-matter 的 `catagories:` 拼錯 → `categories:`（分類頁現在會產生）
  - Font Awesome 改用 cdnjs（原本的 cdn.staticfile.org 不可靠）
  - `college-project` 的圖片誤放在 `chiangmai/college-project/` → 移到正確資料夾（原本該文圖片是破的）
- **圖片**：`source/` 從 932MB → 135MB
  - 內文照片最長邊 1280px、封面 1920px，JPEG 品質約 76–80
  - 38 張不透明的大 PNG 轉成 JPG，文章內引用已同步更新
  - **原始檔備份在** `/Users/LawrenceGao/myBlog-original-images-backup/`
- **錯字**：37 篇文章＋About 頁，修正錯字、同音字、地名／專有名詞、英文文法

## 需要你確認（不確定原意，未修改）

### Lookforjobs.md
- 「雲端低負載流程」是否為「負載平衡」？
- 「如何反應」→「如何回應」？
- Redhat → Red Hat？

### github-and-hexo.md
- 「到再次有的時間」語意不明
- 英文句「[A new wave of educational revolution...]」有中括號但沒有連結

### Jialuo.md
- 「Four Seasons Nursing Center」（養護所）可能改為 maintenance station 較貼切

### penghu.md
- 背包攻略的連結結尾是全形「）」，連結可能失效

### college-project.md / ARKit.md
- 中文段落有很多 PDF 複製留下的多餘空格（如「每年 約以」「達 文西」）
- ARKit：「這過程必須於 iOS 系統中完成」是否應為 macOS？「玄柱」是否為「圓柱／羅馬柱」？3DMAX → 3ds Max？

### Thailand.md
- 「高空滑樓」「沒有多加時間」語意不明；「Mekkog」是否拼錯？

### Mt-Pingfeng.md
- 引用資料寫「松林營地」，內文寫「松針營地」

### seattle-usa.md
- 第 109 行中間有多餘的「>」（`> 民族多元`）

### chiangmai.md
- 開頭說「只有最後一天下雨」，但 Day 6 寫清萊下了一整天雨
- 「我遇到甚至都還想免費請我吃東西」可能少了「的人」

### Japan-Tokyo.md
- Teamlab / TeamLab 不一致（官方為 teamLab）
- 「iron panel」是指鐵板？

### Tainan.md
- 「老幫手」是否為「小幫手」？「極為可創性的目標」語意不明

### Osaka-Universal.md
- 瑪莉歐／馬力歐／馬利歐三種寫法（台灣官方：瑪利歐）

### Kenting-WH.md
- 「麋谷 / Moose Valley」地名是否正確？「車程福安宮」是否為「行程」？

### san-francisco-usa.md
- 副標題寫 70、80 年代，內文寫 1960 年代
- 「叮叮車」是香港電車用語，舊金山是 cable car

### hanoi.md
- 「寧平碧洞 (Mua Cave)」：Mua Cave 是舞洞，碧洞是另一個景點

### AroundTaiwan.md
- 遺珠之憾有兩行「花蓮：」；石門洞、麻糬洞應在新北石門

### 其他
- Micron.md「穩重度」→「穩定度」？
- Yuanzui-Mountain.md「保旅平險」→「登山險」？
- 404.md「尚在推文中... :(」
