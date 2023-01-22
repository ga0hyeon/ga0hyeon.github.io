---
title: "[React Native] 여러 개의 자식 요소를 가운데 정렬하고 싶을 때"
date: 2022-04-08 22:28:41
categories: [Tech, React Native]
tags: [React Native]
---

# 여러 개의 자식 요소를 가운데 정렬하고 싶을 때

```jsx
export const styles = StyleSheet.create({
  vertical: {
    justifyContent: "center", //자식 요소가 horizontally 가운데 정렬된다.
    alignItems: "center", //자식 요소가 vertically 가운데 정렬된다.
  },
});
```
