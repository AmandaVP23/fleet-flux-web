import axios from 'axios';

import { API_URL } from '../settings';

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(
    function (config) {
        // todo - put Bearer token
        console.log('Inside axios interceptor');
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

export default api;
