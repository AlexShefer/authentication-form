import { createContext, useReducer } from "react";
import { useEffect } from "react";
import {
    AuthContextType,
    AuthState,
    LoginAction,
    LogoutAction,
    AuthContextProviderProps,
} from "../types/authTypes";

const initialState = { user: null };

export const AuthContext = createContext<AuthContextType | null>(null);

const authReducer = (_: AuthState, action: LoginAction | LogoutAction) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };
        case "LOGOUT":
            return { user: null };
        default:
            return { user: null };
    }
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const userString = localStorage.getItem("user");

        if (userString !== null) {
            const user = JSON.parse(userString);
            dispatch({ type: "LOGIN", payload: user });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
