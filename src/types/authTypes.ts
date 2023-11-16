type AuthUser = {
    userName: string;
    email: string;
    token: string;
};

export type AuthState = {
    user: AuthUser | null;
};

export type LoginAction = {
    type: "LOGIN";
    payload: AuthUser;
};
export type LogoutAction = {
    type: "LOGOUT";
};

export type AuthContextType = {
    user: AuthUser | null;
    dispatch: React.Dispatch<LoginAction | LogoutAction>;
};

export type AuthContextProviderProps = {
    children: React.ReactNode;
};
