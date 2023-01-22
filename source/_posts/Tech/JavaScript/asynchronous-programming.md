---
title: "[JavaScript] 비동기 프로그래밍"
date: 2022-04-05 00:01:04
tags: [JavaScript]
categories: [Tech, JavaScript]
---

# 이 글을 쓰게된 이유

나는 웹을 경험한 기간이 짧다. 그래서 감으로만 익히고 넘어간 개념도 많다. 그 중 하나가 JavaScript에서의 비동기 처리이다. 우선은 비동기처리 패턴을 시간 순으로 나열해보고, 마지막으로는 전부터 궁금했던 (하지만 시간이 없다는 핑계로 그냥 넘어갔던 ㅋㅋㅋ) 동기함수에서 비동기 함수를 호출할 때의 코드 패턴에 대해 정리하려고 한다.

# 비동기처리 패턴의 역사

웹을 경험한 기간이 짧아서 아쉬운 점은 실제로 내가 예전의 구린 웹을 써본 적이 없다는 것이다 ㅠㅠ 이건 비단 웹 뿐만 아니라 프로그래밍의 거의 모든 분야에서 그렇긴 하지만. 실제로 불편했던 기억이 있으면 예를 들어 설명하기 더 좋지 않았을까 생각한다.
아무튼 나는 경험한 바가 없기 때문에, 비동기처리 패턴이 예전엔 어떻게 구렸는 지 좀 찾아봤다.

## Callback 패턴

```javascript
const doSomethingAsynchronously(){
    asyncFuncWithCallback(()=>{
        doSomethng();
    })
}
```

이건 안써봐도 별로이게 생겼다. 순차적으로 비동기 처리를 원하는 경우, Callback 안에 Callback 안에 Callback.. 을 넣어줘야한다.

## Promise 패턴 (then, catch, finally)

```javascript
asyncFunc()
  .then((res) => {
    //Promise is resolved
  })
  .catch(() => {
    //Promise is rejected
  })
  .finally(() => {
    //Promise is resolved or rejected
  });
```

ES6에 등장했다는 이 패턴에서는, 순차적으로 비동기 처리를 원하는 경우 then then then.. 으로 Promise를 return하고 다음 then에서 처리하는 방식으로 엮을 수 있다.
위에 것 보다는 편해보인다. 하지만 뒤쪽의 then 절에서 res에 뭐가 들어있는 지 따라가는 것이 쉽지 않다.

## async await 패턴

```javascript
const res1 = await asyncFunc1();
const res2 = await asyncFunc2();
console.log(res1, res2);
```

ES8에 등장한 이 패턴은, 확실히 위의 두 패턴보다 가독성이 좋아 보인다.

# 동기함수에서 비동기 함수를 호출하고 싶은데...

예를 들어 화면 쪽 로직에 이런 기능이 있다.

'제출하기 버튼을 누르면 제출 api를 호출하게 해주세요'

물론 제출하기 버튼에 제출 api 호출 함수를 넣으면 된다. 바로 동작하는 것을 볼 수 있다. 그런데 여기에 type checking 이 들어가면 버튼의 onClick 핸들러는 동기 함수를 받기를 원하므로, 비동기인 api 호출 함수를 넣으면 정적 소스 분석툴에서 type이 맞지 않다고 징징거린다.

그래서 처음에는 이런식의 코드를 짰다.

```javascript
const groupedAsyncFunc = async () => {
  const res1 = await asyncFunc1();
  const res2 = await asyncFunc2();
  return res1 + res2;
};
<button
  onClick={() => {
    groupedAsyncFunc.then((res) => {
      doSomething(res);
    });
  }}
/>;
```

다건의 연속된 비동기 처리는 async await로 보기 좋게 짜더라도, 마지막에 한번은 동기로 마무리하려면 then을 써주어야한다고 생각한 것이다. 여유를 갖고 검색해볼 시간이 없었던 것 같다.

다행히 시간을 내어 이 내용을 구글링한 끝에, 두 가지의 대안을 찾았다.

1. 비동기 함수 호출 시 void 붙여주기

```javascript
const groupedAsyncFunc = async () => {
  const res1 = await asyncFunc1();
  const res2 = await asyncFunc2();
  return res1 + res2;
};
<button onClick={() => void groupedAsyncFunc()} />;
```

2. IIFE (즉시실행함수) 패턴 사용하기

```javascript
const groupedAsyncFunc = async () => {
  const res1 = await asyncFunc1();
  const res2 = await asyncFunc2();
  return res1 + res2;
};
<button
  onClick={() => {
    (async () => await groupedAsyncFunc())();
  }}
/>;
```

개인적으로는 1안의 void 가 가독성이 좋아서 1안을 사용하기로 했으나, 찾아보니 [2안을 사용하도록 가이드](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/async_function)하는 경우도 꽤 있었다. 나는 몰랐지만, IIFE는 이 케이스 뿐만 아니라 javascript 진영에서 원래 널리 쓰고 있는 패턴이며, 변수의 호이스팅 때문에 원하는 대로 동작하지 않는 케이스를 방지해준다는 큰 장점이 있다고 한다. 이 내용을 접했을 때, 내가 _동기함수에서 비동기 함수를 호출_ 하고 싶다는 내 작은 요건에 너무 오버되는 패턴을 찾은 것 같다는 생각을 했다. ㅋㅋㅋ 굳이 이걸 쓸 필요가 없어보였다. Scope 처리가 너무나 당연한 환경에서 웹 개발을 하고있는 나에게는 별로 매력적이지 않아보였기 때문이다. 그래서 2안은 IIFE 개념에 대해 접할 수 있었던 것에만 의의를 두고, 사용하지는 않기로 했다.

# 결론

비동기 action의 결과를 명시적으로 기다리지 않는 경우 void 키워드를 붙여주자.
