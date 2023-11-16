import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

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
