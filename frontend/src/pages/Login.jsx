import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Form validation
    const validateForm = () => {

        if (!email.trim()) {
            return 'Email address is required';
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.trim())) {
            return 'Please enter a valid email address';
        }

        if (!password) {
            return 'Password is required';
        }

        return null;
    };


   
const handleLogin = async (e) => {

    e.preventDefault();

    // Validate form
    const validationError = validateForm();

    if (validationError) {
        setErrorMessage(validationError);
        return;
    }

    try {

        setLoading(true);
        setErrorMessage("");

        // Send login request
        const response = await API.post("/auth/login", {
            email,
            password
        });

        

        // Extract user information and token
        const { token, _id, name } = response.data;

        // Create user object
        const userData = {
            _id,
            name,
            email: response.data.email
        };

        // Update authentication context
        login(userData, token);

        // Navigate to dashboard
        navigate("/dashboard");

    } catch (error) {

        console.error("LOGIN ERROR:", error);
        console.error("ERROR MESSAGE:", error.message);
        console.error("SERVER ERROR:", error.response?.data);

        setErrorMessage(
            error.response?.data?.message ||
            "Login failed. Please try again."
        );

    } finally {

        setLoading(false);

    }
};



    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

                <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
                    Job Tracker
                </h1>

                <p className="text-center text-gray-500 mb-8">
                    Login To Your Account
                </p>

                <form onSubmit={handleLogin}>

                    {/* Error Message */}
                    {errorMessage && (
                        <p className="text-red-500 text-sm mb-4">
                            {errorMessage}
                        </p>
                    )}

                    {/* Email */}
                    <div className="mb-4">

                        <label className="block text-gray-700 mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Email Address"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    {/* Password */}
                    <div className="mb-6">

                        <label className="block text-gray-700 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                </form>

                <p className="text-center text-gray-600 mt-6">
                    Don't have an account?{' '}

                    <Link to="/register" className="text-blue-600 font-semibold">
                        Register
                    </Link>

                </p>

            </div>

        </div>

    );
}

export default Login;