---
title: "javscript OCR 라이브러리로 제품정보 인식하기"
date: 2022-05-22 20:28:59
categories: [Tech, OCR]
tags: [AI, javascript]
---

# AWS Textract

처음에는 AWS Textract를 사용하려고 하였으나... 지원 언어에 한국어가 아직 없는 관계로 패스

# Javascript OCR 라이브러리들

직접 구현하기로 마음을 먹고 javascript OCR 라이브러리를 찾아보니 생각보다 굉장히 많았다.
https://openbase.com/categories/js/best-nodejs-ocr-libraries
1위인 Tesseract를 선택했다.

# input으로 어떤 이미지가 들어올까?

일반 사용자에게 "제품 모델명을 촬영해달라"고 한다면 어느 부분을 찍을지 생각해봤다.
얼마 고민해보지 않아도 제품 어딘가에 모델명이 쓰여있는 경우를 모두 고려해야한다는 결론이 났다.

- 단순 텍스트
- 행과 열이 선으로 구분된 테이블 형태의 상세정보
- 행과 열이 선으로 구분되지 않은 테이블 형태의 상세정보

가이드 문서에서 제공되는 아래의 기본 코드로 위의 세가지 케이스를 각각 인식해본 결과...

```jsx
const worker = createWorker({
  logger: (m) => console.log(m),
});

const recognize = (file: File) => {
  (async () => {
    await worker.load();
    await worker.loadLanguage("kor+eng");
    await worker.initialize("kor+eng");
    const {
      data: { text },
    } = await worker.recognize(file);
    setResult(text);
    await worker.terminate();
  })();
};
```

![인식결과_1](/images/ocr_result_1.png)
나~~~~름 뭔가가 인식되는 것을 볼 수 있었다. 나름... 하지만 제품정보를 "인식"했다고 하기에는 정확도가 민망할 정도로 낮아서, 보완할 포인트를 정리해봤다.

- 먼지가 글자로 인식되어, 먼지가 많은 사진을 인식하는 데에 수 분이 소요된다
  - 의도한 것은 아니나, 단순 텍스트 인식을 위해 촬영한 이미지 (공유기)에 먼지가 많아서 이걸 다 글자로 인식하는 바람에 정확도 0% 처리 시간 N분이라는 결과가... 나왔다
- input 사진의 size가 불필요하게 크다
- 글자와 배경만 구분하면 될텐데... 이미지가 컬러일 필요가 없어보인다
- 글자가 있는 영역 외의 Object는 인식에서 제외할 필요가 있어보인다
- 테이블 형식의 input 데이터는 사실 행-열 조합 만으로 매우 큰 정보를 제공하는데, 인식 결과에서는 그 내용을 활용하지 못한다

도출된 보완점 중 **먼지** 문제와 **input size** 문제, **grayscale** 문제는 쉽게 해결 가능해보이고,
**Object** 문제와 **Table** 문제는 detection 관련해서 좀 더 찾아볼 필요가 있어보였다.

아무튼. 쓸만하게 만들기 위해서는 전처리가 필요하다.

구글링해보니 인식률을 높이는 방법으로 몇 가지 전처리가 추천되고 있다. 다들 비슷하게 생각하고 있다 ㅋㅋㅋ 재밌음
https://stackoverflow.com/questions/9480013/image-processing-to-improve-tesseract-ocr-accuracy

# 전처리를 추가하자

## openCV.js를 붙여보자

javascript에서 영상처리를 하는 방법에 대해 열심히 구글링했지만... 쉽지 않았다. cdn을 통해서나 js를 받아 직접 script를 붙여서 사용하도록 가이드하는 오픈소스는 종종 보였으나 npm 라이브러리는 쓸만한게 없었다. 아쉬운대로 openCV.js를 받아서 써보기로 했다.

1. https://docs.opencv.org/3.4/d0/d84/tutorial_js_usage.html 를 참고해서 4.5.5버전의 openCV.zip를 다운로드한다.

2. zip 폴더를 풀어 public 폴더에 넣고, 폴더명은 openCV_4.5.5로 변경했다. 그리고 index.html에 아래와 같이 js를 붙여준다. js가 로드된 이후 부터는 글로벌하게 선언된 `cv` 변수를 이용해서 openCV를 사용할 수 있다.

```html
<script
  src="openCV_4.5.5/opencv.js"
  onload="onOpenCvReady();"
  type="text/javascript"
></script>
```

## 이미지를 흑백으로 변환하자

https://docs.opencv.org/3.4/db/d64/tutorial_js_colorspaces.html

```javascript
let src = cv.imread("canvasInput");
let dst = new cv.Mat();
cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
```
