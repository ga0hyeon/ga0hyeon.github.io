---
title: "@Valid"
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

여기까지는 이해가 쉬운데, 실제로 application에 붙이려고 보니 좀 더 자세히 알아야할 내용들이 많더군요 ㅎㅎ
이 글에서는 그 내용을 모아서 정리해보려고 합니다.

# @Valid 그리고 @Validated 어노테이션에 관하여

ide에서 @Valid를 입력할 때 자동완성 추천 결과에서 @Validated를 보신 적이 있나요?
@Valid와 달리 @Validated에는 Group을 지정할 수 있습니다.

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

    @Override
    public void initialize(NickNameConstraint contactNickname) {
    }

    @Override
    public boolean isValid(String contactField,
      ConstraintValidatorContext cxt) {
        return contactField != null && contactField.matches("system's nickname format");
    }

}
```

# Class말고 변수에도 바로 적용되는건가?
