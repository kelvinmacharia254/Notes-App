import axios from 'axios';

import {ACCESS_TOKEN} from './constants';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        // if token is present, add it to the headers
        // ensure unauthenticated endpoints clears the token before sending the request e.g Register endpoint
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api;