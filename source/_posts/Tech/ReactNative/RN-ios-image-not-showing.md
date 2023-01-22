---
title: "[React Native] iOS 에서만 특정 도메인의 이미지 uri가 보이지 않을 때"
date: 2022-04-08 22:28:41
categories: [Tech, React Native]
tags: [React Native]
---

# WIP: iOS 에서만 특정 도메인의 이미지 uri가 보이지 않을 때

현상은 다음과 같다. 예를 들어 특정 도메인이 *https://some.url* 이라고 하면

- AOS에서는 *https://some.url* 로 uri 지정한 Image 컴포넌트가 아주 잘 보인다.
- iOS에서는 완전히 동일한 React Native 소스인데 *https://some.url*를 바라보고 있는 Image 컴포넌트가 안그려진다.
- iOS에서 사파리로 *https://some.url* 접근시에는 잘보인다.
- iOS에서 다른 도메인 이미지로 Image 컴포넌트를 그려보면 잘 보인다.

네트워크 적으로 뭔가 막힌거같은데... 아직 못찾았다 ㅠㅠ
