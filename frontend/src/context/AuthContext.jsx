import { createContext, useContext, useState } from "react";

//create authentication context
const AuthContext = createContext();

// Create Auth Provider
export const AuthProvider = ({ children}) => {

    // Get token from localStorage
    const [token, setToken] = useState(
        localStorage.getItem('token')
    );

    // Get user information from localStorage
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');

        return storedUser ? JSON.parse(storedUser) : null;
    });

     // Login function
    const login = (userData, tokenData) => {

        localStorage.setItem('token', tokenData);

        localStorage.setItem(
            'user',
            JSON.stringify(userData)
        );

        setToken(tokenData);
        setUser(userData);
    };

     // Logout function
    const logout = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        setToken(null);
        setUser(null);
    };

     return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                isAuthenticated: !!token
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook
export const useAuth = () => {
    return useContext(AuthContext);
};

