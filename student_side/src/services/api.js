import axios from "axios";

// axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

const API_URL = "http://127.0.0.1:8000/api/"

const api = axios.create({
    baseURL: API_URL
})

api.interceptors.request.use(
(config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
},

(error) => {
    return Promise.reject(error);
}
);

export default api