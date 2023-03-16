import './App.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import Container from './components/container/container';
import { FC, useCallback, useState } from 'react';
import L, { LatLngExpression, Map } from 'leaflet';

function LocateButton({ map }: { map: L.Map | null }) {

    const locate = useCallback(() => {
        if (!map) return;
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition((location) => {
            console.log(location, map);
            map.flyTo([location.coords.latitude, location.coords.longitude]);
        });
        console.log(map);
    }, [map]);

    return (
        <button onClick={locate}>Locate me</button>
    );
}


function App() {
    const [map, setMap] = useState<L.Map | null>(null);

    return (
        <div className="App">
            <Container>
                <p>Leaflet map</p>
            </Container>
            <Container>
                <MapContainer ref={setMap} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ "height": "500px", "width": "1000px" }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
                <LocateButton map={map} />
            </Container>
        </div>
    )
}

export default App
