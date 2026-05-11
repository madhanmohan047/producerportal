import React, { useEffect } from "react";
import { IntlProvider } from "react-intl";
import { useAuth } from "../context/AuthContext";
import AppFloorplan from "./AppFloorplan";
import config from "./App.config";

function App() {
  const { isLoading, isAuthenticated, login, user } = useAuth();
  const AUTH_MODE = process.env.REACT_APP_AUTH_MODE || "JWT";

  useEffect(() => {
    if (AUTH_MODE === "JWT" && !isLoading && !isAuthenticated) {
      login('login'); 
    }
  }, [isLoading, isAuthenticated, login]);

  if (isLoading) return <div className="loading-screen">...</div>;

  if (AUTH_MODE === "JWT" && !isAuthenticated) {
    return null; 
  }

  return (
    <IntlProvider locale="en">
      <AppFloorplan floorplanConfig={config.floorplanConfig} />
    </IntlProvider>
  );
}


export default App;
