import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Home/Home";

export default {
  floorplanConfig: {
    showHeader: true,
    showSubHeader: true,
    routes: [
      {
        title: "Dashboard",
        path: "/",
        showNavbar: true,
        component: Dashboard,
      },
      {
        title: "Home",
        path: "/home",
        showNavbar: true,
        component: Home,
      },
    ],
  },
};
