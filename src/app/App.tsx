import React from "react";
import AppFloorplan from "./AppFloorplan";
import config from "./App.config";

function App() {
  return <AppFloorplan floorplanConfig={config.floorplanConfig} />;
}

export default App;
