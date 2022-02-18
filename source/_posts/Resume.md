---
title: 나를 표현하는 이력 페이지 만들기
date: 2022-01-22 04:08:15
tags:
---

# 개요

처음 블로그를 deploy할 때, About Me 페이지는 다음에 더 손봐야지~ 하고 대충 만들었었는데요.

한 페이지에 내가 잘하는 것, 하고싶은 것, 했던 것에 대한 정보를 짜임새 있게 보여주기가 어렵더라구요... 감히 html 쪼가리가 나를 표현한다니! 라는 생각도 들고요 ㅋㅋㅋ
다른 한 편으로는 나에 대해서 정리하고 돌아보는 시간을 계속 미루고 싶었던 것 같기도 합니다.

어떻게 하면 짜임새 있게 나를 표현할 수 있을까 고민했던 내용을 기록해볼게요.

# 계획

우선 보여주고 싶은 정보의 특성에 따라 보여주는 방식도 달랐으면 했습니다.

- 이력은 타임라인
- 기술스택은 관련 직군이라면 알아볼 수 있을 만큼만 간결하게 뱃지로
- 사이드 플젝 진행이력은 신뢰가 가도록 다양한 정보를 담아서
- 성격이 드러나는 짧은 소개글

또, 화면과 인터랙션해서 보여줘야하는 추가정보인지 / 처음부터 보여져야하는 필수정보인지에 따라서도 구현 방식이 달라져야 했구요.

- 추가정보라면 툴팁과 아코디언을 적절히 사용해서 화면이 복잡해 보이지 얺도록
- 필수정보라면 font style과 margin, padding 을 조절하여 화면이 복잡해 보이지 않도록

🤔 뜬금없지만, 역시 내 product를 만든다고 생각하고 UX를 고민하는 작업은 항상 재미있는 것 같아요. 잘하고 싶어져서 더 알아보고, 더 알아보면 더 잘하게 되고...

# 구현

이전 글에서 언급했듯 이 블로그는 Hexo와 Next theme 그리고 약간의 customizing으로 구현되어있는데요. 기존의 틀을 그대로 활용하여 마크다운 추가만으로도 이력 페이지를 꾸밀 수는 있겠지만 그걸로는 원하는 기능을 모두 구현할 수 없었고, 고민하지 않고 React의 도움을 받기로 했습니다.

전체가 React로 구성되는 프로젝트는 아주 많이 만들어봤지만, html로 이미 구현된 페이지에 React Element를 삽입하는 형태로는 작업해본 적이 없었네요. 물론 공식 가이드 첫 부분에 나올 정도로 흔한 상식이긴하지만요... =)

## React, ReactDOM CDN 추가

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="like_button_container"></div>
    <!-- global 변수로 React를 가져다 사용하기 위해 아래와 같이 CDN을 통해 js를 불러오도록 합니다. -->
    <script
      crossorigin
      src="https://unpkg.com/react@17/umd/react.production.min.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"
    ></script>
    <script>
      //아래의 예제는 React 공식 docs에서 제공하는 예제입니다.
      "use strict"; //올바르지 않은 문법을 사전에 검출할 수 있도록 strict 모드를 쓴다는 의미라네요.
      const e = React.createElement;

      class LikeButton extends React.Component {
        constructor(props) {
          super(props);
          this.state = { liked: false };
        }

        render() {
          if (this.state.liked) {
            return "You liked this.";
          }

          return e(
            "button",
            { onClick: () => this.setState({ liked: true }) },
            "Like"
          );
        }
      }

      const domContainer = document.querySelector("#like_button_container");
      ReactDOM.render(e(LikeButton), domContainer);
    </script>
  </body>
</html>
```

이제 root/about/ 경로에 index.md 대신 index.html을 생성하고, 위의 코드를 넣어주면 끝입니다.

## babel CDN 추가

이제 React를 CDN으로 바로 가져다 쓸 수 있다는 것이 확인되었으니, 제가 쓰기 편한 코드로 바꾸고 싶어졌습니다.
위의 예제에서 저는 크게 두 가지가 불편해보였어요.

- createElement
- Class Component

혹시 위의 예제에서 createElement 함수의 사용법을 보셨나요? 아래의 두 코드는 같은 동작을 위한 코드입니다.

```jsx
<button onClick={doSomething} />
```

```javascript
createElement("button", { onClick: doSomething });
```

차이점은, jsx가 훨씬 더 html스럽게 생겨서 개발자 친화적인 것 같네요. 저도 jsx를 사용하는게 더 편하기 때문에 CDN으로부터 불러온 babel 스크립트가 jsx 형식을 알아먹을 수 있도록 수정해볼게요.

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="like_button_container"></div>
    <script
      crossorigin
      src="https://unpkg.com/react@17/umd/react.production.min.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"
    ></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <!-- type을 주는 것을 잊지 마세요. -->
    <script type="text/babel">
      "use strict";
      const { useState } = React;

      const LikeButton = () => {
        const [liked, setLiked] = useState(false);
        return liked ? (
          "You liked this."
        ) : (
          <button
            onClick={() => {
              setLiked(true);
            }}
          >
            Like
          </button>
        );
      };

      ReactDOM.render(<LikeButton />, domContainer);
    </script>
  </body>
</html>
```

짠! 이제 제가 쓰기 편한 형태로 어느정도 정리가 된 것 같습니다.

## 개발!

개발환경이 갖추어졌으니 아래의 주요 기능을 중심으로 개발하면 되겠습니다.

- 이력 타임라인
- 기술스택 뱃지목록
- 사이드 플젝 진행이력
- 성격이 드러나는 짧은 소개글

(WIP) 생각날 때마다 추가 중입니다 =)
