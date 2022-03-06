---
title: "@Valid @Validated"
date: 2022-02-18 23:00:19
tags: ["@Valid", Spring, Annotation]
categories: [Spring]
---

# 이 글을 쓰게 된 이유

사용자로부터 받아온 Input 값을 우리 시스템에 넣어 처리하기 전에 검증하는 것은 매우 흔한 작업입니다. 볼 필요도 없는 값을 시스템 자원을 써가면서 처리할 필요가 없겠죠. 이러한 검증은 몇 개의 if문과 validation utility로 쉽게 구현이 가능하지만, server framework로 spring을 사용하고 있다면 아래와 같이 더 간결한 코드로 검증을 마칠 수 있습니다.

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

여기까지는 이해가 쉬운데, 실제로 application에 붙이려고 보니 좀 더 자세히 알아야할 내용들이 많았어요. ㅎㅎ
이 글에서는 그 내용을 모아서 정리해보려고 합니다.

# @Valid 그리고 @Validated 어노테이션에 관하여

ide에서 @Valid를 입력할 때 자동완성 추천 결과에서 @Validated를 보신 적이 있나요?

두 어노테이션에는 다음과 같은 차이점이 있습니다.
👉 @Valid는 Java에서 제공됩니다.
👉 @Validated는 Spring 프레임워크에서 제공됩니다. @Valid의 기능을 포함하고요.
👉 @Valid는 method의 parameter 또는 class field에 사용된 complex object에 적용할 수 있습니다.
👉 @Validated는 @Valid가 사용되는 상황 뿐만 아니라, primitive type parameter에 Validation을 추가하고 싶을 때도 사용할 수 있습니다. (하단에서 후술합니다.)
👉 @Valid와 달리 @Validated에는 Group을 지정할 수 있습니다.

Validation Group에 대한 내용은 좀 더 찾아봤어요.  
한 개의 class 안에 여러 개의 제약조건 그룹을 지정하고자 하는 경우에 유용하게 사용할 수 있어보입니다.

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

# Custom Validator에 관하여

제공되는 기본 validator도 충분히 다양하지만, 우리 서비스만의 validator를 만들고 싶을 때도 있습니다.

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

# ⚠ @Valid가 primitive type의 변수(대표적으로 Controller에서 PathVariable로 받아온 값들..)에서 동작하지 않아요

이 부분 때문에 많이 헤맸어요. Controller에서 특정 api의 PathVariable에 Validator를 달아주고 싶었는데 이때는 parameter 앞에 @Valid를 붙여주는 것 만으로는 원하는 대로 동작하지 않았습니다.😥 객체로 받아오는 BodyParam에 붙여준 @Valid는 잘 동작했는데 말이죠...

위에서 @Valid와 @Validated의 차이에 정리해둔 것 처럼, PathVariable에 Validator를 적용하기 위해서는 상위 Class에 @Validated 어노테이션을 달아줘야합니다.

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

# ⚠ Exception 처리 시 주의하세요

@Valid와 @Validated 어노테이션은 서로 다른 타입의 Error를 던지므로, 공통 처리 모듈에서 약간의 분기 처리가 필요합니다.

@Valid 어노테이션에서는 javax.validation.ConstraintViolationException 을,  
@Validated 어노테이션에서는 org.springframework.web.bind.MethodArgumentNotValidException 을 발생시킵니다.

어떤 field에서 Error가 발생했는지, 어떤 Error가 발생했는지 두 개의 Exception이 제공하는 field가 다릅니다. 처리 시 주의하세요.
