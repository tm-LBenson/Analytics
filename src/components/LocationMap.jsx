import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LocationMap = ({ ipAddresses }) => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchLocations = async () => {
      const locs = [];

      for (const ip of ipAddresses) {
        let data;

        const cachedData = localStorage.getItem(ip);

        if (cachedData) {
          data = JSON.parse(cachedData);
        } else {
          await delay(1000); // Add a delay of 1 second (1000 ms)

          const response = await fetch(`https://ipapi.co/${ip}/json/`);
          data = await response.json();

          localStorage.setItem(ip, JSON.stringify(data));
        }

        locs.push({
          ip,
          latitude: data.latitude,
          longitude: data.longitude,
          city: data.city,
          region: data.region,
          country: data.country_name,
        });
      }

      setLocations(locs);
      setIsLoading(false);
    };

    setIsLoading(true);
    fetchLocations();
  }, [ipAddresses]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <MapContainer
      key={JSON.stringify(ipAddresses)}
      center={[39.8283, -98.5795]}
      zoom={3.5}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location) => (
        <Marker
          key={crypto.randomUUID()}
          position={[location.latitude, location.longitude]}
        >
          <Popup>
            {location.ip} <br />
            {location.city}, {location.region}, {location.country}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LocationMap;
