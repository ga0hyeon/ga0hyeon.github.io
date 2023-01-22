---
title: "[Spring] @Valid @Validated에 대해 알아보자"
date: 2022-02-18 23:00:19
tags: ["@Valid", Spring, Annotation]
categories: [Tech, Spring Boot]
---

# MOTIVATION

사용자로부터 받아온 Input 값을 우리 시스템에 넣어 처리하기 전에 검증하는 것은 매우 흔한 작업임. 볼 필요도 없는 값을 시스템 자원을 써가면서 처리할 필요가 없음.  
이러한 검증은 몇 개의 if문과 validation utility로 물론 쉽게 구현이 가능하지만, server framework로 spring을 사용하고 있다면 아래와 같이 더 간결한 코드로 검증을 마칠 수 있음.

```java
public class UserAcccount{
    @NotBlank
    private String name;

    @NotNull
    @Size(min = 4, max = 15)
    private String password;
}
```

```java
public void login(
    @Valid UserAccount userAccount,
){
    service.login(userAccount);
}
```

여기까지는 이해가 쉬운데, 실제로 application에 붙이려고 보니 좀 더 자세히 알아야할 내용들이 많았음. --
이 글에서는 그 내용을 모아서 정리해봄.

# @Valid 그리고 @Validated 어노테이션에 관하여

ide에서 @Valid를 입력할 때 자동완성 추천 결과에서 @Validated이 뜨던데, 처음에는 지나쳤었다.

@Valid를 잘 써보고자 구글링을 하니 두 어노테이션에는 다음과 같은 차이점이 있다는 내용이 아주 많이 나왔다.

👉 @Valid는 Java에서 제공됨
👉 @Validated는 Spring 프레임워크에서 제공되며, @Valid의 기능을 포함함
👉 @Valid는 method의 parameter 또는 class field에 사용된 complex object에 적용할 수 있음
👉 @Validated는 @Valid가 사용되는 상황 뿐만 아니라, primitive type parameter에 Validation을 추가하고 싶을 때도 사용할 수 있음 (하단에서 후술)
👉 @Valid와 달리 @Validated에는 Group을 지정할 수 있음. Validation Group에 대한 내용은 아래에 좀 더 자세히 정리함

# Validation Group에 대하여. 그리고 이거 정말 꿀기능 맞을까?

한 개의 class 안에 여러 개의 제약조건 그룹을 지정하고자 하는 경우에 유용하게 사용할 수 있음.
제약조건마다, 즉 Request마다 VO를 모두 따로따로 만들어야 하는건가 절망에 빠져있을 때 찾은 내용이라 매우 꿀기능처럼 느껴졌음. (꿀인지 아닌지 아직 엄청 많이 써보지는 않아서 모름 ^\_^)

```java
public class ValidationGroups {
    public interface EmailChange {};
    public interface PasswordChange {};
}
```

```java
public class ChangeUserAccountRequest {
    @Email(groups = {ValidationGroups.EmailChange.class})
    private String email;

    @NotEmpty(groups = {ValidationGroups.PasswordChange.class})
    private String password;
}
```

```java
public void changeUserEmail(
    @Validated(ValidationGroups.EmailChange) ChangeUserAccountRequest request,
){
    service.changeUserEmail(request);
}

public void changeUserPassword(
    @Validated(ValidationGroups.PasswordChange) ChangeUserAccountRequest request,
){
    service.changeUserPassword(request);
}
```

+) 개인적인 의견
VO, DTO 객체 한 개만으로도 여러개의 constraint를 제어할 수 있어서 엄청난 꿀 기능처럼 보이기도 하지만, 지나치게 많아지면 가독성에는 문제가 조금 있는 것 같다... 🤣

# Custom Validator에 관하여

제공되는 기본 validator도 충분히 다양하지만, 우리 서비스만의 validator를 만들고 싶을 때도 있음

```java
@Constraint(validatedBy = NicknameValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface NickNameConstraint {
    String message() default "유효하지 않은 닉네임 형식입니다.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
```

```java
public class NicknameValidator implements
  ConstraintValidator<NickNameConstraint, String> {

    private NickNameConstraint constraint;

    @Override
    public void initialize(NickNameConstraint constraint) {
        this.constraint = constraint;
    }

    @Override
    public boolean isValid(String value,
      ConstraintValidatorContext cxt) {
        return value != null && value.matches("system's nickname format");
    }

}
```

+) 개인적인 의견  
신기하게도 custom validator는 아직 단점을 잘 모르겠다...! 지나치게 많이 선언하는거야 당연히 안좋은거고, 프로젝트 내에서 통용되는 몇 가지 validation 로직을 공통화 해놓으면 코드가 부드럽게 읽히는 magic이...  
( 단점을 발견하게되면 충격받아서 흑역사 지우러 바로 위의 문장 수정하러 올 듯 .... ㅎㅎ )

# Trouble Shooting🔥

## ⚠ @Valid가 primitive type의 변수(대표적으로 Controller에서 PathVariable로 받아온 값들..)에서 동작하지 않음

이 부분 때문에 많이 헤맸음 ㅠㅠㅠㅜㅜ  
Controller에서 특정 api의 PathVariable에 Validator를 달아주고 싶었는데, 이때는 parameter 앞에 @Valid를 붙여주는 것 만으로는 원하는 대로 동작하지 않았음 😥 WHY?!?!!
객체로 받아오는 BodyParam에 붙여준 @Valid는 잘 동작했는디...

.
.
.

두구두구

위에서 @Valid와 @Validated의 차이에 스포해둔 것 처럼, PathVariable에 Validator를 적용하기 위해서는 상위 Class에 @Validated 어노테이션을 달아줘야함

```java
@Validated
public class YourController {

    private final YourService yourService;

    @GetMapping("somethings/{type_code}")
    public ResponseEntity<List<SomeVO>> findSomethingByTypeCode(@Size(min = 4, max = 6)
                                                        @PathVariable String typeCode) {
        return ResponseEntity.ok(yourService.findSomethingByTypeCode(typeCode));
    }
}

```

## ⚠ Exception 처리 시 주의

@Valid와 @Validated 어노테이션은 서로 다른 타입의 Error를 던지므로, 공통 처리 모듈에서 약간의 분기 처리가 필요함

@Valid 어노테이션에서는 javax.validation.ConstraintViolationException 을,  
@Validated 어노테이션에서는 org.springframework.web.bind.MethodArgumentNotValidException 을 발생시킴

어떤 field에서 Error가 발생했는지, 어떤 Error가 발생했는지 두 개의 Exception이 제공하는 field가 달라서 공통화에 시간이 조금 들었음, 참고하면 좋을 듯 :)

## ⚠ 달기 쉬운 만큼, 중복하여 validate 하지 않도록 주의

이 부분은 지금도 계속 어떻게 하면 중복을 최소화할까 고민하며 코딩하고 있는 내용임.

코드로 적혀있는 로직은 중복되어있으면 쉽게 눈에 밟히는데, annotation은 무심코 넘어가게 되는 경우가 많아서 valid도 무심코 여러번 태우게되는 경우가 있었음.  
정석적인 답은 "가장 안쪽의 로직에만 적용하라" 겠지만 이 메소드 저 메소드 서로 공유하는 상황에서 그러기가 쉽지가 않다. 🤣  
"이 값은 보장되어서 들어온 값이니까 믿어도 돼" 라는 flag를 함께 넘겨줄 수 있을까? 이것저것 고민해봐야지!
