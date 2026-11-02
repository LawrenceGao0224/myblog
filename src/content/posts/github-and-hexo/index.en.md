---
title: Building a Blog with Hexo & GitHub
description: Built with Hexo
published: '2020-09-02T11:02:53+08:00'
slug: github-and-hexo
cover: ./head.jpg
tags:
- Work
category: Work
toc: true
---
> I originally wanted to build up my skills and have something to show in job interviews
> So I started making my own blog
> Every time I finish a post, I get a real sense of achievement
> And it's a great way to record the little moments of my life

---

# Why I Started Blogging

With technology moving so fast and video everywhere, most people get their news and knowledge from their phones or TV. But I recently read an article, [A New Wave of Education Reform in the US: Writing Really Matters](https://www.cw.com.tw/article/5009267), about why writing is so important. It helps you build the ability to take scattered pieces of knowledge and fragments of data, reorganize them, and pass them on in your own words — so if you want to learn, you have to be able to write.
I also wanted to push myself and keep a record of my life, and on top of that, a blog makes it easier for companies to see your value. So I decided to start writing.

Here are the benefits of writing that I've put together:
* Better communication skills: You use writing almost everywhere, whether it's letters, presentations or anything else. Speaking also depends on how your brain organizes logic, and writing regularly helps you structure your thinking more systematically, so you can fully get your ideas across when talking to people. Remote work is the future, and writing skills will only become more important.
* Talking to yourself and getting to know yourself: After a long day at work, we're often tired and just want to do something "mindless", like binge-watching shows, gaming or watching TV. I think a lot of people can relate — after all that entertainment, you still feel just as tired. What your brain actually needs is some sorting and tidying up. Keeping a journal lets you take back "control" of your thoughts, focus your energy on what you really care about, untangle things bit by bit, and come up with new ideas to solve problems. I'm sure everyone sometimes wonders: what is life really for? In this busy big city, how many people truly know what they're chasing? At first you might just write down what happened that day and what the weather was like, but it can also help you discover and explore yourself. Once journaling becomes a habit, you slowly figure out from your own writing what you really love and where your happiness comes from. Spot the things that make you happy, so you can make the most of them next time you have the chance; spot the things that make you unhappy, and find ways to improve them.
* Less stress and anxiety: Every day we face all kinds of challenges and problems, and without noticing it, stress piles up. That's exactly when we most need to slow down, sort out our thoughts and check in on how we're doing. But in this busy, always-online era, our downtime gets eaten up by gadgets, we lose that time for "reflection", and a lot of mental health problems follow. Journaling — recording your life and observing how you're doing each day — relieves stress on one hand, and on the other lets you look at the problems you're facing and helps you deal with daily pressure. There's plenty of scientific evidence for the mental health benefits of journaling.
* Recording every moment: Once you start keeping records, you realize you deal with all sorts of things, big and small, every single day. We actually do a lot, but without a record we completely forget it all — we don't know what experience or lessons we've gained, or what we thought about problems we've solved before. With records, you build up all kinds of experience, and you're less likely to make the same mistake the next time.
* Learning faster: In Fan Deng's "Understanding a Book", he points out that many people forget a book as soon as they finish it, and still forget it after reviewing for a while. That's because the brain hasn't made connections to that knowledge. By writing posts and putting knowledge out there, what you've read gets connected in your brain. Do this every day and those connections add up into a complete system of knowledge, so when you face problems in the future, you'll have plenty of ideas ready to pull out and solve whatever's in front of you.

---

# Choosing a Tool & Why HEXO

At first I built a personal blog with Webnode and also tried the famous WordPress, but both needed me to buy my own domain, so without paying I could only look at it myself and couldn't share it with friends. I also tried an HTML5 template from an online tutorial together with GitHub, but whenever I wrote a new page I had to worry about both the code and the design, and I couldn't focus on actually writing, so I gave up on that too. Finally I came across HEXO's way of building a blog and decided to go with it.

---

# HEXO  Introduction
* Tech stack
    * Pure AJAX
    * Jekyll: 
        * ruby sass (too slow with lots of data, a 10-100x difference)
        * No need to pre-compile
    * Hexo: 
        * node.js sass
* Traditional Chinese docs
    * Mostly Taiwanese developers
    * Lots of Chinese contributors
* It's a static site generator → no database (users can't change the content)
* It can be deployed on Github
    * Free
    * Comes with a super cool Github domain
* Written in Markdown
    * Focus on the content
    * The downside is it can't handle images on its own (workaround: upload to an image host, e.g. firebase 46:14)
* Tons of Themes
    * You can also make your own Theme
* Extra plugins
    * https://hexo.io/plugins/
    * Search, gzip, sitemap, rss
* External tools
    * Comment boards, Facebook social tools, GA...

---

# Hexo Workflow

## Hexo Setup

* Install Node.js
* Tutorial
```bash
git clone https://github.com/ppoffice/hexo-theme-icarus.git themes/icarusor node.js
```
* Install the hexo CLI
```bash
npm install -g hexo-cli //可以讓hexo使用指令的工具
```
## Quickly Spin Up a Prototype
```bash
$ hexo init <folder>
$ cd <folder>
$ npm install
```
* Start it up (local preview)
```bash
hexo s //s=server ， localhost:4000
```
* Build (compile) the static site
```bash
hexo g //g=generate，生成public file
```
---
# Github Tutorial
## Initialize
```bash
//create a new repository
git init
git add.
git commit -m "git init"
```
## push
* push branch: master → source code
```bash
//push an existing repository
git remote add origin <Github account> //儲存庫路徑
git push -u origin master  //branch:master
push branch: gh-pages→public
```
## Edit _config.yml
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
* Change absolute paths to relative paths by editing _config.yml
```yml
relative_link: true
```
## Deployment Key Points:
* {username}.github.io 
    * Repository name: {username}.github.io
        * ex: LawrenceGao0224.github.io
        * Only one per account — the project that lives at the root
    * Branch: master
* {username}.github.io/{project name}
    * Repository name: {username}.github.io/{project name}
        * ex: LawrenceGao0224.github.io/{project name}
        * Any name, no limit on how many
    * Branch: gh-pages

Theme used on this site: [BeanTech](https://github.com/YenYuHsuan/hexo-theme-beantech/) 

---
# Summary
In the end, I basically use just three commands
```bash
hexo g   //g=generate，生成public file
hexo s   //s=server
hexo d   //push public to branch:gh-pages
```
> Hope everyone has a smooth time with Hexo too~~~

# Update

As of August 13, 2021, GitHub "support for password authentication was removed"
Check out the link below:
[Fix GitHub's 'support for password authentication was removed' error](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Fix-GitHubs-support-for-password-authentication-was-removed-error)
