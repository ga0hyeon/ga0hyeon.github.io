---
title: [Spring] Java Heap Memory Exception 
date: 2023-01-22 23:37:40
tags: [Spring Boot]
categories: [Tech, Spring Boot]
---

# 이 글을 쓰게된 이유
지난 연말에 시스템 운영업무를 하게 된 적이 있었는데 하필 그 즈음 시스템 처리 데이터의 크기가 갑자기 커지면서 Heap Memory Exception이 났다.
원래였다면 나에게까지 해결 순번이 내려오지 않았을 수도 있었을 텐데 다들 휴가기간이고 해서 눈물을 머금고 파볼 수 밖에 없었다 ㅎㅎ 이행 조직에서 얻기 어려운 귀한 경험이라 그때 작업 이력을 복기해보려고 한다.

# 현상
기존 코드는 
1. Rest api 호출을 통해 받아온 tsv 결과를 stream으로 변환
2. 1의 stream을 byte array로 변환, stream close
3. 2의 byte array를 stream으로 변환해서 S3 업로드 
4. 2의 byte array를 String으로 변환
5. 4의 String을 String tokenizer로 변환 
6. tokenizer로 읽어들인 row를 10000줄씩 모아 insert (이때 connection은 이전 로직에서 사용하던 것을 그대로 사용)

이 순서로 흘러가고 있었고, 1의 tsv 결과 사이즈가 커지면서 Heap Memory Exception이 발생했다.

# 원인파악 1차
우선 1차로 나는 1~5번 로직에서 동일한 테이터를 stream, byte array, String 등등으로 형변환하여 사용하는게 문제라고 생각했다.
그래서 최초로 가져온 1번의 stream을 뒤의 로직에서 재사용 하도록 코드를 수정했다. S3업로드는 stream 업로드가 바로 지원되어 별 수정이 필요하지 않았고
String tokenizer는 동일 기능을 하는 Stream tokenizer로 대체했다. 하지만 웬걸 ㅠㅠ 이렇게 바꾸고 나니 오히려 안정권에 들던 데이터도 에러가 나기시작...

# 원인파악 2차
1차 개선안으로 해결이 되지 않아 마음이 초초해질 무렵 함께 남아계시던 책임님께서 더 근본적인 원인을 찾아주셨다. 
6번 로직에서 row를 insert 한 후 바로 commit은 되는데 그 데이터가 캐싱되고 있어 메모리를 차지하는 것 같다는 말씀을 해주셨고
- 10000줄 insert에서 1000줄 insert로 변경
- db connection 은 항상 새것을 맽도록 변경
- mybatis cashing은 사용하지 않도록 설정
하신 뒤 개선됨을 직접 확인하고 수정하셨다. ㅠㅠ 감사함 반 자괴감 반 🙏
실제로 돌려보니 간헐적으로 실패하기는 해서, 원인파악 2차 코드를 적용하면서 일부 원복했던 원인파악 1차의 코드를 다시 적용하여 개선 성공!

# 최종 개선 코드
1. Rest api 호출을 통해 받아온 tsv 결과를 stream으로 변환
2. 1의 stream을 바로 S3 업로드 
3. 1의 stream을 reset, Stream tokenizer로 변환 
6. tokenizer로 읽어들인 row를 1000줄 모아 insert (이때 connection은 매번 새로 맽고, mybatis 캐싱도 하지 않음)

# 해결은 됐는데.. 아직 찝찝한점
- jvm 메모리 옵션을 올리는 방향은 고려하지 않았다. 무작정 올리는 것도 문제가 있다는 것은 알지만, 로직으로 해결이 될 때와 아닐 때를 어떻게 구분할 수 있을까?
- 메모리 사용량의 분석을 위해 로컬에서 heap dump를 떴다. 사용량의 대부분은 stream과 byte array가 차지하고 있었고, 1차 개선으로 해결이 되었어야할 것 같은데... 아니었다. mybatis 캐시 사용량은 heap dump에 기록되지 않는걸까?
- 정답은 뭐였을까..?
