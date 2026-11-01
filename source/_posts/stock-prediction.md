---
title: "股價走勢預測-Stock Prediction "
catalog: true
date: 2019-02-09 14:57:22
subtitle: "利用三種不同的深度學習方法(RNN、LSTM、GRU)來預測IBM股價 走向並比較"
header-img: "stock.jpg"
tags:
- Work

categories:
- Work
- project
- AI
- Deep Learning

---

> 利用三種不同的深度學習方法(RNN、LSTM、GRU)來預測IBM股價 走向並比較
> Use three different deep learning methods (RNN, LSTM, GRU) to predict IBM stock price trends and compare them

[程式碼＋報告PDF : Click On Me](https://github.com/LawrenceGao0224/data_mining/tree/main/datamining_final)

# 前言 
---

一般投資者在投資各種金融商品時，往往都是大賠小賺，因投資者常聽信消息面及一時的衝動，或未作詳細的評估分析就輕易投資，若要單獨分析各種經濟資訊不僅需要蒐集繁多的相關資訊，不但非常費時且需要豐富的專業財經知識，而其預估未來的發展趨勢亦不一定準確，且通常經濟指標是落後市場反應的指標。
而人工智慧的發展日趨興盛，其被運用在多個領域中，尤其是在金融、財經領域中，以類神經網路來預測可說是相當熱門的，透過電腦運算快速的優勢，及多層神經網路，可輔助投資人進行預測。 
When investing in various financial products, the average investor tends to lose big and gain little. Because investors often listen to news and impulses, or do not make detailed assessments and analyze them easily. If you want to analyze various economic information separately, you need not only Collecting a lot of relevant information is not only very time-consuming but also requires a wealth of professional financial knowledge, and its estimated future development trend is not necessarily accurate. 
The development of artificial intelligence is prosperous, and it is used in many fields, especially in the field of finance , the prediction of neural network is quite popular, and the advantages of computing are fast. Neural networks can help investors make predictions.

---

# 流程與實作結果


[Data Source 資料來源 Kaggle : Click On Me](https://www.kaggle.com/szrlee/stock-time-series-20050101-to-20171231)

## 流程 Workflow : 

本次實驗皆採用Keras來搭建深度學習模型，分別利用RNN、LSTM、GRU等深度學習方法來預測，並以均方根誤差(RMSE)來當作評估標準。
In this experiment, Keras was used to build a deep learning model, which was predicted by deep learning methods such as RNN, LSTM, and GRU, and the root mean square error (RMSE) was used as the evaluation standard.

## 實作結果 Result：

(1)LSTM:
RMSE:2.5459669921977524.

![LSTM](LSTM.png)

(2)RNN:
RMSE: 4.72949126626088.

![RNN](RNN.png)

(3)GRU:
RMSE: 3.3223451158225696.

![GRU](GRU.png)

---

# 分析結果與討論 Discussion

從上面結果圖可以看出，我們所預測的走勢與實際情況相近，其中又以LSTM最佳，RNN最差，我們推測原因是因為RNN只考慮最近的狀態，而LSTM結構更為複雜，會將過去的輸出和當前的輸入concatenate到一起。 在現實中的股價波動往往並不單純只與前一天的股價相關，而是會與歷史 中的股價變化有所關連。
From the graph, we can see that the trend we predicted is similar to the actual situation. Among them, LSTM is the best and RNN is the worst. We speculate that the reason is because RNN only considers the most recent state, and the LSTM structure is more complicated. The past output is concatenated with the current input. In reality, stock price volatility is often not only related to the stock price of the previous day, but it is related to change in stock prices in history.