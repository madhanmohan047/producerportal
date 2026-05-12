import Dashboard from "../pages/Dashboard/Dashboard";
import Quotes from "../pages/Quotes/Quotes";
import { AccountDetails } from "../pages/AccountDetails/AccountDetails";
import { PolicySummaryPage } from "../pages/PolicySummary/PolicySummaryPage";
// import { PAWizard } from "../pages/PAWizard/PAWizard";

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
        title: "Policy Summary",
        path: "/policySummary",
        showNavbar: false,
        showHeader: false, 
        showSubHeader: false,
        component: PolicySummaryPage,
      },
      // {
      //   title: "Create PA Quote",
      //   path: "/pa-wizard",
      //   showNavbar: false,
      //   showHeader: true,
      //   showSubHeader: false,
      //   component: PAWizard,
      // },
    ],
  },
};
