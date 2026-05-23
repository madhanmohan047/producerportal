import { TypeKeyValue } from "../../../utils/types";

export interface ClaimDocument {
  _id?: string;
  refId: string;
  name: string;
  size?: number;
  security: TypeKeyValue;
}
