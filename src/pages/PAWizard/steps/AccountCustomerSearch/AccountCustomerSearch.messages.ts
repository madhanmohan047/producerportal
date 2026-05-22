import { defineMessages } from "react-intl";

export default defineMessages({
  searchPlaceholder: { id: "accountSearch.searchPlaceholder", defaultMessage: "Search by name, email, phone, or account #" },
  infoBanner: { id: "accountSearch.infoBanner", defaultMessage: "Select a matching account to pre-fill applicant details." },
  noAccountsFound: { id: "accountSearch.noAccountsFound", defaultMessage: "No accounts found." },
  createNewAccount: { id: "accountSearch.createNewAccount", defaultMessage: "+ Create New Account" },
  policy: { id: "accountSearch.policy", defaultMessage: "Policy" },
  policies: { id: "accountSearch.policies", defaultMessage: "Policies" },
  zeroPolicies: { id: "accountSearch.zeroPolicies", defaultMessage: "0 Policies" },
  errorSelectAccount: { id: "accountSearch.errorSelectAccount", defaultMessage: "Please select an account to continue." },
});
