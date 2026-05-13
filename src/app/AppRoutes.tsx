import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { RouteConfig } from "../api/utils/routeConfig";
import { PAWizard } from "../pages/PAWizard/PAWizard";

const AppRoutes = ({ routes }: { routes: RouteConfig[] }) => {
  return (
    <Routes>
      {routes.map((route) => {
        const Component = route.component;

        if (route.path === "/pa-wizard") {
          return <Route path="/pa-wizard/*" element={<PAWizard />} />;
        }

        return (
          <Route key={route.path} path={route.path} element={<Component />} />
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
