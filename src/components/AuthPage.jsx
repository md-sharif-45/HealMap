import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const AuthPage = ({ setUser }) => {
  return (
    <div className="auth-container">
      <h1>HealMap</h1>
      <h3>Login to Access Nearby Hospitals</h3>
      <GoogleLogin 
        onSuccess={(credentialResponse) => setUser(credentialResponse)} 
        onError={() => console.log("Login Failed")} 
      />
    </div>
  );
};

export default AuthPage;
