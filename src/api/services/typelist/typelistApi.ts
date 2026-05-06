import axiosInstance from "../../utils/axiosInstance";
import { TypeList } from './../../utils/types'

/**
 * Retrieve typelists
 * GET /api/typelists
 */
export const getTypeList = (type: string) => {
  return axiosInstance.get<TypeList[]>(`/typelists/${type}`);
};
