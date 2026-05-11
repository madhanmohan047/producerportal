import Dashboard from "../pages/Dashboard/Dashboard";
import Quotes from "../pages/Quotes/Quotes";
import { AccountDetails } from "../pages/AccountDetails/AccountDetails";
import { PAWizard } from "../pages/PAWizard/PAWizard";

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
        showHeader: true,
        showSubHeader: true,
        component: Quotes,
      },
      {
        title: "Account Details",
        path: "/accountDetails",
        showNavbar: false,
        showHeader: true,
        showSubHeader: true,
        component: AccountDetails,
      },
      {
        title: "Wizard",
        path: "/wizard",
        showNavbar: false,
        showHeader: true,
        showSubHeader: true,
        component: PAWizard,
      },
    ],
  },
};
