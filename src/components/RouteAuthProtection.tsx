import { useEffect } from 'react';

import useKeycloak from '../hooks/useKeycloak';
import LoginScreen from '../screens/LoginScreen';

interface OwnProps {
    children: React.ReactNode;
}

function RouteAuthProtection(props: OwnProps) {
    const { children } = props;

    const { isAuthenticated, isInitialized } = useKeycloak();

    useEffect(() => {
        console.log('Hey!');
    }, []);

    if (!isAuthenticated || isInitialized) {
        return <LoginScreen />;
    }

    return children;
}

export default RouteAuthProtection;
