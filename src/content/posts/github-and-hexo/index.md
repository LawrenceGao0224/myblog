---
title: Hexo & GitHub 建置部落格
description: 採用Hexo建置
published: '2020-09-02T11:02:53+08:00'
slug: github-and-hexo
cover: ./head.jpg
tags:
- Work
category: Work
toc: true
---
> 原本抱著想充實自己的想法 並且能應用於求職面試
> 開始製作自己的部落格
> 每寫完一篇就有成就感
> 更能記錄自己生活的點滴

---

# 開始撰寫Blog動機

現在科技的快速進步與影音發達，大部分人只憑藉著手機或電視媒體獲取新知，然而最近讀過一篇文章 [美國新一波教育革命：寫作真的很重要](https://www.cw.com.tw/article/5009267)，說明寫作的重要性，對於自我發展能力的培養，可學習組織零碎的知識與片段的數據進行重組，並以自身理解的方式再傳達出去，因此要學習，必須要會寫作。
同時想鍛鍊自己並能記錄自己的生活點滴，此外讓企業容易發覺你的價值，因此決心開始撰寫

歸納了寫文章的好處：
* 增加溝通技巧：幾乎在任何場合、地點都會運用到寫作技巧，不論是書信、簡報等，尤其我們說話是透過大腦組織邏輯結構，長期書寫可以更有系統性的組織自己的邏輯思維，幫助自己在與人溝通時，能完整的闡述自己的想法。未來遠距工作是個趨勢，寫作能力也將更為重要。
* 與自我對話、探索自我：在一天的工作後，我們經常會感到疲累，想要做一些「無腦」的事情，如：追劇、打機、看電視等等。相信很多人都會有同感，在娛樂過後，自己的感覺還是一樣疲累。其實腦袋就正需要整理、打掃。從寫日記的過程，我們可以取回思緒的「主導權」，將精力集中在真正在乎的問題上，再抽絲剝繭，引發出新意念去解決問題。相信大家偶爾會產生一個想法：人生到底是為了什麼？在這繁華的大都市裡，又有多少人真正的知道自己在追求什麼呢？剛開始除了記下每日發生的事、天氣狀況，它亦能幫你發掘自我、探索自我，當開始把寫日記當成習慣，會慢慢從自己所撰寫的內容了解自己真正喜歡的事，自己的快樂泉源何來，識別令自己開心的事，到再次有的時間，能把握機會好好享受；識別令自己不開心的事，想辦法改善它。
* 減低壓力與焦慮：日常生活中，每天都面對有許多挑戰與問題，在不知不覺中， 累積了許多壓力，這時最需要花時間靜下心來整理思緒，觀察自己的狀態。然而在這繁忙的網路通訊時代，休息時間被3C產品給佔據，缺少了這些「反省」的時間，產生許多精神疾病，而日記撰寫，紀錄生活觀察每天的生活狀態，一方面可以紓解壓力，另一方面審視自己所遇到的問題，幫助面對每天的壓力，日記對心理健康的效用具有大量科學實證。
* 記錄每一刻：當開始記錄，會發現自己每天都在處理大大小小的事情，其實我們做的事情很多，但是因為沒有記錄，導致自己完全忘了一乾二淨，也不知道自己學到了什麼經驗或教訓，或是對曾經處理過的難題有什麼樣的想法。有記錄就會累積各式各樣的經驗，下次再碰到比較不會重蹈覆轍。
* 學習能力提升：在樊登的「讀懂一本書」中提到，許多人讀完書就忘，複習一段時間後一樣忘記，這就是大腦並未將這個知識產生連結，藉由撰寫文章、輸出知識，讓讀過的文章在腦中產生連結，當每天都這麼做，這些連結會在腦中累積起來，形成一個完整的知識體系，未來在處理問題的時候，腦中就有很多想法，隨時調用出來，來解決眼前的問題。

---

# 工具選擇 & Why選擇HEXO

起初有使用過Webnode建立過個人部落格還有著名的WordPress架站，但是需要購買個人網域，因此不想花錢的只能自己欣賞而無法分享給朋友，此外也使用過網路教學HTML5模板搭配GitHub，但是在撰寫新的頁面時，需顧及程式面及美觀，無法專心創作，因此也決定放棄這方法，最後在看到HEXO的部落格建立方法，決定使用它。

---

# HEXO  介紹
* 技術轉移
    * 純 AJAX
    * Jekyll: 
        * ruby sass（資料量多，太慢10-100x差距）
        * 不須預先編譯
    * Hexo: 
        * node.js sass
* 繁中文件
    * 主要為台灣開發者
    * 眾多的中國協作者
* 是一個靜態網站產生器 → 沒有資料庫（無法讓用戶改變內容）
* 可以部署在 Github 上
    * 免費
    * 有著 Github 超潮網域
* 使用 Markdown 撰寫
    * 專注在寫文之上
    * 缺點是沒辦法主動帶圖片 （可解決:上傳圖庫 ex firebase 46:14)
* 大量地 Theme
    * 也可以自己做 Theme
* 額外插件
    * https://hexo.io/plugins/
    * 搜尋、gzip、sitemap、rss
* 外部工具
    * 留言板、Facebook 社群工具、GA...

---

# Hexo 流程

## Hexo前置作業

* 安裝 Node.js
* 教學
```bash
git clone https://github.com/ppoffice/hexo-theme-icarus.git themes/icarusor node.js
```
* 安裝 hexo CLI
```bash
npm install -g hexo-cli //可以讓hexo使用指令的工具
```
## 快速建立一個雛形
```bash
$ hexo init <folder>
$ cd <folder>
$ npm install
```
* 啟動 (本地端預覽)
```bash
hexo s //s=server ， localhost:4000
```
* 建立(編譯)靜態網站
```bash
hexo g //g=generate，生成public file
```
---
# Github 教學
## 初始化
```bash
//create a new repository
git init
git add.
git commit -m "git init"
```
## push
* push branch: master→原始碼
```bash
//push an existing repository
git remote add origin <Github account> //儲存庫路徑
git push -u origin master  //branch:master
push branch: gh-pages→public
```
## 修改 _config.yml
```yml
deploy:
  type: git
  repository: https://github.com/LawrenceGao0224/myblog.git
  branch: gh-pages
```
## push(deploy)
```bash
//push
npm install hexo-deployer-git --save //install hexo自動部署工具
hexo d //push public to branch:gh-pages
```
* 絕對路徑改成相對路徑，修改 _config.yml
```yml
relative_link: true
```
## 部署要點：
* {用戶名稱}.github.io 
    * 儲存庫名稱：{用戶名稱}.github.io
        * ex: LawrenceGao0224.github.io
        * 每個帳戶只有一個，能放在最根目錄的專案
    * Branch ：master
* {用戶名稱}.github.io/{專案名稱}
    * 儲存庫名稱：{用戶名稱}.github.io/{專案名稱}
        * ex: LawrenceGao0224.github.io/{專案名稱}
        * 任意、無數量限制
    * Branch ：gh-pages

本站所使用模板: [BeanTech豆科技](https://github.com/YenYuHsuan/hexo-theme-beantech/) 

---
# 總結
用到最後，基本上都使用三個指令在操作
```bash
hexo g   //g=generate，生成public file
hexo s   //s=server
hexo d   //push public to branch:gh-pages
```
> 祝大家也在使用Hexo順利～～～

# 更新

由於GitHub August 13, 2021 "support for password authentication was removed"
請參考以下連結：
[Fix GitHub's 'support for password authentication was removed' error](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Fix-GitHubs-support-for-password-authentication-was-removed-error)
