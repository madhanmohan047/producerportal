import Dashboard from "../pages/Dashboard/Dashboard";
import Quotes from "../pages/Quotes/Quotes";
import { AccountDetails } from "../pages/AccountDetails/AccountDetails";
import { PAWizard } from "../pages/PAWizard/PAWizard";
import { FNOLWizard } from "../pages/FNOLWizard/FNOLWizard";
import { PolicySummary } from "../pages/PolicySummary/PolicySummary";

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
        path: "/account-details",
        showNavbar: false,
        component: AccountDetails,
      },
      {
        title: "Policy Summary",
        path: "/policy-summary",
        showNavbar: false,
        component: PolicySummary,
      },
      {
        title: "Personal Auto Wizard",
        path: "/pa-wizard",
        showNavbar: false,
        component: PAWizard,
      },
      {
        title: "FNOL Wizard",
        path: "/fnolwizard",
        showNavbar: true,
        component: FNOLWizard,
      },
    ],
  },
};
