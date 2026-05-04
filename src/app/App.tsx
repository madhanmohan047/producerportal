import React from "react";
import AppFloorplan from "./AppFloorplan";
import config from "./App.config";

function App() {
  return <AppFloorplan routes={config.defaultRoutes.routes} />;
}

export default App;
