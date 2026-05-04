import React from "react";
import { useLocation, NavLink, BrowserRouter } from "react-router-dom";
import config from "./App.config";
import AppRoutes from "./AppRoutes";
import Header from "./components/Header/Header";
import SubHeader from "./components/SubHeader/SubHeader";

function AppContent() {
  const location = useLocation();
  const currentRoute = config.defaultRoutes.routes.find(
    (route: any) => route.path === location.pathname,
  );
  const showHeader = currentRoute?.showHeader;
  const showSubHeader = currentRoute?.showSubHeader;
  return (
    <>
      {showHeader && <Header />}
      {showSubHeader && <SubHeader />}
      <AppRoutes />
    </>
  );
}
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
