import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
export const Home = () => {
    const { user } = useAuthContext();
    return (
        <div className="home">
            {user ? (
                <h3>{user?.userName}, добро пожаловать на сайт</h3>
            ) : (
                <h3>
                    Для просмотра содержимого необходимо сайта выполнить{" "}
                    <Link to="/login">Вход</Link>
                </h3>
            )}
        </div>
    );
};
