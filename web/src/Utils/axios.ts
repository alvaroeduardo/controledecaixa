import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5555/api', // Substitua pela URL base da sua API
});

// Adiciona um interceptor para incluir o token de autorização em todas as requisições
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // return Promise.reject(error);
    }
);

export default api;
