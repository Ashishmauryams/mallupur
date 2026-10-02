import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Har request ke saath token automatically jayega
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// RESPONSE INTERCEPTOR

axiosInstance.interceptors.response.use(

    (response) => {

        return response;
    },

    (error) => {
        const status = error.response?.status;
        const url = error.config?.url || "";

        if ((status === 401 || status === 403) &&
            !url.includes("/login")
        ) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            // window.location.href = "/login";
            window.location.replace("/login");
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;