import axios from 'axios';

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 30000,
    headers: { "Content-Type": "application/json" }
});

// interceptor request
httpClient.interceptors.request.use(config => {
    const adminString = sessionStorage.getItem("admin");
    if (adminString) {
        const admin = JSON.parse(adminString);
        if (admin?.token) {
        config.headers.Authorization = `Bearer ${admin.token}`;
        }
    }
    return config;
});

// interceptor response
httpClient.interceptors.response.use(
    (res) => res.data,
    (err) => {
        const custom = new Error(err.response?.data?.message || "Error");
        custom.status = err.response?.status;
        custom.data = err.response?.data;
        throw custom;
    }
);

export default httpClient;   // <--- ESTA PARTE SÍ EXPORTA axios
