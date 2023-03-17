import './App.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import Container from './components/container/container';
import { FC, useCallback, useState } from 'react';
import L, { LatLngExpression, LeafletEventHandlerFn, LeafletEventHandlerFnMap, Map, marker } from 'leaflet';
import styled from 'styled-components';

const StyledMap = styled(MapContainer)`
height: 500px;
`;

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

interface MapEventsProps {
    addMarker: (newMarker: Coords) => void;
}

function MapEvents({ addMarker }: MapEventsProps) {
    const map = useMapEvents({
        click(e) {
            addMarker(e.latlng);
            console.log(e.latlng);
        }
    });
    return null;
}

interface Coords {
    lat: number;
    lng: number;
}

function App() {
    const [map, setMap] = useState<L.Map | null>(null);
    const [markers, setMarkers] = useState<Coords[]>([]);

    const addMarker = useCallback((newMarker: Coords) => {
        setMarkers(prev => [...prev, newMarker]);
    }, []);

    return (
        <div className="App">
            <Container>
                <p>Leaflet map</p>
            </Container>
            <Container>
                <StyledMap ref={setMap} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {markers.map(marker =>
                        <Marker position={marker}>
                            <Popup>
                                position of this marker is:<br />
                                {'lat:' + marker.lat.toFixed(2)}
                                {'lng:' + marker.lng.toFixed(2)}
                            </Popup>
                        </Marker>
                    )}
                    <MapEvents addMarker={addMarker} />
                </StyledMap >
                <LocateButton map={map} />
            </Container>
        </div>
    )
}

export default App
