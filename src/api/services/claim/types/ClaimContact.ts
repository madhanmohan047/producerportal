import { Base, TypeKeyValue } from "../../../utils/types";

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
export const mapContactToClaimContact = (
  contact?: any,
): ClaimContact | undefined => {
  if (!contact) return undefined;

  return {
    pcSystemId: contact._id,

    firstName: contact.firstName,

    lastName: contact.lastName,

    companyName: contact.companyName,

    dateOfBirth: contact.dateOfBirth,

    workPhone: contact.workPhone,

    homePhone: contact.homePhone,

    cellPhone: contact.phone,

    emailAddress: contact.email,

    type: contact.type ?? {
      code: "person",
      name: "Person",
    },

    roles: [
      {
        code: "primary",
        name: "Primary",
      },
    ],
  };
};
