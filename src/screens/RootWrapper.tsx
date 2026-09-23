import { Outlet } from '@tanstack/react-router';

import RouteAuthProtection from '../components/RouteAuthProtection';
import Topbar from '../components/Topbar';

function RootWrapper() {
    return (
        <RouteAuthProtection>
            <div className="auth-wrapper">
                <Topbar />
                <div className="main-content">
                    <Outlet />
                </div>
            </div>
        </RouteAuthProtection>
    );
}

export default RootWrapper;
