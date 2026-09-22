import { Link, useLocation } from '@tanstack/react-router';
import { useCallback, useEffect, useRef, useState } from 'react';

import IconMap from '../assets/icons/icon-map.svg';
import IconVehicle from '../assets/icons/icon-vehicle.svg';
import FullLogo from '../assets/icons/logos/logo-full-color.svg';

function Topbar() {
    const indicatorRef = useRef<HTMLDivElement | null>(null);
    const mapLinkRef = useRef<HTMLAnchorElement | null>(null);
    const vehicleslinkRef = useRef<HTMLAnchorElement | null>(null);

    const [indicatorLeft, setIndicatorLeft] = useState(0);
    const [indicatorWidth, setIndicatorWidth] = useState(0);

    const pathname = useLocation({
        select: (location) => location.pathname,
    });

    const updateIndicator = useCallback(() => {
        switch (pathname) {
            case '/':
                setIndicatorWidth(mapLinkRef.current?.offsetWidth || 0);
                setIndicatorLeft(mapLinkRef.current?.offsetLeft || 0);
                break;
            case '/vehicles':
                setIndicatorWidth(vehicleslinkRef.current?.offsetWidth || 0);
                setIndicatorLeft(vehicleslinkRef.current?.offsetLeft || 0);
                break;
        }
    }, [pathname]);

    useEffect(() => {
        updateIndicator();
    }, [pathname, updateIndicator]);

    useEffect(() => {
        // // todo - get current route and listen to that
        // const observer = new ResizeObserver((entries) => {
        //     setIndicatorWidth(entries[0].contentRect.width);
        // });
        // if (ref.current) {
        //     observer.observe(ref.current);
        // }
        // return () => {
        //     ref.current && observer.unobserve(ref.current);
        // };
    }, []);

    return (
        <div className="topbar">
            <div className="topbar__right">
                <FullLogo />
                <div className="topbar__right__nav">
                    <div
                        ref={indicatorRef}
                        className="topbar__right__nav__indicator"
                        style={{
                            width: `${indicatorWidth}px`,
                            transform: `translate(${indicatorLeft}px, 0)`,
                        }}
                    />
                    <Link ref={mapLinkRef} to="/">
                        <IconMap />
                        <span>Map</span>
                    </Link>
                    <Link ref={vehicleslinkRef} to="/vehicles">
                        <IconVehicle />
                        <span>Vehicles</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Topbar;
