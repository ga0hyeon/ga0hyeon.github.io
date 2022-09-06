---
title: "[React Native] ScrollView의 특정 요소를 Sticky 하게 만들고 싶을 때"
date: 2022-04-10 22:28:41
categories: [React Native]
tags: [React Native]
---

# ScrollView의 특정 요소를 Sticky 하게 만들고 싶을 때

스크롤 하다가 Stick 되었으면 하는 자식 요소의 index를 stickyHeaderIndices prop를 통해 명시해주자.

```jsx
<ScrollView stickyHeaderIndices={[0]}>
  <Header />
  <FirstView />
  <SecondView />
  <ThirdView />
  <FourthView />
  <Footer />
</ScrollView>
```
