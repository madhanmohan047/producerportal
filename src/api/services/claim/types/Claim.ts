import { Base } from "../../../utils/types";
import { Account } from "../../account/types/Account";
import { TypeKeyValue } from "../../../utils/types";
import { Contact } from "../../account/types/Contact";
import { Address } from "../../account/types/Address";
import { Organization, ProducerCode } from "../../admin/types";
import { Policy } from "../../policy/types";
import { ClaimContact } from "./ClaimContact";
import { Note } from "./Note";
import { ClaimDocument } from "./ClaimDocument";
import { DamageAreaOption } from "../../../../components/DamageComponent/DamageComponent";
export interface Claim extends Base {
  account?: string;

  product?: TypeKeyValue;

  policy?: string;
  lossCause?: TypeKeyValue;
  lossDate?: Date;

  vehicleInvolved?: string;

  lossLocation?: string;

  isInjured?: boolean;

  isReported?: boolean;

  lossDescription?: string;

  partiesInvolved?: ClaimContact[];

  noteToAdjuster?: Note;

  documents?: ClaimDocument[];

  claimNumber?: string;

  vehicleDamaged?: DamageAreaOption[];
  documentList?: ClaimDocument[];

  status?: TypeKeyValue;
}
