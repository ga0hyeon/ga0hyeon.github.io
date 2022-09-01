---
title: "[토이프로젝트] 개더타운 클론코딩 - 2"
date: 2022-07-28 02:14:38
categories: [토이프로젝트, 개더타운 클론코딩]
tags: [토이프로젝트, WebRTC, Phaser]
---

이전 포스트에서는 MOTIVATION, PREPARATION 까지 정리했고, 이어서 DELEVERY했던 내용 중 3.맵 구성하기 항목까지 기록한다.

1. **git repository 생성 및 각 모듈 셋업하기**
   🎁 React, Django 셋업과정
2. **화면 뼈대 구성하기**
   🎁 Chakra 사용법
3. **맵 구성하기**
   🎁 Phaser 사용법
   🎁 Phaser와 React.js를 함께 사용하는 과정
4. 캐릭터 이동 구현하기
5. 회의실 입장 구현하기
6. 2인 음성 영상 챗 구현하기
7. 다자 음성 영상 챗 구현하기
8. 미디어 설정 기능 구현하기

# DELEVERY

## 1. git repository 생성 및 각 모듈 셋업하기

[git repository](https://github.com/ga0hyeon/cowork-saga)를 만들어주고, signalingServer와 client 폴더에 각각 Django와 React 셋업을 진행했다.

### Django 셋업 with djangoRestFramework

[django docs](https://docs.djangoproject.com/ko/4.0/intro/)를 참고하여 초기 세팅을 진행한다.
+) mac에 python 2.7이 기본으로 깔려있어서 3.x 버전의 python을 받아주었다. python3을 기본으로 바라보도록 bashrc에도 alias를 추가해준다.

django를 설치해주고

```bash
$ python -m pip install Django
```

설치 후 잘 설치되었는지 버전을 확인한다.

```bash
$ python -m django --version
```

그리고 아래 명령어로 현재 경로에 django 프로젝트를 생성한다.

```bash
$ python -m django startproject gather_clone_siganlling_server
```

지정해준 폴더 (나의 경우 gather_clone_siganlling_server)로 이동하여 아래의 명령어를 수행하면, 짜잔! 기본포트(8000)에 샘플페이지가 뜬다.

```bash
$ python manage.py runserver
```

나는 웹서버가 아니라 REST Api 서버로 사용할 것이므로, [django-rest-framework docs](https://www.django-rest-framework.org/#installation)를 참고하여 djangoRestFramework를 깔아주자.  
example까지 따라서 만들면, 이제 localhost:8000에 이전의 django 샘플페이지가 아니라 swagger와 유사한 형태의 REST framework 페이지가 뜬다.

### React 셋업 with Chakra UI & Adapter.js

1. CRA로 React 앱 초기 세팅

```bash
   $ npx create-react-app gather-clone-client --template @chakra-ui/typescript
```

2. Adapter.js 라이브러리 설치
   Adapter.js는 Polyfill(브라우저에서 지원하지 않는 최신 기능을 사용할 수 있도록 도와주는 코드의 모음)과 Shim(이미 존재하는 코드의 동작을 바로잡는데에 사용하는 코드의 모음)을 사용하여 WebRTC의 브라우저 간 호환성 문제를 해결해둔 라이브러리이다.
   WebRTC가 계속해서 변화하고 있는 기술이고, 각 브라우저별로 지원 수준이 다르기 때문에 일괄 적용이 쉽지 않은 모양이다.

```bash
npm install webrtc-adapter
```

## 2. 화면 뼈대 구성하기

위에서 만들어준 React 프로젝트 폴더에서 화면 뼈대 구성을 이어서 진행한다. 화면 구조는 아래와 매우 간단하다 :)

```bash
   App.tsx
   pages
    ⌞IntroPage.tsx
    ⌞MeetingPage.tsx
```

IntroPage에는 Chakra UI를 활용해서 간단한 정보 입력 form을 구현한다. 우선은 구분을 위해 이름 정도만 입력받도록 하자.

## 3. 맵 구성하기

맵 구성에는 Phaser를 사용한다.

### Phaser란?

cross-browser HTML5 게임을 쉽고 빠르게 만들 수 있도록하는 프레임워크.

### Phaser를 사용하기 위한 추가적인 개발환경 setup

Phaser가 html 기반으로 게임을 만들수 있게 해준다고 하더라도, 브라우저에서는 원칙적으로 로컬 리소스에 접근할 수 없기 때문에 html 파일 만으로는 Phaser 게임을 실행할 수 없다. (사실 이 개념 예전에도 접했었는데 그때는 바로 이해가 안되었는데.. 지금은 후루룩 읽힌다. 아주 좋다!!)따라서 html과 리소스를 올릴 서버가 필요하고, 공식 가이드에서는 python, php, node.js 정도를 언급하고 있다.

나는 위에서 이미 React로 페이지 뼈대를 구성했고, 운영 단계까지 올릴 생각이 없으므로 React 개발 서버면 충분하다.

그리고 가이드에 IDE도 몇 가지 언급하고있는데, brakets 같은 HTML 편집기로도 개발이 가능하다고 한다. 재밌다. 물론 나는 위에서 세팅해둔 VS code를 사용한다 ㅎㅎ

추가적인 서버 셋업과 IDE 설정이 필요 없으니 Phaser 사용을 위해서는 요 정도만 추가로 해주면 되겠다.

- npm으로 Phaser 설치

```bash
$ npm install phaser
```

### 가이드를 따라 샘플 게임 만들기

본격적으로 구미에 맡는 맵을 만들기 전에 Phaser에 익숙해질 겸 가이드를 따라 샘플 게임을 만들어본다. 가이드로 제공된 소스는 html script라서, 글로벌 변수가 따로 없는 react에 맞게 ref, state를 사용해서 약간 수정해봤다. 잘 뜬다 :)
(making-your-first-phaser-3-game)[https://phaser.io/tutorials/making-your-first-phaser-3-game]

이 샘플 소스만으로도 회의실 구성에 필요한 요소는 어느정도 구현이 가능해보인다. 굿!

![Sample Game](/images/gather_clone_coding/1.png)

<details>
<summary>샘플 소스 전문</summary>

```tsx
import Phaser from "phaser";
import { useEffect, useRef, useState } from "react";

const SamplePage = () => {
  const variables = useRef<{
    platforms: Phaser.Physics.Arcade.StaticGroup;
    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    stars: Phaser.Physics.Arcade.Group;
  }>();

  const config = useRef<Phaser.Types.Core.GameConfig>({
    type: Phaser.AUTO,
    parent: "sample-page", //NOTE : 아래 div의 id값을 넣어주면 된다.
    width: 800,
    height: 600,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 200 },
      },
    },
    scene: {
      preload: function () {
        this.load.image("sky", "assets/sky.png");
        this.load.image("ground", "assets/platform.png");
        this.load.image("star", "assets/star.png");
        this.load.image("bomb", "assets/bomb.png");
        this.load.spritesheet("dude", "assets/dude.png", {
          frameWidth: 32,
          frameHeight: 48,
        });
      },
      create: function () {
        this.add.image(400, 300, "sky");

        //NOTE : config에 physics를 정의해두어야 정상적으로 동작한다
        const platforms = this.physics.add.staticGroup();

        //NOTE : static physics body의 크기를 변경했으므로 refreshBody 호출
        platforms.create(400, 568, "ground").setScale(2).refreshBody();

        platforms.create(600, 400, "ground");
        platforms.create(50, 250, "ground");
        platforms.create(750, 220, "ground");

        const player = this.physics.add.sprite(100, 450, "dude");
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.anims.create({
          key: "left",
          frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
          frameRate: 10,
          repeat: -1,
        });

        this.anims.create({
          key: "turn",
          frames: [{ key: "dude", frame: 4 }],
          frameRate: 20,
        });

        this.anims.create({
          key: "right",
          frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
          frameRate: 10,
          repeat: -1,
        });

        this.physics.add.collider(player, platforms);

        const cursors = this.input.keyboard.createCursorKeys();

        const scoreText = this.add.text(16, 16, "score: 0", {
          fontSize: "32px",
          color: "#fff",
        });

        const stars = this.physics.add.group({
          key: "star",
          repeat: 11,
          setXY: { x: 12, y: 0, stepX: 70 },
        });

        stars.children.iterate(function (child) {
          (child as any).setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(
          player,
          stars,
          (player, star) => {
            (star as any).disableBody(true, true);
            setScore((prev) => {
              scoreText.setText("Score: " + (prev + 1));
              return prev + 1;
            });

            if (stars.countActive(true) === 0) {
              stars.children.iterate(function (child) {
                (child as any).enableBody(
                  true,
                  (child as any).x,
                  0,
                  true,
                  true
                );
              });

              const x =
                (player as any).x < 400
                  ? Phaser.Math.Between(400, 800)
                  : Phaser.Math.Between(0, 400);

              const bomb = bombs.create(x, 16, "bomb");
              bomb.setBounce(1);
              bomb.setCollideWorldBounds(true);
              bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            }
          },
          undefined,
          this
        );

        const bombs = this.physics.add.group();

        this.physics.add.collider(bombs, platforms);

        this.physics.add.collider(
          player,
          bombs,
          (player, bomb) => {
            this.physics.pause();

            (player as any).setTint(0xff0000);

            this.anims.play("turn", player);

            this.add.text(240, 300, "GAME OVER", {
              fontSize: "64px",
              color: "#0xff00",
            });
          },
          undefined,
          this
        );
        variables.current = {
          platforms,
          player,
          cursors,
          stars,
        };
      },
      update: function () {
        if (variables.current) {
          const { cursors, player } = variables.current;

          if (cursors.left.isDown) {
            player.setVelocityX(-160);
            player.anims.play("left", true);
          } else if (cursors.right.isDown) {
            player.setVelocityX(160);
            player.anims.play("right", true);
          } else {
            player.setVelocityX(0);
            player.anims.play("turn");
          }
          if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
          }
        }
      },
    },
  });

  const [score, setScore] = useState<number>(0);
  const [game, setGame] = useState<Phaser.Game>();

  useEffect(() => {
    const game = new Phaser.Game(config.current);
    setGame(game);

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="sample-page"></div>;
};

export default SamplePage;
```

</details>

### 회의실을 그리는데에 사용할 무료 애셋을 찾자

가장 기본적인 회의실 맵을 그리기 위해서 아래와 같이 크게 세 가지의 애셋이 필요하다.

- 바닥
- 캐릭터
- 오브젝트 (벽, 책상, 집기 등등)
- 맵 뒷배경 이미지

[무료로 애셋을 받을 수 있는 사이트](https://itch.io/game-assets/free)와 [Pixabay](https://pixabay.com/ko)에서 발품을 팔아 줍줍한 애셋들은 root의 public 폴더에 차곡차곡 담아준다.

### 자 이제 회의실을 그려보자

이제 어느 위치에 어떤 타일을 배치할지 정의하면 된다. Phaser 예제를 둘러보니 아래 캡쳐와 같이 json 형식으로 좌표값을 넘겨받고 있다는 것을 어렵지 않게 확인할 수 있었는데, 처음에는 이걸 손으로 하나하나 해야하는 줄 알고 포기할까 했다.
![json](/images/gather_clone_coding/5.png)

당연히 요 json을 쉽게 만들 수 있도록 도와주는 프로그램이 이미 있고, 그 중 나는 [Tiled](https://www.mapeditor.org/) 를 사용해보았다.

Tiled를 실행한 뒤 프로젝트와 맵을 신규 생성하고, 위에서 모아둔 애셋 타일셋을 import 해주면 아래와 같이 맵을 한칸 한칸 그려줄 수 있다.

![회의실 전경](/images/gather_clone_coding/2.png)

타일셋을 그릴 때는 용도에 맞게 레이어를 추가할 수 있는 듯 하다. 나는 바닥, 벽, 집기류 총 세 개의 레이어를 사용하여 회의실을 꾸몄다. 맵 메이커를 제대로/잘 사용하는 방법에 대해서는 다른 포스트에서 추가로 다루어야 할 정도로 양이 되는 듯 하여 이번에는 이 정도로 만족하고 넘어간다.

이제 만든 맵을 Phaser에서 읽을 수 있도록 json 형식으로 저장해주면 되는데, 그전에 맵이 타일셋을 내장하도록 해야하는데... 무슨 이유에서인지 가이드대로 '타일셋 내장' 버튼을 클릭하면 맵이 깨진다 ㅠㅠ
![요것을 누르면](/images/gather_clone_coding/3.png)
![이렇게 된다 ㅠㅠ 왜!!!](/images/gather_clone_coding/4.png)
잠시 생각해보니 json에 어떻게 이미지 정보를 내장하는 것이 효율적일 것 같지는 않아서 문득 위에 캡쳐한 Phaser 예제의 json 내용을 살펴보니, 타일셋 부분은 절대경로로 되어있다. 아하. onCreate 시점에 타일셋 자원도 로드하는 모양이다.

[예제 소스](https://phaser.io/examples/v3/view/camera/follow-zoom-tilemap)에 보니 아래와 같은 코드가 있었다.

```jsx
this.load.tilemapTiledJSON("map", "assets/tilemaps/maps/super-mario.json");
this.load.image("tiles1", "assets/tilemaps/tiles/super-mario.png");
```
