import Keycloak from 'keycloak-js';

import type { KeycloakConfigParams } from './utils/auth';

export let keycloak: Keycloak | null = null;

export const initKeycloak = (config: KeycloakConfigParams) => {
    keycloak = new Keycloak({
        url: config.serverUrl,
        realm: config.realm,
        clientId: config.clientId,
    });

    return keycloak;
};
