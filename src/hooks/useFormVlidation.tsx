import { useState } from "react";
import { ErrorType, FormData } from "../types/formTypes";

export const useFormValidation = () => {
    const [errorType, setErrorType] = useState<ErrorType>({
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
    });
    const isValidForm = (formData: FormData, formType: string): boolean => {
        const requiredFields: (keyof FormData)[] =
            formType === "signup"
                ? ["name", "email", "password", "confirmPassword"]
                : ["email", "password"];
        let isValid = true;

        for (const field of requiredFields) {
            if (!formData[field]) {
                setErrorType((prev) => ({
                    ...prev,
                    [field]: true,
                }));
                isValid = false;
            } else {
                setErrorType((prev) => ({
                    ...prev,
                    [field]: false,
                }));
            }
        }
        return isValid;
    };

    const isValidName = (name: string): boolean => {
        const regex = /^\S+$/;
        return regex.test(name);
    };
    const isValidEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    const isValidPassword = (password: string): boolean => {
        const regex =
            /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;

        return regex.test(password);
    };
    const isPasswordConfirmed = (
        password: string,
        confirmPassword: string
    ): boolean => {
        return password === confirmPassword;
    };
    return {
        isValidForm,
        isValidName,
        isValidEmail,
        isValidPassword,
        isPasswordConfirmed,
        errorType,
        setErrorType,
    };
};
