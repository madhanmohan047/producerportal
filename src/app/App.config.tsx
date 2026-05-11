import Dashboard from "../pages/Dashboard/Dashboard";
import Quotes from "../pages/Quotes/Quotes";
import { AccountDetails } from "../pages/AccountDetails/AccountDetails";
import PersonalAutoWizard from "../pages/PersonalAutoWizard/PersonalAutoWizard";
import PersonalInformationPage from "../pages/PersonalAutoWizard/pages/PersonalInformationPage";
import DriverInformationPage from "../pages/PersonalAutoWizard/pages/DriverInformationPage";
import VehicleInformationPage from "../pages/PersonalAutoWizard/pages/VehicleInformationPage";

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
        showNavbar: true,
        showHeader: true,
        showSubHeader: true,
        component: AccountDetails,
      },
      {
        title: "Personal Auto",
        path: "/personalAuto",
        showNavbar: true,
        showHeader: true,
        showSubHeader: true,
        component: PersonalAutoWizard,
      },
      {
        title: "Personal Information",
        path: "/personalAuto/personalInformation",
        showNavbar: false,
        showHeader: true,
        showSubHeader: true,
        component: PersonalInformationPage,
      },
      {
        title: "Driver Information",
        path: "/personalAuto/driverInformation",
        showNavbar: false,
        showHeader: true,
        showSubHeader: true,
        component: DriverInformationPage,
      },
      {
        title: "Vehicle Information",
        path: "/personalAuto/vehicleInformation",
        showNavbar: false,
        showHeader: true,
        showSubHeader: true,
        component: VehicleInformationPage,
      },
    ],
  },
};
