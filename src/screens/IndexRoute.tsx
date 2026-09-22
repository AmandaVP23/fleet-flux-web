import { Outlet } from '@tanstack/react-router';

import RouteAuthProtection from '../components/RouteAuthProtection';
import Topbar from '../components/Topbar';

function IndexRoute() {
    return (
        <RouteAuthProtection>
            <div className="auth-wrapper">
                <Topbar />
                <Outlet />
            </div>
        </RouteAuthProtection>
    );
}

export default IndexRoute;
