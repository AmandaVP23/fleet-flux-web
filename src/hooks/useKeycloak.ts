import { useCallback, useEffect, useRef, useState } from 'react';

import api from '../api/axios';
import { KeycloakApi } from '../api/keycloakApi';
import { UsersApi } from '../api/usersApi';
import { getKeycloak } from '../auth/keycloak';
import { useAuthStore } from '../stores/authStore';
import { type KeycloakConfigParams } from '../utils/auth';
import { buildRoute } from '../utils/misc';
import { useUsers } from './useUsers';

let keycloakInitPromise: Promise<boolean> | undefined;
let initializedConfig: KeycloakConfigParams | undefined;

function useKeycloak() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    const { requestAuthenticatedUserInfo } = useUsers();

    const setKeycloakConfig = useAuthStore((state) => state.setKeycloakConfig);
    const setSession = useAuthStore((state) => state.setSession);
    const setTenantHostname = useAuthStore((state) => state.setTenantHostname);
    const session = useAuthStore((state) => state.session);

    const sessionRef = useRef(session);

    useEffect(() => {
        sessionRef.current = session;
    }, [session]);

    // todo - handle error in keycloak - show error screen
    const initializeKeycloak = useCallback(
        async (config: KeycloakConfigParams) => {
            const keycloak = getKeycloak(config);

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
                const isSameConfig =
                    initializedConfig &&
                    initializedConfig.serverUrl === config.serverUrl &&
                    initializedConfig.realm === config.realm &&
                    initializedConfig.clientId === config.clientId;

                if (!isSameConfig || !keycloakInitPromise) {
                    initializedConfig = config;
                    keycloakInitPromise = keycloak.init({
                        onLoad: 'login-required',
                        checkLoginIframe: false,
                        ...sessionRef.current,
                    });
                }

                console.log('Before calling init');

                const authenticated = await keycloakInitPromise;

                // todo - refresh token
                if (authenticated) {
                    console.log('hey!');
                    console.log(keycloak.token);
                    setSession({
                        token: keycloak.token,
                        refreshToken: keycloak.refreshToken,
                        idToken: keycloak.idToken,
                    });
                    setIsAuthenticated(true);
                    handleAuthSuccess();
                }
            } catch (error) {
                console.error('Keycloak init failed:', error);
                setTenantHostname('');
                setKeycloakConfig({
                    serverUrl: '',
                    realm: '',
                    clientId: '',
                });
                keycloakInitPromise = undefined;
                initializedConfig = undefined;
            } finally {
                setIsInitialized(true);
            }
        },
        [setTenantHostname, setSession, setKeycloakConfig],
    );

    const requestKeycloakInformationAndInit = useCallback(
        async (hostname: string) => {
            try {
                const { data } = await api.get<KeycloakConfigParams>(
                    buildRoute(KeycloakApi.keycloakConfig, { hostname }),
                );
                setTenantHostname(hostname);
                setKeycloakConfig(data);
                await initializeKeycloak(data);
            } catch {}
        },
        [initializeKeycloak, setTenantHostname, setKeycloakConfig],
    );

    const handleAuthSuccess = async () => {
        // const user = await requestAuthenticatedUserInfo();
        // console.log(user);
        const userInfo = await requestAuthenticatedUserInfo();
    };

    return {
        isAuthenticated,
        isInitialized,
        initializeKeycloak,
        requestKeycloakInformationAndInit,
    };
}

export default useKeycloak;
