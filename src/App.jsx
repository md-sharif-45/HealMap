import { useEffect, useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./firebase";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import logo from "./assets/logo.svg";
import defaultAvatar from './assets/avtar.svg';

function App() {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      alert(`Welcome, ${result.user.displayName}!`);
    } catch {
      alert("Login Failed");
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setLocation(null);
    setHospitals([]);
  };

  const fetchHospitals = async (lat, lon) => {
    const res = await fetch(
      `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${lon},${lat},3000&bias=proximity:${lon},${lat}&limit=20&apiKey=${
        import.meta.env.VITE_GEOAPIFY_KEY
      }`
    );
    const data = await res.json();
    setHospitals(data.features);
  };

  useEffect(() => {
    if (!user) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ lat: latitude, lon: longitude });
        fetchHospitals(latitude, longitude);
      },
      () => alert("Location permission denied.")
    );
  }, [user]);

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif" }}>
     {!user ? (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "linear-gradient(to right, #4facfe, #00f2fe)",
      padding: "20px",
    }}
  >
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "15px",
        padding: "40px 50px",
        maxWidth: "400px",
        width: "100%",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        textAlign: "center",
      }}
    >
      <img
        src={logo}
        alt="HealMap Logo"
        style={{ width: "120px", marginBottom: "20px" }}
      />
      <h1 style={{ color: "#0077b6", marginBottom: "15px" }}>
        Welcome to <span style={{ fontWeight: "bold" }}>HealMap</span>
      </h1>
      <button
        onClick={signIn}
        style={{
          padding: "12px 25px",
          backgroundColor: "#0077b6",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#005f86")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#0077b6")}
      >
        Sign in with Google
      </button>
    </div>
  </div>
): location ? (
        <div
          style={{ display: "flex", flexDirection: "column", height: "100vh" }}
        >
          {/* Header with avatar and logout */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 20px",
              backgroundColor: "#e0f7fa",
              borderBottom: "1px solid #ccc",
            }}
          >
            <h2 style={{ margin: 0 }}>HealMap</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontWeight: "500" }}>{user.displayName}</span>
              <img
                src={defaultAvatar}
                alt="User Avatar"
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
              <button
                onClick={logout}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#0077b6",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Main content: responsive layout */}
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "row",
              overflow: "hidden",
            }}
          >
            {/* Hospital List */}
            <div
              style={{
                width: "40%",
                minWidth: "300px",
                maxHeight: "100%",
                overflowY: "auto",
                backgroundColor: "#f0f8ff",
                padding: "10px",
              }}
            >
              <h3
                style={{
                  textAlign: "center",
                  marginBottom: "10px",
                  color: "#0077b6",
                }}
              >
                Nearby Hospitals
              </h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {hospitals.map((h) => (
                  <li
                    key={h.properties.place_id}
                    onClick={() =>
                      alert(`🏥 ${h.properties.name || "Unnamed Hospital"}
📍 ${h.properties.address_line1 || "Address not available"}
📞 ${h.properties.tel || "Phone not available"}
🌐 ${h.properties.website || "Website not available"}`)
                    }
                    style={{
                      background: "#ffffff",
                      padding: "12px",
                      marginBottom: "10px",
                      borderRadius: "8px",
                      boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
                      cursor: "pointer",
                    }}
                  >
                    <strong>{h.properties.name || "Unnamed Hospital"}</strong>
                    <br />
                    <small>{h.properties.address_line1}</small>
                  </li>
                ))}
              </ul>
            </div>

            {/* Map */}
            <div style={{ flex: 1 }}>
              <MapContainer
                center={[location.lat, location.lon]}
                zoom={14}
                style={{ width: "100%", height: "100%" }}
              >
                <TileLayer
                  url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${
                    import.meta.env.VITE_GEOAPIFY_KEY
                  }`}
                />
                {hospitals.map((h) => (
                  <Marker
                    key={h.properties.place_id}
                    position={[
                      h.geometry.coordinates[1],
                      h.geometry.coordinates[0],
                    ]}
                  >
                    <Popup>{h.properties.name || "Unnamed Hospital"}</Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          {/* Media Query for smaller screens */}
          <style>{`
            @media (max-width: 768px) {
              div[style*="flex-direction: row"] {
                flex-direction: column !important;
              }
              div[style*="width: 40%"] {
                width: 100% !important;
                max-height: 40vh !important;
              }
              div[style*="flex: 1"] {
                height: 60vh !important;
              }
            }
          `}</style>
        </div>
      ) : (
        <p style={{ textAlign: "center", marginTop: "50px" }}>
          Fetching location...
        </p>
      )}
    </div>
  );
}

export default App;
