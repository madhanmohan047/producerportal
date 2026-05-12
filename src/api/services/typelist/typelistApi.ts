import { transport} from "../../utils/TransportService";
import { TypeList } from './../../utils/types'

const { api } = transport;

/**
 * Retrieve typelists
 * GET /api/typelists
 */
export const getTypeList = (type: string) => {
  return api.get<TypeList[]>(`/typelists/${type}`);
};
