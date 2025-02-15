import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthPage from "../src/components/AuthPage";
import MapPage from "../src/components/MapPage";
import { Button, Card } from "@mui/material";
import "./App.css";
import healmapLogo from "../public/medi.svg"; // Import the logo

const CLIENT_ID = "1088721591149-c7a5mpcjbkravl1fglnaiqhc7e9kcoio.apps.googleusercontent.com";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (userData) => {
    setLoading(true);
    setTimeout(() => {
      setUser(userData);
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="app-container">
        <div className="dashboard">
          {/* Project Logo */}
          <img src={healmapLogo} alt="HealMap Logo" className="project-logo" />

          {!user ? (
            <AuthPage setUser={handleLogin} />
          ) : (
            <>
              <Card className="user-card">
                <h2>Welcome, {user.name}!</h2>
                <p>Explore nearby hospitals with ease.</p>
                <Button variant="contained" color="primary" onClick={handleLogout}>
                  Logout
                </Button>
              </Card>
              {loading ? <p>Loading Map...</p> : <MapPage />}
            </>
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
