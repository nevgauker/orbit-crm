import axios from "axios";

export const apiClient = axios.create({
    baseURL: "/api", // Base API URL
});

// Add an interceptor to include the token in all requests
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
);

export default apiClient
