import { TypeKeyValue } from "../../../utils/types";

export interface ClaimDocument {
  _id: string;
  refId: string;
  name: string;
  security: TypeKeyValue;
}
