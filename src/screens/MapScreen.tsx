import { MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

function MapScreen() {
    return (
        <div className="map-view">
            <MapContainer center={{ lat: 51, lng: -0.09 }} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
            ,
        </div>
    );
}

export default MapScreen;
