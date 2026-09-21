export interface KeycloakConfigParams {
    serverUrl: string;
    clientId: string;
    realm: string;
}

export function resolveTenantHostname(location: string): string {
    const hostnameParts = location.split('.');
    return hostnameParts.length === 2 ? hostnameParts[0] : '';
}
