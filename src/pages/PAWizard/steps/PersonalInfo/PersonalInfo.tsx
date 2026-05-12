// import React, { useState } from "react";
// import { WizardPage } from "../../../../components/Wizard/WizardPage";
// import { WizardPageProps, WizardStep } from "../../../../types/WizardTypes";
// import { Contact } from "../../../../components/ContactComponent/ContactComponent";

// const PersonalInfo: React.FC<{
//   step: WizardStep;
//   location: any;
//   handleNext: () => void;
//   handlePrevious: () => void;
// }> = ({ step, location, handleNext, handlePrevious }) => {
//   const [contact, setContact] = useState<any>({
//     type: {
//       code: "person",
//       name: "Person",
//     },
//     firstName: "",
//     lastName: "",
//     companyName: "",
//     emailAddress: "",
//     workPhone: "",
//     homePhone: "",
//     cellPhone: "",
//     dateOfBirth: "",
//   });

//   // HANDLE FIELD CHANGES
//   const handleContactChange = (val: any, path: string) => {
//     // Handle contact type separately
//     if (path === "contactType") {
//       setContact((prev: any) => ({
//         ...prev,
//         type: {
//           code: val,
//           name: val === "person" ? "Person" : "Company",
//         },
//       }));
//     } else {
//       // Update normal fields
//       setContact((prev: any) => ({
//         ...prev,
//         [path]: val,
//       }));
//     }
//   };

//   return (
//     <WizardPage
//       step={step}
//       location={location}
//       handleNext={handleNext}
//       handlePrevious={handlePrevious}
//     >
//       <Contact
//         value={contact}
//         onValueChange={handleContactChange}
//         readOnly={false}
//       />
//     </WizardPage>
//   );
// };

// export default PersonalInfo;

import React, { useState } from "react";
import { WizardPage } from "../../../../components/Wizard/WizardPage";
import { WizardStep } from "../../../../types/WizardTypes";
import { Contact } from "../../../../components/ContactComponent/ContactComponent";

const PersonalInfo: React.FC<{
  step: WizardStep;
  location: any;
  handleNext: () => void;
  handlePrevious: () => void;
}> = ({ step, location, handleNext, handlePrevious }) => {
  const [contact, setContact] = useState<any>({
    type: {
      code: "person",
      name: "Person",
    },
    firstName: "",
    lastName: "",
    companyName: "",
    emailAddress: "",
    workPhone: "",
    homePhone: "",
    cellPhone: "",
    dateOfBirth: "",
  });

  const [errors, setErrors] = useState<any>({});

  // HANDLE FORM CHANGES
  const handleContactChange = (val: any, path: string) => {
    if (path === "contactType") {
      setContact((prev: any) => ({
        ...prev,
        type: {
          code: val,
          name: val === "person" ? "Person" : "Company",
        },
      }));
    } else {
      setContact((prev: any) => ({
        ...prev,
        [path]: val,
      }));
    }
  };

  // VALIDATION
  const validate = () => {
    const newErrors: any = {};

    const isPerson = contact.type.code === "person";

    if (isPerson) {
      if (!contact.firstName?.trim()) {
        newErrors.firstName = "First name is required";
      }

      if (!contact.lastName?.trim()) {
        newErrors.lastName = "Last name is required";
      }
    } else {
      if (!contact.companyName?.trim()) {
        newErrors.companyName = "Company name is required";
      }
    }

    if (!contact.emailAddress?.trim()) {
      newErrors.emailAddress = "Email is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // NEXT BUTTON
  const onNext = () => {
    if (!validate()) return;

    console.log("Saved Contact:", contact);

    // API call can go here

    handleNext();
  };

  return (
    <WizardPage
      step={step}
      location={location}
      handleNext={onNext}
      handlePrevious={handlePrevious}
    >
      <Contact
        value={contact}
        onValueChange={handleContactChange}
        readOnly={false}
      />

      {/* Example errors */}
      {errors.firstName && <p>{errors.firstName}</p>}
      {errors.lastName && <p>{errors.lastName}</p>}
      {errors.companyName && <p>{errors.companyName}</p>}
      {errors.emailAddress && <p>{errors.emailAddress}</p>}
    </WizardPage>
  );
};

export default PersonalInfo;
