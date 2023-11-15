import { Link } from "react-router-dom";

export const Login = () => {
    return (
        <form className="login">
            <h2>Войти</h2>
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

            <button>Войти</button>
            <p className="link">
                Если у вас нет аккаунта, то{" "}
                <Link to="/signup">Зарегистрируйтесь</Link>
            </p>
        </form>
    );
};
