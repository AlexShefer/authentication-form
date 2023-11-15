import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Test task #1</h1>
                </Link>
                <nav>
                    <div>
                        <button>Выход</button>
                    </div>

                    <div>
                        <Link to="/login">Войти</Link>
                        <Link to="/signup">Зарегистрироваться</Link>
                    </div>
                </nav>
            </div>
        </header>
    );
};
