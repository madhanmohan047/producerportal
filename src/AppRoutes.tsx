import react from "react";
import { Route, Routes } from "react-router-dom";
import config from "./App.config";

const AppRoutes = () => {
  return (
    <Routes>
      {config.defaultRoutes.routes.map((routes) => {
        const Component = routes.component;
        return (
          <Route key={routes.path} path={routes.path} element={<Component />} />
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
