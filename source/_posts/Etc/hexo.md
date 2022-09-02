---
title: "[Hexo] Hexo와 NexT 테마를 이용하여 내 입맛에 맞는 개발 블로그를 만들자"
date: 2022-01-12 14:24:10
categories: [Hexo]
tags: [Hexo, NexT]
---

# MOTIVATION

개발 블로그를 시작했을 때부터 tistory를 애용해왔는데, 최근 들어서는 좀 더 **놀이터** 같은 느낌의 블로그를 갖고 싶다는 생각이 들었음.
그래서 작년(2021년) 상반기 즈음 사이드 프로젝트로 *내 웹페이지를 만들어보자*는 계획을 세우게 되었고, 미루고 미루다가 드디어 올해(2022년) 첫 사이드 프로젝트로 다시 꺼내게 되었다.

# 요구사항

고객(나)과 개발자(이것도 나)의 입장에서 여러가지 옵션을 재보았던 내용은 아래와 같다.

**서버 비용은 들이고 싶지 않아요**

- 처음에는 집에 굴러다니는 라즈베리파이에 올릴까 생각도 했는데 의외로 나도 모르는 사이에 전원을 꺼버리는 일이 잦고, update 하려면 서버에 붙어야한다는 점이 너무 번거로워서 몇 번 해보고 포기했다.
- 정적 웹 사이트를 무료로 deploy할 수 있는 github page 를 선택하게 되었다. 나만 안쓰고 있었어...

**웹사이트 구성을 직접 하는 건 어려울 것 같은데?**

- 이것도 처음에는 내 취지 (**놀이터** 같은 블로그)에 맞게 처음부터 다 구성하려고 했었다. 하지만 막상 손을 대고 보니 고려할 부분이 정말정말 많더라... 검색이나 태그, 카테고리 기능을 추가하려고 하니까 구조를 잡는 것이 너무 부담스럽게 느껴졌다.
- 검색 성능이 보장되는 태그나 카테고리를 구성하기 위해서 알고리즘과 자료구조부터 찾아봤고, 서버 비용을 들이더라도 elastic search 를 한 번 써볼까 spike도 해봤는데 ㅠㅠ 공부할 내용이 꽤 되는 것은 둘째치고 재미가 없었다. 그래서 얼마안가 포기.

**정적 웹 사이트 생성기의 도움을 받자**

- github page를 사용하기로 정했을 때 Jekyll로 대표되는 정적 웹 사이트 생성기에 대해서 함께 찾아본 적은 있는데, theme가 모두 마음에 들지 않았던 것 같다.
- 몇 개월 뒤에 검색 기능 구현에 지쳐서 찬찬히 다시 찾아봤는데, [Hexo](https://hexo.io/ko/index.html) 라는 정적 웹 사이트 생성기에 [NexT](https://theme-next.js.org/) theme이 눈에 들었다.

Hexo 및 NexT 모두 가이드가 잘 되어있는 편이라, 이틀 정도로 github deploy 까지 완료 가능했다.

# 진행내용

## Hexo 프로젝트 생성 및 구동

```bash
npm install hexo-cli -g
hexo init blog
cd blog
npm install
hexo server
```

## NexT 테마 적용

프로젝트 root 경로에서

```bash
npm install hexo-theme-next
```

그리고 hexo/\_config.yml 에서

```yml
theme: next
```

## NexT 테마 커스터마이징 (기본)

[NexT docs](https://theme-next.js.org/docs/getting-started/)를 참고하여 커스터마이징.
대부분의 기본 옵션은 \_config.next.yml에 명시되어있어서, flag나 값을 바꿔주는 방식으로 쉽게 변경이 가능하다.

## NexT 테마 커스터마이징 (고오급)

style이나 html을 추가하고 싶은 경우, \_config.next.yml에서 아래의 항목을 주석 해제하고 해당 경로에 파일을 만들어서 추가하고 싶은 style이나 html을 넣어주면 된다.

```yml
custom_file_path:
  head: source/_data/head.njk
  #header: source/_data/header.njk
  #sidebar: source/_data/sidebar.njk
  #postMeta: source/_data/post-meta.njk
  #postBodyEnd: source/_data/post-body-end.njk
  #footer: source/_data/footer.njk
  #bodyEnd: source/_data/body-end.njk
  variable: source/_data/variables.styl
  #mixin: source/_data/mixins.styl
  style: source/_data/styles.styl
```

예를 들어 나는 google AdSense를 추가하고 싶었는데, html head 태그 안에 script를 넣을 방법이 필요했다.
그럴때 위 의 custom_file_path 에서 head 항목을 주석 해제하고 해당 경로에 head.njk 파일을 만들어준 다음 아래와 같이 입력해주면

```html
<meta name="google-site-verification" content="some_value" />
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=some_value"
  crossorigin="anonymous"
></script>
```

`hexo generate`명령어 수행 시 위의 html 코드가 head 하단에 삽입된다.

또, style 커스터마이징도 동일한 방법으로 가능하다.
custom_file_path 에서 style 항목을 주석 해제하고 해당 경로에 variables.styl 파일을 만들어준 다음 아래와 같이 입력해주면

```stylus
.search-popup
    padding: 20px;
```

`hexo generate`명령어 수행 시 원하는대로 style이 잘 변경된 것을 확인할 수 있다.

+) 위의 방법으로 style 커스터마이징을 하면 전반적인 통일성이 깨지므로 theme 사용의 이점이 퇴색될 수 있을 것 같아서 좀 더 찾아봤는데 (.node_modules/hexo-theme-next 에서 직접 열어볼 수 있다. )
기본적으로 font family나 size, 대표 color 는 variable로 관리되고 있음을 확인할 수 있었다. 따라서 테마 색상, 폰트 정도만 변경하고자 한다면 variables.styl에 아래와 같이 써주는게 좋겠다.

```stylus
$theme-color = #FFD460;
$brand-color = #2D4059;
$text-color = #2D4059;
$font-family-chinese = 'IBM Plex Sans KR', sans-serif;
$font-family-base         = $font-family-chinese;
$font-family-logo         = $font-family-chinese;
$font-family-headings     = $font-family-chinese;
$font-family-posts        = $font-family-chinese;
```

## github page 배포

\_config.yml에 deploy target을 명시한다.

```yaml
deploy:
  type: git
  repo: https://github.com/ga0hyeon/ga0hyeon.github.io.git
  branch: gh-pages
```

deployer를 설치하고

```bash
npm install hexo-deployer-git
```

배포 명령어를 수행하면 끝이다.

```bash
hexo generate
hexo deploy
```

+) github credential 설정이 되어있지 않은 경우 에러 메시지가 발생할 수 있다. 흔한 에러이므로 구글링하면 금방 해결 가능하다.

## (2022.09.02 추가) highlight.js 적용하기

개발 블로그이다 보니 코드 블럭을 매우 자주 사용하는데, 색이 없으니 못생겨보여서 [hightlight.js](https://highlightjs.org/download/)를 적용해줬다.

```html
<link
  rel="stylesheet"
  href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/default.min.css"
/>
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js"></script>
```

# 그리고 더 해야할일

- [ ] github actions로 배포 자동화하기
- [ ] 사이드바에 category tree가 보이게 하고싶다!
