import react from "react";
import { Routes, Route } from "react-router-dom";
import { RouteConfig } from "../api/utils/routeConfig";

const AppRoutes = ({ routes }: { routes: RouteConfig[] }) => {
  return (
    <Routes>
      {routes.map((route: RouteConfig) => {
        const Component = route.component;
        return (
          <Route key={route.path} path={route.path} element={<Component />} />
        );
      })}
    </Routes>
  );
};
export default AppRoutes;
