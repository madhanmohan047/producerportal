import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFileInvoiceDollar, faShieldHalved, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { DASHBOARD_MESSAGES } from "./dashboard.messages";

export interface Features {
  icon: IconDefinition;
  title: string;
  path: string;
  classname: string;
  number: string;
}

export const Features: Features[] = [
  {
    icon: faFileInvoiceDollar,
    title: DASHBOARD_MESSAGES.QUOTES,
    path: '/quotes',
    classname: "quotestyle",
    number: "100",
  },
  {
    icon: faShieldHalved,
    title: DASHBOARD_MESSAGES.POLICIES,
    path: '/policies',
    classname: "policystyle",
    number: "199",
  },
  {
    icon: faBuilding,
    title: DASHBOARD_MESSAGES.ACCOUNTS,
    path: '/accounts',
    classname: "accountstyle",
    number:"35",
  },
   {
    icon: faBuilding,
    title: DASHBOARD_MESSAGES.REQUESTS,
    path: '/accounts',
    classname: "requeststyle",
    number:"0",
  },
];
