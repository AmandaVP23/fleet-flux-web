import { Outlet, Link } from '@tanstack/react-router';

import RouteAuthProtection from '../components/RouteAuthProtection';

function IndexRoute() {
    return (
        <RouteAuthProtection>
            <div className="p-2 flex gap-2">
                <Link to="/" className="[&.active]:font-bold">
                    Home
                </Link>{' '}
                <Link to="/about" className="[&.active]:font-bold">
                    About
                </Link>
            </div>
            <hr />
            <Outlet />
        </RouteAuthProtection>
    );
}

export default IndexRoute;
