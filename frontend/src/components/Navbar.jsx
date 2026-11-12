import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {

    const { isAuthenticated, logout, user } = useAuth();

    const navigate = useNavigate();

    // Handle logout
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav>

            <h2>JobTracker</h2>

            <div>

                {isAuthenticated ? (

                    <>
                        <span>Welcome, {user?.name}</span>

                        <Link to="/dashboard">
                            Dashboard
                        </Link>

                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </>

                ) : (

                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/register">
                            Register
                        </Link>
                    </>

                )}

            </div>

        </nav>
    );
};

export default Navbar;