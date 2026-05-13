import { ComboboxOption } from "../../../../components/common/Combobox/Combobox";
import { Base } from "../../../utils/types";
import { Contact } from "../../account/types/Contact";

export interface Driver extends Base {
  person: string | Contact;
  licenseNumber?: string;
  licenseState?: string;
  licenseStatus?: string;
  licenseYear?: number;
  yearsOfExperience?: number;
  numAccidents?: number;
  numViolations?: number;
  violations: string[];
}

export interface DriverForm {
    licenseNumber: string;
    licenseState: ComboboxOption | undefined;
    yearsLicensed: string;
    accidents: string;
    violations: string;
    isGoodDriver: boolean;
}

