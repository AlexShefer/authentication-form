import { useState } from "react";
import { ErrorType, FormData } from "../types/formTypes";

/**
 * useFormValidation - это пользовательский хук React, предназначенный для валидации данных формы.
 *
 * @returns {Object} Объект, содержащий функции для валидации полей формы и состояние ошибок.
 * @property {Function} isValidForm - Проверяет заполненность полей.
 * @property {Function} isValidName - Проверяет валидность имени.
 * @property {Function} isValidEmail - Проверяет валидность email.
 * @property {Function} isValidPassword - Проверяет валидность пароля.
 * @property {Function} isPasswordConfirmed - Проверяет, совпадают ли пароль и его подтверждение.
 * @property {ErrorType} errorType - Состояние ошибок для каждого поля формы.
 * @property {Function} setErrorType - Устанавливает состояние ошибок для полей формы.
 *
 * @example
 * // Использование в функциональном компоненте
 * const {
 *   isValidForm,
 *   isValidName,
 *   isValidEmail,
 *   isValidPassword,
 *   isPasswordConfirmed,
 *   errorType,
 *   setErrorType
 * } = useFormValidation();
 *
 * const handleFormSubmit = (formData) => {
 *   if (isValidForm(formData, 'signup')) {
 *     // Отправить данные формы
 *   } else {
 *     // Обработка ошибок в форме
 *   }
 * };
 */
export const useFormValidation = () => {
    const [errorType, setErrorType] = useState<ErrorType>({
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    /**
     * Проверяет валидность данных формы в соответствии с её типом.
     *
     * @function
     * @param {FormData} formData - Данные формы для валидации.
     * @param {string} formType - Тип формы ('signup' | 'login').
     * @returns {boolean} - Возвращает true, если поля формы заполнены, иначе false.
     */
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
    /**
     * Проверяет валидность имени.
     *
     * @function
     * @param {string} name - Имя для валидации.
     * @returns {boolean} - Возвращает true, если имя не содержит пробелов, иначе false.
     */
    const isValidName = (name: string): boolean => {
        const regex = /^\S+$/;
        return regex.test(name);
    };

    /**
     * Проверяет валидность email.
     *
     * @function
     * @param {string} email - Email для валидации.
     * @returns {boolean} - Возвращает true, если email валиден, иначе false.
     */
    const isValidEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    /**
     * Проверяет валидность пароля.
     *
     * @function
     * @param {string} password - Пароль для валидации.
     * @returns {boolean} - Возвращает true, если пароль валиден
     * (валидный пароль не короче восьми символов, содержит не менее одной
     * прописной буквы, не менее одной заглавной буквы, одной прописной,
     * одной цифры, одного специального символа), иначе false.
     */
    const isValidPassword = (password: string): boolean => {
        const regex =
            /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;

        return regex.test(password);
    };

    /**
     * Проверяет, совпадают ли пароль и его подтверждение.
     *
     * @function
     * @param {string} password - Пароль.
     * @param {string} confirmPassword - Подтверждение пароля.
     * @returns {boolean} - Возвращает true, если пароль совпадает с подтверждением, иначе false.
     */
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
