import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

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
