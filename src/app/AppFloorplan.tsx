import React from "react";
import { useLocation, BrowserRouter } from "react-router-dom";
import Header from "../components/Header/Header";
import AppRoutes from "./AppRoutes";
import { RouteConfig } from "../api/utils/routeConfig";

function AppContent({ routes }: { routes: RouteConfig[] }) {
  const location = useLocation();

  const currentRoute = routes.find((route) => route.path === location.pathname);

  const showHeader = currentRoute?.showHeader ?? false;
  const showSubHeader = currentRoute?.showSubHeader ?? false;

  return (
    <>
      {showHeader && <Header showSubHeader={showSubHeader} />}
      <AppRoutes routes={routes} />
    </>
  );
}

const AppFloorplan = ({ routes }: { routes: RouteConfig[] }) => {
  return (
    <BrowserRouter>
      <AppContent routes={routes} />
    </BrowserRouter>
  );
};

export default AppFloorplan;
