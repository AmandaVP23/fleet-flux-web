import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

import MapScreen from './screens/MapScreen';
import RootWrapper from './screens/RootWrapper';
import VehiclesScreen from './screens/VehiclesScreen';

const rootRoute = createRootRoute({
    component: () => <RootWrapper />,
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: MapScreen,
});

const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/vehicles',
    component: VehiclesScreen,
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

function App() {
    useEffect(() => {
        console.log(window.location);
    }, []);

    return <RouterProvider router={router} />;
}

export default App;
