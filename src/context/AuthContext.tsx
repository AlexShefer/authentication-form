import { createContext, useReducer } from "react";

type AuthUser = {
    userName: string;
    email: string;
    token: string;
};

type AuthState = {
    user: AuthUser | null;
};

type LoginAction = {
    type: "LOGIN";
    payload: AuthUser;
};
type LogoutAction = {
    type: "LOGOUT";
};

type AuthContextType = {
    user: AuthUser | null;
    dispatch: React.Dispatch<LoginAction | LogoutAction>;
};

type AuthContextProviderProps = {
    children: React.ReactNode;
};
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

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
