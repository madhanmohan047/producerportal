import axiosInstance from '../axiosInstance';

export interface AccountHolder {
  firstName: string;
  lastName: string;
  email: string;
}

export interface PrimaryLocation {
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface CreateAccountPayload {
  accountHolder: AccountHolder;
  primaryLocation: PrimaryLocation;
  producerCode: string;
  type: string;
  organization: string;
}

export interface Account extends CreateAccountPayload {
  id: string;
}

export interface Submission {
  lobCode: string;
}

class AccountService {
  /**
   * Retrieve all accounts
   * GET /api/accounts
   */
  getAllAccounts() {
    return axiosInstance.get<Account[]>('/api/accounts');
  }

  /**
   * Create a new account
   * POST /api/accounts
   */
  createAccount(accountData: CreateAccountPayload) {
    return axiosInstance.post<Account>('/api/accounts', accountData);
  }

  /**
   * Get account details by ID
   * GET /api/accounts/{id}
   */
  getAccountById(id: string) {
    return axiosInstance.get<Account>(`/api/accounts/${id}`);
  }

  /**
   * Create a new Submission for an account
   * POST /api/accounts/{accountId}/submissions
   */
  createSubmission(accountId: string, submissionData: Submission) {
    return axiosInstance.post<Submission>(
      `/api/accounts/${accountId}/submissions`,
      submissionData
    );
  }
}

const accountService = new AccountService();
export default accountService;
