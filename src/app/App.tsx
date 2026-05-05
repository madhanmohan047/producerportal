import React, { useEffect } from "react";
import AppFloorplan from "./AppFloorplan";
import config from "./App.config";

function App() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  return <AppFloorplan floorplanConfig={config.floorplanConfig} />;
}

export default App;
