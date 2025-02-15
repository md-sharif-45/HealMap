import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { fetchHospitals } from "../utils/api";

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3179/3179068.png",
  iconSize: [30, 30],
});

const MapPage = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = { lat: position.coords.latitude, lng: position.coords.longitude };
          setLocation(coords);
          fetchHospitals(coords).then(setHospitals);
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <div className="map-section">
      {loading ? (
        <div className="loader">Fetching location...</div>
      ) : (
        <MapContainer center={[location.lat, location.lng]} zoom={13} className="map-container">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[location.lat, location.lng]} icon={customIcon}>
            <Popup>You are here</Popup>
          </Marker>
          {hospitals.map((hospital, index) => (
            <Marker
              key={index}
              position={[hospital.geometry.coordinates[1], hospital.geometry.coordinates[0]]}
              icon={customIcon}
            >
              <Popup>{hospital.properties.name || "Hospital"}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default MapPage;