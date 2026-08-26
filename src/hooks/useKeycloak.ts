import { useState } from 'react';

import api from '../api/axios';
import { KeycloakApi } from '../api/keycloakApi';
import { type KeycloakConfigParams } from '../utils/auth';

function useKeycloak() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    const initializeKeycloak = () => {
        console.log('Initialize Keycloak');
    };

    const requestKeycloakInformationAndInit = async (email: string) => {
        try {
            const { data } = await api.post<KeycloakConfigParams>(KeycloakApi.keycloakConfig, {
                email,
            });
            console.log(data);
        } catch {}
    };

    return {
        isAuthenticated,
        isInitialized,
        requestKeycloakInformationAndInit,
    };
}

export default useKeycloak;
