import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface ErrorType {
    name: boolean;
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
}

import { Link } from "react-router-dom";
export const SignUp = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [isHidden, setIsHidden] = useState(true);
    const { signup, error: signupError, isLoading } = useSignup();
    console.log(signupError);
    const [error, setError] = useState<null | string>(null);
    const [errorType, setErrorType] = useState<ErrorType>({
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };
    const isValidForm = (): boolean => {
        const requiredFields: (keyof FormData)[] = [
            "name",
            "email",
            "password",
            "confirmPassword",
        ];
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
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isValidForm()) {
            setError("Все поля должны быть заполнены");
        } else if (!isValidName(formData.name)) {
            setErrorType((prev) => ({
                ...prev,
                name: true,
            }));
            setError("Имя не должно содержать пробелов");
        } else if (!isValidEmail(formData.email)) {
            setErrorType((prev) => ({
                ...prev,
                email: true,
            }));
            setError("Введите правильный Email адрес");
        } else if (!isValidPassword(formData.password)) {
            setErrorType((prev) => ({
                ...prev,
                password: true,
            }));
            setError(
                "Пароль должен состоять не менее чем из 8 символов, содержать заглавные буквы, число и символ"
            );
        } else if (
            !isPasswordConfirmed(formData.password, formData.confirmPassword)
        ) {
            setErrorType((prev) => ({
                ...prev,
                password: true,
                confirmPassword: true,
            }));
            setError("Пароль и подтверждение пароля не совпадают");
        } else {
            await signup(formData.name, formData.email, formData.password);
            setError(null);
        }
    };
    const ShowPassword = () => {
        return (
            <div
                className="show-password"
                onClick={() => setIsHidden((prev) => !prev)}
            >
                {isHidden ? (
                    <span className="fas">&#xf06e;</span>
                ) : (
                    <span className="fas">&#xf070;</span>
                )}
            </div>
        );
    };
    return (
        <form onSubmit={handleSubmit} className="signup" noValidate>
            <h2>Регистрация</h2>
            <div
                className={errorType.name ? "input-group error" : "input-group"}
            >
                <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    required
                />
                <label htmlFor="name">Имя:</label>
                <i className="fas fa-user"></i>
            </div>
            <div
                className={
                    errorType.email ? "input-group error" : "input-group"
                }
            >
                <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    required
                />
                <label htmlFor="email">Email:</label>
                <i className="fas fa-at"></i>
            </div>
            <div
                className={
                    errorType.password ? "input-group error" : "input-group"
                }
            >
                <input
                    type={isHidden ? "password" : "text"}
                    id="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    required
                />
                <label htmlFor="password">Пароль:</label>
                <i className="fas fa-lock"></i>
                <ShowPassword />
            </div>
            <div
                className={
                    errorType.confirmPassword
                        ? "input-group error"
                        : "input-group"
                }
            >
                <input
                    type={isHidden ? "password" : "text"}
                    id="password-confirmation"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={formData.confirmPassword}
                    required
                />
                <label htmlFor="password-confirmation">
                    Подтверждение пароля:
                </label>
                <i className="fas fa-lock"></i>
            </div>
            {error ? (
                <div className="error-field">{error}</div>
            ) : signupError ? (
                <div className="error-field">{signupError}</div>
            ) : (
                ""
            )}

            <button type="submit" disabled={isLoading}>
                Зарегистрироваться
            </button>
            <p className="link">
                У вас уже есть аккаунт? <Link to="/login">Вход</Link>
            </p>
        </form>
    );
};
