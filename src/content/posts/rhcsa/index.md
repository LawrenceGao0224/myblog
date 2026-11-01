---
title: Red Hat Certified System Administrator (RHCSA8)
description: 第一次上機考證照
published: '2022-05-06T21:04:33+08:00'
slug: rhcsa
cover: ./Red-Hat-logo.png
tags:
- Work
category: Work
toc: true
---
> I can accept failure, but cannot accept giving up
> 考了兩次才通過


# RHCSA介紹
RHCSA認證是Red Hat公司於2011年3月所推出的新認證。RHCSA認證是取得RHCE認證的必要條件之一，RHCSA與RHCE認證取得兩者無先後順序，兩者均通過者才可完整取得RHCE證書。擁有RHCSA認證者能夠扮演著企業內各式各樣的角色，舉凡資料庫管理員，開發人員和技術支持人員…等職務，能重建與部署企業核心Linux環境，更能代表您具備管理技術與駕馭系統的能力。欲取得RHCSA認證您必須參加此認證考試，成功讓您成為兼具完整理論與實作技術的Linux專家。
[(資料來源：UCOM恆逸教育訓練)](https://www.uuu.com.tw/Course/Partner/RedHat%E7%B4%85%E5%B8%BD/section=rhcsa/title=RHCSA%E8%AA%8D%E8%AD%89%E8%88%87%E8%80%83%E8%A9%A6%E4%BB%8B%E7%B4%B9)

# 考試測驗能力
可進入官網查看：[Red Hat Certified System Administrator (RHCSA) exam](https://www.redhat.com/en/services/training/ex200-red-hat-certified-system-administrator-rhcsa-exam?section=Objectives)

# 考題整理

網路整理考題：[https://github.com/chlebik/rhcsa-practice-questions/tree/master/questions](https://github.com/chlebik/rhcsa-practice-questions/tree/master/questions)

RedHat8之後開始考了許多Container題目，如：[https://tekneed.com/rhcsa-8-exam-practice-question-9-managing-containers/](https://tekneed.com/rhcsa-8-exam-practice-question-9-managing-containers/)

# 考試環境介紹
考試環境會提供兩台虛擬機，分別為node1, node2，（會建議開終端機連線兩台虛擬機，以方便複製考試時所用到的網址或名稱）

# 結論

1. 一定要一直反覆練習實作，才能訓練到，不能只用看的，因為可能發生你都想不到的問題。
2. 我考試時發生用root建立user，而user卻沒長出Home directory，後來才發現是當時系統沒裝好，但卻沒反映，硬是浪費快一個小時
3. 還有Container的題目，真的有點難，我不懂為什麼都沒拿到分，明明都有做
4. 切割完硬碟後，一定要重開機看看能不能開機，能不能自動mount起來
5. 有疑問要提出，有可能真的是系統問題
