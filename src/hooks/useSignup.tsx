import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

/**
 * useSignup - это пользовательский хук React, предназначенный для обработки функционала регистрации пользователя.
 *
 * @returns {Object} Объект, содержащий функцию регистрации, состояние загрузки и состояние ошибки.
 * @property {Function} signup - Инициирует запрос на регистрацию пользователя на сервере аутентификации.
 * @property {boolean} isLoading - Индицирует, выполняется ли запрос на регистрацию.
 * @property {string | null} error - Содержит сообщение об ошибке, если запрос на регистрацию неудачен.
 *
 * @example
 * // Использование в функциональном компоненте
 * const { signup, isLoading, error } = useSignup();
 *
 * const handleSignup = async (userName, email, password) => {
 *   try {
 *     await signup(userName, email, password);
 *     // Обработка успешной регистрации, если необходимо
 *   } catch (error) {
 *     // Обработка ошибки регистрации
 *   }
 * };
 */

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (
        userName: string,
        email: string,
        password: string
    ) => {
        setIsLoading(true);
        setError(null);

        /**
         * Инициирует запрос на регистрацию пользователя на сервере аутентификации.
         *
         * @async
         * @function
         * @param {string} userName - Имя пользователя.
         * @param {string} email - Email пользователя.
         * @param {string} password - Пароль пользователя.
         * @throws {Error} Бросает ошибку, если запрос на регистрацию неудачен.
         */

        const response = await fetch(
            "https://authentication-server-ci9t.onrender.com/api/user/signup",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, email, password }),
            }
        );

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
            console.log(error);
        }
        if (response.ok) {
            //сохранить user в localStorage
            localStorage.setItem("user", JSON.stringify(json));

            // обновит authContext

            dispatch({ type: "LOGIN", payload: json });

            setIsLoading(false);
        }
    };
    return { signup, isLoading, error };
};
