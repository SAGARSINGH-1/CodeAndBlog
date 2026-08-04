// src/lib/api.js
import axios from "axios";
import conf from "../conf/conf.js";

const api = axios.create({
    baseURL: `${conf.apiUrl}/api`,
});

// Attach the JWT (stored at login/signup) to every request automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
