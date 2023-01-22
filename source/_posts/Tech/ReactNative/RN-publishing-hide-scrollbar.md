---
title: "[React Native] 스크롤 영역의 스크롤 바를 가리고 싶을 때"
date: 2022-04-12 22:28:41
categories: [Tech, React Native]
tags: [React Native]
---

# 스크롤 영역의 스크롤 바를 가리고 싶을 때

ScrollView, FlatList에게 아래의 props를 내려주자.

```jsx
  showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false}
```
