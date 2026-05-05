import React, { useEffect } from "react";
import { IntlProvider } from "react-intl";
import AppFloorplan from "./AppFloorplan";
import config from "./App.config";

function App() {
    useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  return (
    <IntlProvider locale="en">
      <AppFloorplan floorplanConfig={config.floorplanConfig} />
    </IntlProvider>
  );
}

export default App;
