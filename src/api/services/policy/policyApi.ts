import { transport } from "../../utils/TransportService";
import type { ApiListResponse } from "../../utils/types";
import { Policy } from "./types";

const { api } = transport;

export const getAllPolicies = () =>
  api.get<Array<Policy>>("/policies");

export const getPolicyById = (id: string) =>
  api.get<Policy>(`/policies/${id}`);
