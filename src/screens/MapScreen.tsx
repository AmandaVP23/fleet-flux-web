import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

function MapScreen() {
    return (
        <div className="map-view">
            <MapContainer
                center={{ lat: 51, lng: -0.09 }}
                zoom={13}
                zoomControl={false}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="bottomright" />
            </MapContainer>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}></div>
        </div>
    );
}

export default MapScreen;
