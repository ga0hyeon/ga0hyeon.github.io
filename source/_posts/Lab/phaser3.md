---
title: phaser3
date: 2022-08-30 16:24:39
tags:
---

# MOTIVATION

개더타운 클론코딩을 하면서 맵, 캐릭터 렌더를 위해 Phaser를 사용해보게 되었는데 웬걸 생각보다 너무 방대해서 새 포스트를 파게 되었다.

(참고 가이드)[https://phaser.io/tutorials/making-your-first-phaser-3-game]

# Phaser란?

cross-browser HTML5 게임을 쉽고 빠르게 만들 수 있도록하는 프레임워크.

# 개발환경 setup

Phaser가 html 기반으로 게임을 만들수 있게 해준다고 하더라도, 브라우저에서는 원칙적으로 로컬 리소스에 접근할 수 없기 때문에 html 파일 만으로는 Phaser 게임을 실행할 수 없다. 따라서 html과 리소스를 올릴 서버가 필요하고, 공식 가이드에서는 python, php, node.js 정도를 언급하고 있다. 나는 React로 페이지 뼈대를 구성할 것이고, 운영 단계까지 올릴 생각이 없으므로 React 개발 서버면 충분하다.
그리고 가이드에 IDE도 몇 가지 언급되하고있는데, brakets 같은 HTML 편집기로도 개발이 가능하다고 한다. 재밌다. 하지만 나는 평소에 사용하던 VS Code를 그대로 쓸 것이다 ㅋㅋㅋㅋㅋ

정리하자면 요 정도만 추가로 해주면 되겠다.

- CRA로 React 개발환경 셋업
- npm으로 Phaser 설치

```bash
$ npm install phaser
```

# 샘플 페이지 띄워보기

가이드로 제공된 소스는 html script라서 react에 맞게 약간 수정해서 샘플 페이지를 띄워봤다. 잘 뜬다 :)
(참고 가이드)[https://phaser.io/tutorials/getting-started-phaser3/part5]

파티클과 로고의 속성값을 바꾸어가면서 소스를 만져보면 Phaser를 어떻게 사용해야할지 감이 온다! 좋은 샘플이다 ㅎㅎ

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

# 타일셋을 사용하여 맵 그리기

사실 요 내용을 서칭하다가 포스트를 쓰게 됐다.
