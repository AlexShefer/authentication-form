import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/Signup";
import { Navbar } from "./components/Navbar";
function App() {
    const { user } = useAuthContext();
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <div className="pages">
                    <Routes>
                        <Route
                            path="/"
                            element={user ? <Home /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/login"
                            element={user ? <Navigate to="/" /> : <Login />}
                        />
                        <Route
                            path="/signup"
                            element={user ? <Navigate to="/" /> : <SignUp />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
