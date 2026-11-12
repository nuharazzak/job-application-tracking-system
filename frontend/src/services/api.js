import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:5000/api'
});

// Request Interceptor
API.interceptors.request.use(
    (config) => {

        // Get token from localStorage
        const token = localStorage.getItem('token');

        // Attach token to request headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


export default API;