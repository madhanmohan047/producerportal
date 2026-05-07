import Dashboard from "../pages/Dashboard/Dashboard";
import Quotes from "../pages/Quotes/Quotes";
import { AccountDetails } from "../pages/AccountDetails/AccountDetails";
import Vehicle from "../pages/Vehicle/Vehicle";

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
        title: "Quotes",
        path: "/quotes",
        showNavbar: true,
        component: Quotes,
      },
      {
        title: "Account Details",
        path: "/accountDetails",
        showNavbar: false,
        component: AccountDetails,
      },
      {
        title: "Vehicle",
        path: "/vehicle",
        showNavbar: true,
        component: Vehicle,
      },
    ],
  },
};
