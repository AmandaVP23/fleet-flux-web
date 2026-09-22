import { Link } from '@tanstack/react-router';

import IconMap from '../assets/icons/icon-map.svg';
import IconVehicle from '../assets/icons/icon-vehicle.svg';
import FullLogo from '../assets/icons/logos/logo-full-color.svg';

function Topbar() {
    return (
        <div className="topbar">
            <FullLogo />
            <div className="topbar__nav">
                <Link to="/">
                    <IconMap />
                    <span>Map</span>
                </Link>
                <Link to="/vehicles">
                    <IconVehicle />
                    <span>Map</span>
                </Link>
            </div>
        </div>
    );
}

export default Topbar;
