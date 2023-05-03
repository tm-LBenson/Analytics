import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const LocationMap = ({ locations }) => {
  const [mappedLocations, setMappedLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const locs = locations.map((location) => ({
      city: location.city,
      region: location.region,
      country: location.country,
      count: location.count,
      latitude: location.latitude,
      longitude: location.longitude,
    }));

    setMappedLocations(locs);
    setIsLoading(false);
  }, [locations]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <br />
      <MapContainer
        key={JSON.stringify(locations)}
        center={[39.8283, -98.5795]}
        zoom={3.5}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mappedLocations.map((location) => (
          <Marker
            key={crypto.randomUUID()}
            position={[location.latitude, location.longitude]}
          >
            <Popup>
              {location.city}, {location.region}, {location.country} <br />
              Visits: {location.count}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default LocationMap;
