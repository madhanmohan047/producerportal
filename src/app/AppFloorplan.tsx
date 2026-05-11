import React from "react";
import { useLocation, BrowserRouter } from "react-router-dom";
import Header from "../components/Header/Header";
import AppRoutes from "./AppRoutes";
import { FloorplanConfig, RouteConfig } from "../api/utils/routeConfig";

function AppContent({ floorplanConfig }: { floorplanConfig: FloorplanConfig }) {
  return (
    <>
      {floorplanConfig.showHeader && (
        <Header
          showSubHeader={floorplanConfig.showSubHeader}
          routes={floorplanConfig.routes}
        />
      )}
      <AppRoutes routes={floorplanConfig.routes} />
    </>
  );
}

const AppFloorplan = ({
  floorplanConfig,
}: {
  floorplanConfig: FloorplanConfig;
}) => {
  return (
    <BrowserRouter>
      <AppContent floorplanConfig={floorplanConfig} />
    </BrowserRouter>
  );
};

export default AppFloorplan;
