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
    if (
      path === "emailAddress" &&
      value.length > 0 &&
      (!value.includes("@") || !value.includes("."))
    ) {
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
      // handleNext={isProceed ? wizardPageProps.handleNext : undefined}
      handleNext={wizardPageProps.handleNext}
      handlePrevious={wizardPageProps.handlePrevious}
      wizardSidebarprops={wizardPageProps.wizardSidebarprops}
    >
      <div style={{ display: "flex" }}>
        {/* <div>{!isProceed && <div>Fix email error</div>}</div> */}

        {/* <ContactComponent value={contact} onValueChange={handleValueChange} /> */}
      </div>
    </WizardPage>
  );
};

export default PersonalInfoStep;
