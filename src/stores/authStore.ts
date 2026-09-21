import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { KeycloakConfigParams } from '../utils/auth';

export interface AuthSession {
    token?: string;
    refreshToken?: string;
    idToken?: string;
}

interface AuthStoreState {
    keycloakConfig: KeycloakConfigParams;
    session: AuthSession;
    tenantHostname: string | null;
    setKeycloakConfig: (config: KeycloakConfigParams) => void;
    setSession: (session: AuthSession) => void;
    setTenantHostname: (tenantHostname: string) => void;
    clearAuth: () => void;
}

const initialState: AuthStoreState = {
    keycloakConfig: {
        serverUrl: '',
        realm: '',
        clientId: '',
    },
    session: {
        token: undefined,
        refreshToken: undefined,
        idToken: undefined,
    },
    tenantHostname: null,
    setKeycloakConfig: () => {},
    setTenantHostname: () => {},
    setSession: () => {},
    clearAuth: () => {},
};

export const useAuthStore = create<AuthStoreState>()(
    persist(
        (set, get) => ({
            ...initialState,

            setKeycloakConfig: (config) => {
                set({ keycloakConfig: config });
            },
            setSession: (session) => {
                set({ session });
            },
            setTenantHostname: (tenantHostname) => {
                set({ tenantHostname });
            },
            clearAuth: () => {
                set(initialState);
            },
        }),
        {
            name: 'auth-storage',
        },
    ),
);
