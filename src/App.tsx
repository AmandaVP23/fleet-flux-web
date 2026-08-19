import {
    Outlet,
    RouterProvider,
    Link,
    createRouter,
    createRoute,
    createRootRoute,
} from '@tanstack/react-router';

import IndexRoute from './screens/IndexRoute';

const rootRoute = createRootRoute({
    component: () => <IndexRoute />,
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: function Index() {
        return (
            <div className="p-2">
                <h3>Welcome Home!</h3>
            </div>
        );
    },
});

const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: function About() {
        return <div className="p-2">Hello from About!</div>;
    },
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

function App() {
    return <RouterProvider router={router} />;
}

export default App;
