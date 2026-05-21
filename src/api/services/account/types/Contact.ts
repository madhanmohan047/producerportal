import { Base, TypeKeyValue } from "../../../utils/types";

export interface Contact extends Base {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  dateOfBirth?: Date | string;
  workPhone?: string;
  homePhone?: string;
  cellPhone?: string;
  type?: TypeKeyValue;
  roles: TypeKeyValue[];
  emailAddress?: string;
}
