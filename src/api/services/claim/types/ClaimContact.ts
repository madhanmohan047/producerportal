import { Base, TypeKeyValue } from "./Shared";

export interface ClaimContact extends Base {
  pcSystemId?: string;

  firstName?: string;

  lastName?: string;

  companyName?: string;

  dateOfBirth?: Date | string;

  workPhone?: string;

  homePhone?: string;

  cellPhone?: string;

  emailAddress?: string;

  type: TypeKeyValue;

  roles?: TypeKeyValue[];

  createdBy?: string;

  createdAt?: Date | string;

  updatedAt?: Date | string;
}
