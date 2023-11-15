import { Link } from "react-router-dom";
export const SignUp = () => {
    return (
        <form className="signup">
            <h2>Регистрация</h2>
            <div className="input-group">
                <input type="text" id="name" required />
                <label htmlFor="name">Имя:</label>
                <i className="fas fa-user"></i>
            </div>
            <div className="input-group">
                <input type="text" id="email" required />
                <label htmlFor="email">Email:</label>
                <i className="fas fa-at"></i>
            </div>
            <div className="input-group">
                <input type="password" id="password" required />
                <label htmlFor="password">Пароль:</label>
                <i className="fas fa-lock"></i>
            </div>
            <div className="input-group">
                <input type="password" id="password-confirmation" required />
                <label htmlFor="password-confirmation">
                    Подтверждение пароля:
                </label>
                <i className="fas fa-lock"></i>
            </div>

            <button>Зарегистрироваться</button>
            <p className="link">
                У вас уже есть аккаунт? <Link to="/login">Вход</Link>
            </p>
        </form>
    );
};
