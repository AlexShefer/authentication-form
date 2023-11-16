export interface FormData {
    name?: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

export interface ErrorType {
    name: boolean;
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
}
