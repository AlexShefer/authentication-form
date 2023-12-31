import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Test task #1</h1>
                </Link>
                <nav>
                    {user ? (
                        <div>
                            <button onClick={() => logout()}>Logout</button>
                        </div>
                    ) : (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};
