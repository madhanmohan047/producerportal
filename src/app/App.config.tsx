import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Home/Home";

export default {
  defaultRoutes: {
    routes: [
      {
        title: "Dashboard",
        path: "/",
        showNavbar: true,
        showHeader: true,
        showSubHeader: true,
        component: Dashboard,
      },
      {
        title: "Home",
        path: "/home",
        showNavbar: true,
        showHeader: true,
        showSubHeader: true,
        component: Home,
      },
    ],
  },
};
