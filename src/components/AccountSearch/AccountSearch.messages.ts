import { defineMessages } from "react-intl";

export default defineMessages({
  placeholder: {
    id: "accountSearch.placeholder",
    defaultMessage: "Search by name, email, phone, or account #",
  },
  hint: {
    id: "accountSearch.hint",
    defaultMessage: "Select a matching account to pre-fill applicant details.",
  },
  typeToSearch: {
    id: "accountSearch.typeToSearch",
    defaultMessage: "Type a name, email, phone, or account number to search.",
  },
  noResults: {
    id: "accountSearch.noResults",
    defaultMessage: "No accounts found for \"{query}\".",
  },
  loading: {
    id: "accountSearch.loading",
    defaultMessage: "Loading accounts...",
  },
  createNew: {
    id: "accountSearch.createNew",
    defaultMessage: "Create New Account",
  },
});
