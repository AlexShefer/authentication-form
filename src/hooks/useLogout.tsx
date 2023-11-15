import { useAuthContext } from "./useAuthContext";

export const useLogOut = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        // удалить user из localStorage
        localStorage.removeItem("user");
        // dispatch logout action
        dispatch({ type: "LOGOUT" });
    };

    return { logout };
};
