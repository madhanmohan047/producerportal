import axiosInstance from "../../utils/axiosInstance";
import { Account, Submission } from "./types";

/**
 * Retrieve all accounts
 * GET /api/accounts
 */
export const getAllAccounts = () => {
  return axiosInstance.get<Account[]>("/accounts");
};

/**
 * Create a new account
 * POST /api/accounts
 */
export const createAccount = (accountData: Account) => {
  return axiosInstance.post<Account>("/accounts", accountData);
};

/**
 * Get account details by ID
 * GET /api/accounts/{id}
 */
export const getAccountById = (id: string) => {
  return axiosInstance.get<Account>(`/accounts/${id}`);
};

/**
 * Create a new Submission for an account
 * POST /api/accounts/{accountId}/submissions
 */
export const createSubmission = (
  accountId: string,
  submissionData: Submission,
) => {
  return axiosInstance.post<Submission>(
    `/accounts/${accountId}/submissions`,
    submissionData,
  );
};
