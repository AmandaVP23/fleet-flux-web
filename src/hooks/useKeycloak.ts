import { useEffect, useState } from 'react';

function useKeycloak() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    const initializeKeycloak = () => {
        console.log('Initialize Keycloak');
    };

    return {
        isAuthenticated,
        isInitialized,
    };
}

export default useKeycloak;
