import { transport } from "../../utils/TransportService";
import { Claim } from "./types/Claim";

const { api } = transport;

/**
 * Create Claim
 */
export const createClaim = (claimData: Claim) => {
  return api.post<Claim>("/claims", claimData);
};

/**
 * Get All Claims
 */
export const getAllClaims = () => {
  return api.get<Claim[]>("/claims");
};

/**
 * Get Claim By Id
 */
export const getClaimById = (claimId: string) => {
  return api.get<Claim>(`/claims/${claimId}`);
};

/**
 * Update Claim
 */
export const updateClaim = (claimId: string, claimData: Partial<Claim>) => {
  return api.put<Claim>(`/claims/${claimId}`, claimData);
};

/**
 * Delete Claim
 */
export const deleteClaim = (claimId: string) => {
  return api.delete(`/claims/${claimId}`);
};
