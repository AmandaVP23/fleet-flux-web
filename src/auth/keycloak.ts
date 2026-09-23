import Keycloak from 'keycloak-js';

import type { KeycloakConfigParams } from '../utils/auth';

export let keycloak: Keycloak | null = null;

export function getKeycloak(config?: KeycloakConfigParams) {
    if (!keycloak) {
        if (!config) {
            throw new Error('Keycloak has not been initialized because config is missing');
        }

        keycloak = new Keycloak({
            url: config.serverUrl,
            realm: config.realm,
            clientId: config.clientId,
        });
    }

    return keycloak;
}
