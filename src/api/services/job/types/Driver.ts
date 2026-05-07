import { Base } from "../../../utils/types";
import { Contact } from "./../../account/types/Contact";

export interface Driver extends Base {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  licenseNumber: string;
  yearLicensed: number;
  licenseState: string;
  numberOfAccidents: number;
  numberOfViolations: number;
}
