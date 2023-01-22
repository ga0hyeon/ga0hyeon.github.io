---
title: "[React Native] 맥북 개발환경을 세팅하자"
date: 2022-01-13 13:28:41
categories: [Tech, React Native]
tags: [React Native]
---

# React Native

## 설치

1. Node 12 이상 설치
   `brew install node`

2. Watchman 설치
   `brew install watchman`

3. [iOS/필수] Xcode 설치

   appStore에서 설치하면 됩니다. (용량이 12기가라 매우 느립니다!)

4. [iOS/선택]
   Xcode를 실행하여 Command Line Tools도 가장 최신으로 다운로드 하세요.

   ![](https://reactnative.dev/assets/images/GettingStartedXcodeCommandLineTools-8259be8d3ab8575bec2b71988163c850.png)

5. [iOS/선택] 시뮬레이터 추가 설치
   **Xcode > Preferences...** 에서 **Components** 탭 선택 후
   원하는 iOS 시뮬레이터를 선택하여 추가할 수 있습니다.
   현 : 지금 최신 Xcode를 받으면 iPhone13 (iOS15.2) 가 default로 설치되는 것 같아요

6. [iOS/필수] CocoaPods 설치

   `sudo gem install cocoapods`

7. [AOS/필수] JDK 설치

   Jdk8 이상이 필요합니다.
   `brew install --cask adoptopenjdk/openjdk/adoptopenjdk8`

8. [AOS/필수] 안드로이드 스튜디오 설치

   https://developer.android.com/studio/index.html

9. [AOS/필수] 환경변수 설정

   ~/.bash_profile 에 아래의 내용을 입력해주세요.
   현 : 사용하시는 terminal에 따라 유동적으로 진행해주세요 :)

   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

10. [AOS/필수] SDK 설치

Android Studio > SDK Manager 에서 원하는 SDK 를 선택하여 설치합니다.

## Initialize & Launch Project

### Initialize

```bash
npx react-native init moga --template react-native-template-typescript
yarn add mobx
yarn add mobx-react
yarn add @babel/plugin-proposal-decorators -D

```

babel.config.js

```javascript
...
  plugins: [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    ['@babel/plugin-proposal-class-properties', {loose: true}],
  ],
...

```

tsconfig.json

```json
...
	"experimentalDecorators": true,
...
```

### Launch

```bash
yarn install
npx pod-install ios
npm run start
npm run android
npm run ios
```

## Trouble Shooting

> react-native init 실행 후
>
> Installing CocoaPods dependencies 에서 실패하는 케이스

```bash
npx pod-install ios
```

> pod install 실행 시
>
> Installing Flipper-Glog (0.3.6).. 에서 실패하는 케이스

```bash
sudo xcode-select --switch /Applications/Xcode.app
```

> pod install 실행 시
> `git_version': Failed to extract git version from `git --version` ("\nYou have not agreed to the Xcode license agreements, please run 'sudo xcodebuild -license' from within a Terminal window to review and agree to the Xcode license agreements.\n").. 에러 뜨는 케이스

`sudo xcodebuild -license` 또는 Xcode 실행하여 약관 동의

```bash
sudo xcodebuild -license  ## 또는 Xcode 실행하여 약관 동의
```
