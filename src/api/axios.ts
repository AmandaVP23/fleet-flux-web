import axios from 'axios';

import { getKeycloak } from '../auth/keycloak';
import { API_URL } from '../settings';

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(
    function (config) {
        const keycloak = getKeycloak();

        if (keycloak.token) {
            config.headers['Authorization'] = `Bearer ${keycloak.token}`;
        }
        return config;
    },
    function (error) {
        // todo - handle 401
        return Promise.reject(error);
    },
);

export default api;
