import { transport} from "../../utils/TransportService";
import { Account, Submission } from "./types";

const { api } = transport;

/**
 * Retrieve all accounts
 * GET /api/accounts
 */
export const getAllAccounts = () => {
  return api.get<Account[]>("/accounts");
};

/**
 * Create a new account
 * POST /api/accounts
 */
export const createAccount = (accountData: Account) => {
  return api.post<Account>("/accounts", accountData);
};

/**
 * Get account details by ID
 * GET /api/accounts/{id}
 */
export const getAccountById = (id: string) => {
  return api.get<Account>(`/accounts/${id}`);
};

/**
 * Create a new Submission for an account
 * POST /api/accounts/{accountId}/submissions
 */
export const createSubmission = (
  accountId: string,
  submissionData: Submission,
) => {
  return api.post<Submission>(
    `/accounts/${accountId}/submissions`,
    submissionData,
  );
};
