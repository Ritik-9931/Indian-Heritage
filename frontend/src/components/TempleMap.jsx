
import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const TempleMap = ({ latitude, longitude }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetchNearbyPlaces();
  }, []);

  const fetchNearbyPlaces = async () => {
    const query = `
      [out:json];
      (
        node(around:5000,${latitude},${longitude})["tourism"];
        node(around:5000,${latitude},${longitude})["amenity"="restaurant"];
        node(around:5000,${latitude},${longitude})["tourism"="hotel"];
      );
      out;
    `;

    try {
      const res = await fetch(
        "https://overpass-api.de/api/interpreter",
        {
          method: "POST",
          body: query,
        }
      );

      const data = await res.json();

      setPlaces(data.elements);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={20}
      style={{
        height: "500px",
        width: "100%",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Temple Marker */}
      <Marker position={[latitude, longitude]}>
        <Popup>Temple Location</Popup>
      </Marker>

      {/* Nearby Places */}
      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.lat, place.lon]}
        >
          <Popup>
            <strong>
              {place.tags?.name || "Unknown Place"}
            </strong>
            <br />
            {place.tags?.tourism ||
              place.tags?.amenity}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default TempleMap;