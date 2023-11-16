import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useFormValidation } from "../hooks/useFormVlidation";
import { FormData } from "../types/formTypes";

import { Link } from "react-router-dom";
export const Login = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });
    const { isValidForm, isValidEmail, errorType, setErrorType } =
        useFormValidation();
    const { login, error: loginError, isLoading } = useLogin();
    const [isHidden, setIsHidden] = useState(true);

    const [error, setError] = useState<null | string>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!isValidForm(formData, "login")) {
            setError("Все поля должны быть заполнены");
        } else if (!isValidEmail(formData.email)) {
            setErrorType((prev) => ({
                ...prev,
                email: true,
            }));
            setError("Введите правильный Email адрес");
        } else {
            await login(formData.email, formData.password);
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
        <form className="signup" noValidate>
            <h2>Вход</h2>

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

            {error ? (
                <div className="error-field">{error}</div>
            ) : loginError ? (
                <div className="error-field">{loginError}</div>
            ) : (
                ""
            )}

            <button onClick={handleSubmit} disabled={isLoading}>
                Войти
            </button>
            <p className="link">
                Если у вас нет аккаунта, то{" "}
                <Link to="/signup">Зарегистрируйтесь</Link>
            </p>
        </form>
    );
};
