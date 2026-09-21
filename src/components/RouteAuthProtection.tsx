import { useEffect } from 'react';

import useKeycloak from '../hooks/useKeycloak';
import { useAuthStore } from '../stores/authStore';
import { resolveTenantHostname } from '../utils/auth';
import FullLoader from './ui/FullLoader';

interface OwnProps {
    children: React.ReactNode;
}

function RouteAuthProtection(props: OwnProps) {
    const { children } = props;

    const {
        isAuthenticated,
        isInitialized,
        initializeKeycloak,
        requestKeycloakInformationAndInit,
    } = useKeycloak();
    const tenantHostname = useAuthStore((store) => store.tenantHostname);
    const keycloakConfig = useAuthStore((store) => store.keycloakConfig);

    useEffect(() => {
        const hostname = resolveTenantHostname(window.location.hostname);
        if (tenantHostname && tenantHostname === hostname && keycloakConfig && !isInitialized) {
            initializeKeycloak(keycloakConfig);
            return;
        }

        if (!isAuthenticated && !isInitialized && tenantHostname !== hostname) {
            requestKeycloakInformationAndInit(hostname);
        }
    }, [
        isAuthenticated,
        isInitialized,
        tenantHostname,
        keycloakConfig,
        requestKeycloakInformationAndInit,
        initializeKeycloak,
    ]);

    if (!isAuthenticated || !isInitialized) {
        return (
            <div>
                <FullLoader show />
            </div>
        );
    }

    return children;
}

export default RouteAuthProtection;
