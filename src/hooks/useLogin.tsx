import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

/**
 * useLogin - это пользовательский хук React, предназначенный для обработки функционала входа пользователя.
 *
 * @returns {Object} Объект, содержащий функцию входа, состояние загрузки и состояние ошибки.
 * @property {Function} login - Инициирует запрос на вход на сервер аутентификации.
 * @property {boolean} isLoading - Индицирует, выполняется ли запрос на вход.
 * @property {string | null} error - Содержит сообщение об ошибке, если запрос на вход неудачен.
 *
 * @example
 * // Использование в функциональном компоненте
 * const { login, isLoading, error } = useLogin();
 *
 * const handleLogin = async (email, password) => {
 *   try {
 *     await login(email, password);
 *     // Обработка успешного входа, если необходимо
 *   } catch (error) {
 *     // Обработка ошибки входа
 *   }
 * };
 */
export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    /**
     * Инициирует запрос на вход на сервер аутентификации.
     *
     * @async
     * @function
     * @param {string} email - Email пользователя.
     * @param {string} password - Пароль пользователя.
     * @throws {Error} Бросает ошибку, если запрос на вход неудачен.
     */
    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
            "https://authentication-server-ci9t.onrender.com/api/user/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            }
        );

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            // сохранить user в localStorage
            localStorage.setItem("user", JSON.stringify(json));

            // обновить AuthContext

            dispatch({ type: "LOGIN", payload: json });

            setIsLoading(false);
        }
    };
    return { login, isLoading, error };
};
