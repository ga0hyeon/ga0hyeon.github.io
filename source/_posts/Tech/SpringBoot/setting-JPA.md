---
title: Spring Boot + MySQL + JPA + Flyway 셋업하고 REST api 만들기
date: 2022-11-15 23:49:08
tags: [Spring Boot, MySQL, JPA, Flyway]
---

# Motivation

나는 JPA를 써본적이 없당

JPA를 사용해본/하고있는 사람들에게 JPA를 설명해달라고 하면 "하... 너넨 이런거 하지마라 🚬" 느낌으로다가 말해주곤 하는데

하지 말라고 하면 더 해보고 싶은 법이다. 왜 하지말라는건데~~~~

그래서 사이드 프로젝트 BE를 JPA로 만들기로 결정~!~!

# Spring Initializer 로 프로젝트 뼈대 생성

[Initializer](https://start.spring.io/)로 프로젝트 뼈대를 생성한다.

언어 옵션 중 Kotlin이 아주 잠깐 궁금했으나 잘 참고 Java를 고른다 ㅎㅎ 왜냐면 아직 Java도 아직 잘모름 🤦‍♀️
Dependency는 각자 필요한 것을 선택하면 되는데 나는 Lombok, JPA, Flyway, Web 정도가 필요하다.

+) 개발자인데 GUI가 좋다고 하면 왠지 주눅이 들어서 잘 말하고 다니지 않지만, Initializer를 처음 찾았을때 너무 기분이 좋았다 ㅋㅋㅋ ㅠㅠ

# Application.yaml 설정

Initializer로 만든 폴더 안에는 application.properties가 기본으로 생성되어있으나 나는 가독성 때문에 yaml 포맷을 선호하므로 application.yaml 파일을 만든다.

위에서 만들어준 프로젝트에 MySQL을 붙이고 JPA, flyway를 사용하기 위해 구글링 구글링..

[baeldung 아티클](https://www.baeldung.com/spring-data-jpa-run-app-without-db) 에서 database 없이 JPA 를 붙이고, 에러가 나지 않도록 줘야하는 옵션값을 설명해준다.
( JPA에 대해 정말 지식이 없어서 단순히 메소드 명으로 쿼리 만들어주는 그런 친구인줄로 알았는데, DDL 자동 생성 기능도 있었다.
여기저기 포스트를 찾아보기도 하고 혼자서도 생각해보니 오히려 불편할 것 같다는 생각이 들어 이 기능은 끄기로 한다. )

아래와 같이 application.yaml를 설정해주면 `MySQL - JPA - flyway` 는 잘 연동이 된다.

```yaml
server:
  address: localhost
  port: 8080

spring:
  flyway:
    enabled: true
    locations: classpath:db/migration
    schemas: coworksaga
    baseline-on-migrate: true
    url: &db-url jdbc:mysql://localhost:3306/coworksaga?useSSL=false&useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Seoul&createDatabaseIfNotExist=true&allowPublicKeyRetrieval=true
    user: &db-user coworksaga
    password: &db-pwd root1234
    create-schemas: true
  jpa:
    database: mysql
    hibernate:
      ddl-auto: validate
    show-sql: true
    format-sql: true
    use-sql-comments: true
    properties:
      hibernate:
        temp:
          use_jdbc_metadata_defaults: false
  datasource:
      url: *db-url
      username: *db-user
      password: *db-pwd
      driver-class-name: com.mysql.cj.jdbc.Driver


logging:
  level:
    org.hibernate.SQL: DEBUG
    org.hibernate.type: TRACE
```

+) yaml 쓰면서 깨달은점

- &, * 페어로 변수를 선언하고 불러다 쓸 수 있다. 굿굿
- database가 없을때 자동으로 생성하도록 하는 옵션을 검색하는게 어려웠다. 어떤사람은 hibernate.ddl-auto 라고 하고 어떤 사람은 create-schemas라고 하고 ㅎㅎ 결론은 jdbc url에 `createDatabaseIfNotExist=true` 요 옵션을 주는걸로.

+) yaml 쓰면서 궁금한점

- 비슷한 카테고리 같은데 왜 depth가 왜 다른걸까? jpa.hibernate랑 jpa.properties.hibernate 처럼.
- url username passwork 이거 다 datasource, flyway에 두 번씩 쓰게 되어있는데 ㅠ 변수로 정리해두긴 했으나.. 두 옵션이 한 값을 바라보도록 바로 설정은 안되는걸까?



# Layer 별 폴더 트리 생성

이제 로컬에 서버를 띄울 수 있는 상태가 되었으니 실제로 기능 개발을 할 수 있도록 폴더를 생성하자.

매번 Layer (Controller, Service, Repository) 별로 폴더링을 했는데 문득 다른 사람들은 어쩌고 있나 싶어 찾아보니 Entity/Domain별로 묶는 방법도 쓰이고 있다. 음 폴더로 묶으면 한 패키지가 되는데.. 패키지랑 맥락이 비슷한 개념은 Layer보단 Entity/Domain인 것 같기도 하고 고민이 되었지만... 실제로 패키지별로 따로 묶어서 배포/공유하는 것도 아니니 생각보다 엄청나게 메리트가 있을 것 같지 않다. 이번에도 Layer로 쪼개도록 한다.



# 첫번째 flyway 스크립트와 REST api 만들기

위에 yaml에 써있기는 한데 지금 만들고 있는 건 사이드프로젝트 중 하나였던 cowork-saga의 BE 이다. 만들 당시에는 node.js로 급하게 만들어서 썼는데 마음에 썩 들지 않았다... ㅎㅎ 그리고 그마저도 처음엔 장고였고 나의 pyhon 생산성이 심각히 떨어지는 것을 깨닫고 포기했던 것...  그래도 예전에 좀 써봤으니 할 수 있지 않을까 했는데 충격이었다 ^^

암튼 요 BE는 signalling server의 기능을 수행하기 위해 socket 통신도 필요하고, 메타 정보를 조회하고 저장하기 위해 REST 통신도 필요하다. 우선은 익숙한 REST api 부터 만들도록 한다.

uuid를 넘기면 workspace 이름을 조회하는 api를 만들어볼건데, 그러려면 우선 workspace 테이블을 생성해주어야겠다.

- V0_1_0__create_workspaces.sql

  ```sql
  CREATE TABLE workspaces (
  	workspace_id INT UNSIGNED auto_increment NOT NULL PRIMARY KEY,
  	workspace_name varchar(100) NOT NULL,
  	workspace_uuid varchar(36) NOT NULL,
  	workspace_password varchar(10) NULL,
  	created_at DATETIME NOT NULL DEFAULT NOW(),
  	updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW()
  )
  ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  ```

- V0_1_1__insert_workspaces.sql

  ```sql
  INSERT INTO workspaces
  (workspace_id, workspace_name, workspace_uuid, workspace_password, created_at, updated_at)
  VALUES(1, "HYEON's workspace", '2a2ba386-1ca1-49c6-8573-076916ac6139', 'Password', now(), now());
  ```



이제 Entity를 생성해준다.

- Workspace

  ```java
  @Entity
  @Table(name = "workspaces")
  @Builder
  @AllArgsConstructor
  @NoArgsConstructor
  @Getter
  public class Workspace {
      @Id
      private Integer id;
      private String name;
      @Column(name = "uuid", unique = true)
      private String uuid;
      private String password;
      private String createdAt;
      private String updatedAt;
  }
  ```

그리고 차례대로 Repository, Service, Controller를 만들어준다.

- WorkspaceRepository

  ```java
  @Repository
  public interface WorkspaceRepository extends JpaRepository<Workspace, Integer> {
      Workspace findByUuid(String uuid);
  }
  ```

- WorkspaceService

  ```java
  @Service
  @RequiredArgsConstructor
  public class WorkspaceService {
      private final WorkspaceRepository workspaceRepository;
  
      public Workspace getWorkspace(String uuid) {
          return workspaceRepository.findByUuid(uuid);
      }
  }
  ```

- WorkspaceController

  ```java
  @RestController
  @RequiredArgsConstructor
  public class WorkspaceController {
      private final WorkspaceService workspaceService;
  
      @GetMapping("/workspaces/{uuid}")
      public Workspace workspaceDetail(@PathVariable @Length(min=16, max=16) String uuid) {
          return workspaceService.getWorkspace(uuid);
      }
  }
  ```



+) 쿼리 결과는 정상적이지만 api 응답이 그냥  `{}` 로 떨어질 때

- return 한 Entity에 public getter가 없어서 그럴 수 있다. [참고](https://stackoverflow.com/questions/49117622/spring-rest-controller-returns-empty-json-iterable-data-structure-why)

이제 뼈대는 얼추 갖추게 된 것 같다. 다음 api 부터는 유용한 annotation 좀 찾고 aspect 붙이면서 보완해나가면 될 듯. 👩‍💻

# 마치며

- 처음부터 해보면 머리에 확실히 잘 들오는 것 같다. get api 하나 만드는데 생각보다 많은 것을 배웠다!
- JPA 아직은 왜 "하... 너넨 이런거 하지마라 🚬" 하는건 지 못느꼈다. 더 써봐야지.







