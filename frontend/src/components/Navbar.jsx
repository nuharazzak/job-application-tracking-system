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

        <nav className="bg-white shadow-sm border-b border-gray-200">

            <div className="px-6">

                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Link
                        to={isAuthenticated ? "/dashboard" : "/login"}
                        className="text-2xl font-bold text-blue-600"
                    >
                        JobTracker
                    </Link>

                    {/* Navigation */}
                    <div className="flex items-center gap-6">

                        {isAuthenticated ? (

                            <>
                                <span className="text-gray-700">
                                    Welcome, {user?.name}
                                </span>

                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                                >
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

                </div>

            </div>

        </nav>

    );
};

export default Navbar;