import { useAuthContext } from "./useAuthContext";

/**
 * useLogout - это пользовательский хук React, предназначенный для обработки функционала выхода пользователя.
 *
 * @returns {Object} Объект, содержащий функцию выхода.
 * @property {Function} logout - Выполняет выход пользователя, удаляя информацию о пользователе из localStorage и диспетчеризируя действие LOGOUT.
 *
 * @example
 * // Использование в функциональном компоненте
 * const { logout } = useLogout();
 *
 * // Вызов функции выхода при нажатии кнопки "Выйти"
 * <button onClick={logout}>Выйти</button>
 */

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        // удалить user из localStorage
        localStorage.removeItem("user");
        // dispatch logout action
        dispatch({ type: "LOGOUT" });
    };

    return { logout };
};
