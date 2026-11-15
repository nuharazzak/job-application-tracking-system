import { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

function Register() {

    // State variables
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Form validation
    const validateForm = () => {

        if (!name.trim()) {
            return 'Full name is required';
        }

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

        if (password.length < 8) {
            return 'Password must be at least 8 characters';
        }

        return null;
    };


    // Handle registration
    const handleRegister = async (e) => {

        e.preventDefault();

        setErrorMessage('');
        setSuccessMessage('');

        // Validate form
        const validationError = validateForm();

        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        setLoading(true);

        try {

            const response = await API.post('auth/register', {
                name: name.trim(),
                email: email.trim(),
                password
            });

            setSuccessMessage(response.data.message);

            // Clear form fields
            setName('');
            setEmail('');
            setPassword('');

        }
        catch (error) {

            setErrorMessage(
                error.response?.data?.message || 'Registration failed. Please try again.'
            );

        }
        finally {

            setLoading(false);

        }
    };


    // JSX
    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

                <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
                    Job Tracker
                </h1>

                <p className="text-center text-gray-500 mb-8">
                    Create Your Account
                </p>

                <form onSubmit={handleRegister}>

                    {/* Error Message */}
                    {errorMessage && (
                        <p className="text-red-500 text-sm mb-4">
                            {errorMessage}
                        </p>
                    )}

                    {/* Success Message */}
                    {successMessage && (
                        <p className="text-green-600 text-sm mb-4">
                            {successMessage}
                        </p>
                    )}

                    {/* Full Name */}
                    <div className="mb-4">

                        <label className="block text-gray-700 mb-2">
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Full Name"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

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
                            minLength="8"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>

                </form>

                <p className="text-center text-gray-600 mt-6">
                    Already have an account?{' '}

                    <Link to="/login" className="text-blue-600 font-semibold">
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );
}

export default Register;