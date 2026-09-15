import { useState } from 'react';

import api from '../api/axios';
import { KeycloakApi } from '../api/keycloakApi';
import { initKeycloak } from '../keycloak';
import { type KeycloakConfigParams } from '../utils/auth';

function useKeycloak() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    const initializeKeycloak = async (email: string, config: KeycloakConfigParams) => {
        console.log('Initialize Keycloak');
        const keycloak = initKeycloak(config);

        try {
            // todo - handle save the config in local storage and init when has config
            // todo send tokens in init when has config + tokens
            const authenticated = await keycloak.init({
                onLoad: 'check-sso',
            });

            if (!authenticated) {
                keycloak.login({
                    loginHint: email,
                });
            }

            console.log('authenticated', authenticated);
        } catch {}
    };

    const requestKeycloakInformationAndInit = async (email: string) => {
        try {
            const { data } = await api.post<KeycloakConfigParams>(KeycloakApi.keycloakConfig, {
                email,
            });
            console.log('data');
            console.log(data);
            await initializeKeycloak(email, data);
        } catch {}
    };

    return {
        isAuthenticated,
        isInitialized,
        requestKeycloakInformationAndInit,
    };
}

export default useKeycloak;
