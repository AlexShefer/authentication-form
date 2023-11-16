# Форма аутентификации

-   [LIVE-VERSION](https://authentication-form-rose.vercel.app/)

-   [Презентация](https://www.loom.com/share/ea2b5a1c1bbe41568de6805ab6a99ac6?sid=64574e76-df2e-4f54-b55c-62fcb6756408)

Данный проект является решением для домашнего задания №1.
В проекте реализованы форма регистрации и форма авторизации с отправлением запроса сервер.
В качестве сервера используется сервер написанный на node express.js ([подробнее в репозитории](https://github.com/AlexShefer/authentication-server)).

## Технологии

-   React
-   React-router-dom
-   TypeScript
-   CSS

## Решенные задачи

1. Реализовать функцию валидацию формы аутентификации.

```
    /**
    * useFormValidation - это пользовательский хук React, предназначенный для валидации данных формы.
    *
    * @returns {Object} Объект, содержащий функции для валидации полей формы и состояние ошибок.
    * @property {Function} isValidForm - Проверяет заполненность полей.
    * @property {Function} isValidName - Проверяет валидность имени.
    * @property {Function} isValidEmail - Проверяет валидность email.
    * @property {Function} isValidPassword - Проверяет валидность пароля.
    * @property {Function} isPasswordConfirmed - Проверяет, совпадают ли пароль и его подтверждение.
    * @property {ErrorType} errorType - Состояние ошибок для каждого поля формы.
    * @property {Function} setErrorType - Устанавливает состояние ошибок для полей формы.
    */

    const {
            isValidForm,
            isValidName,
            isValidEmail,
            isValidPassword,
            isPasswordConfirmed,
            errorType,
            setErrorType,
        } = useFormValidation();
```

2. Реализовать отправку запроса регистрации на сервер.

```
/**
    * useSignup - это пользовательский хук React, предназначенный для обработки функционала регистрации пользователя.
    *
    * @returns {Object} Объект, содержащий функцию регистрации, состояние загрузки и состояние ошибки.
    * @property {Function} signup - Инициирует запрос на регистрацию пользователя на сервере аутентификации.
    * @property {boolean} isLoading - Индицирует, выполняется ли запрос на регистрацию.
    * @property {string | null} error - Содержит сообщение об ошибке, если запрос на регистрацию неудачен.
    *
    * /

    const { signup, isLoading, error } = useSignup();

```

3. Реализовать отправку запроса авторизации на сервер.

```
    /**
    * useLogin - это пользовательский хук React, предназначенный для обработки функционала входа пользователя.
    *
    * @returns {Object} Объект, содержащий функцию входа, состояние загрузки и состояние ошибки.
    * @property {Function} login - Инициирует запрос на вход на сервер аутентификации.
    * @property {boolean} isLoading - Индицирует, выполняется ли запрос на вход.
    * @property {string | null} error - Содержит сообщение об ошибке, если запрос на вход неудачен.
    *
    * /
    const { login, isLoading, error } = useLogin();

```

4. Автоматическая авторизация при обновлении страницы (если ранее быд выполнен вход)

```
// Загрузка пользователя из localStorage при монтировании компонента
    useEffect(() => {
        const userString = localStorage.getItem("user");

        if (userString !== null) {
            const user = JSON.parse(userString);
            dispatch({ type: "LOGIN", payload: user });
        }
    }, []);
```

5. Разработать интуитивный интерфейс.
