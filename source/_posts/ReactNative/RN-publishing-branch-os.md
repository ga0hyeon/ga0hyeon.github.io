---
title: "[React Native] 플랫폼별로 디자인을 달리 하고 싶을 때"
date: 2022-04-08 22:28:41
categories: [React Native]
tags: [React Native]
---

# 플랫폼별로 디자인을 달리 하고 싶을 때

`react-native` 패키지의 `Platform` 모듈을 사용하자

```jsx
export const styles = StyleSheet.create({
  pagination_wrapper: {
    position: "absolute",
    left: width / 2 - 100,
    ...Platform.select({
      ios: {
        top: height + 70,
      },
      android: {
        top: height + 75,
      },
    }),
  },
});
```
