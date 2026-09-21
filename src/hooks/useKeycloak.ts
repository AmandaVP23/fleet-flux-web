import { useCallback, useRef, useState } from 'react';

import api from '../api/axios';
import { KeycloakApi } from '../api/keycloakApi';
import { initKeycloak } from '../keycloak';
import { useAuthStore, type AuthSession } from '../stores/authStore';
import { type KeycloakConfigParams } from '../utils/auth';
import { buildRoute } from '../utils/misc';

function useKeycloak() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [isInitialized, setIsInitialized] = useState(false);
    const isInitializedRef = useRef(false);

    const setKeycloakConfig = useAuthStore((state) => state.setKeycloakConfig);
    const setSession = useAuthStore((state) => state.setSession);
    const setTenantHostname = useAuthStore((state) => state.setTenantHostname);
    const session = useAuthStore((state) => state.session);

    const initializeKeycloak = useCallback(
        async (config: KeycloakConfigParams) => {
            const keycloak = initKeycloak(config);

            keycloak.onAuthSuccess = () => {
                console.log('onAuthSuccess');
            };

            keycloak.onAuthError = (error) => {
                console.error('onAuthError', error);
                setTenantHostname('');
                setKeycloakConfig({
                    serverUrl: '',
                    realm: '',
                    clientId: '',
                });
            };

            keycloak.onAuthLogout = () => {
                console.log('onAuthLogout');
            };

            keycloak.onTokenExpired = () => {
                console.log('onTokenExpired');
            };

            try {
                console.log('Before calling init');
                const authenticated = await keycloak.init({
                    onLoad: 'login-required',
                    checkLoginIframe: false,
                    ...session,
                    // responseMode: 'query',
                });

                isInitializedRef.current = true;

                // todo - refresh token
                if (authenticated) {
                    setSession({
                        token: keycloak.token,
                        refreshToken: keycloak.refreshToken,
                        idToken: keycloak.idToken,
                    });
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Keycloak init failed:', error);
                setTenantHostname('');
                setKeycloakConfig({
                    serverUrl: '',
                    realm: '',
                    clientId: '',
                });
            }
        },
        [session, setTenantHostname, setSession, setKeycloakConfig],
    );

    const requestKeycloakInformationAndInit = useCallback(
        async (hostname: string) => {
            try {
                const { data } = await api.get<KeycloakConfigParams>(
                    buildRoute(KeycloakApi.keycloakConfig, { hostname }),
                );
                setTenantHostname(hostname);
                setKeycloakConfig(data);
                await initializeKeycloak(data, session);
            } catch {}
        },
        [session, initializeKeycloak, setTenantHostname, setKeycloakConfig],
    );

    return {
        isAuthenticated,
        isInitialized: isInitializedRef,
        initializeKeycloak,
        requestKeycloakInformationAndInit,
    };
}

export default useKeycloak;
