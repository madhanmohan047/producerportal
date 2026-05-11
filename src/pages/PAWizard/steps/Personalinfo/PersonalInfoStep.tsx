import React, { useState } from "react";
import { Contact } from "../../../../api/services";
import { TypeKeyValue } from "../../../../api/utils/types";
import { ContactComponent } from "../../../../components/ContactComponent/ContactComponent";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";

const PersonalInfoStep = (wizardPageProps: WizardPageProps) => {
  const [isProceed, setIsProceed] = useState(false);
  const [contact, setContact] = useState<Contact>({
    _id: "",
    roles: [],
    type: { code: "person" } as TypeKeyValue,
    firstName: "",
    lastName: "",
    emailAddress: "",
    companyName: "",
    dateOfBirth: "",
    workPhone: "",
    homePhone: "",
    cellPhone: "",
  });
  const handleValueChange = (value: any, path: string) => {
    if (path === "emailAddress" && !value.includes("@")) {
      setIsProceed(false);
    } else {
      setIsProceed(true);
    }
    setContact((prevContact) => ({
      ...prevContact,
      [path]: value,
    }));
  };
  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={isProceed ? wizardPageProps.handleNext : undefined}
      handlePrevious={wizardPageProps.handlePrevious}
    >
      <div>{!isProceed && <div>Fix email error</div>}</div>
      <ContactComponent value={contact} onValueChange={handleValueChange} />
    </WizardPage>
  );
};

export default PersonalInfoStep;
