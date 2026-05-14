import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { RouteConfig } from "../api/utils/routeConfig";
import { FNOLWizard } from "../pages/FNOLWizard/FNOLWizard";
import { PAWizard } from "../pages/PAWizard/PAWizard";

const AppRoutes = ({ routes }: { routes: RouteConfig[] }) => {
  return (
    <Routes>
      {routes.map((route) => {
        const Component = route.component;

        if (route.path === "/pawizard") {
          return <Route path="/pawizard/*" element={<PAWizard />} />;
        }
        if (route.path === "/fnol-wizard") {
          return <Route path="/fnol-wizard/*" element={<FNOLWizard />} />;
        }
        return (
          <Route key={route.path} path={route.path} element={<Component />} />
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
