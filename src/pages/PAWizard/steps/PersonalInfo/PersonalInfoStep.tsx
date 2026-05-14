import React, { useState, useEffect } from "react";
import { Contact } from "../../../../api/services";
import { TypeKeyValue } from "../../../../api/utils/types";
import { ContactComponent } from "../../../../components/ContactComponent/ContactComponent";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";
import { useFNOLContext } from "../../../FNOLWizard/FNOLWizardContext";

const PersonalInfoStep = (wizardPageProps: WizardPageProps) => {
  const [isProceed, setIsProceed] = useState(false);
  const { fnolFormData, setFnolFormData } = useFNOLContext();
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
  useEffect(() => {
    //  setFnolFormData((formData) => ({
    //    ...formData,
    //    sidebarProps: {
    //      ...formData.sidebarProps,
    //      title: formData.sidebarProps?.title ?? "",
    //      sidebaritems: [...(formData.sidebarProps?.sidebaritems ?? []), newItem],
    //    },
    //  }));
    // setFnolFormData((formData) => ({
    //   ...formData,
    //   sidebarProps: {
    //     title: formData.sidebarProps?.title ?? "",
    //     sidebaritems:
    //       formData.sidebarProps?.sidebaritems?.map((item) =>
    //         item.transformationKey === "Policy Holder"
    //           ? {
    //               ...item,
    //               transformationLabel: "John Doe",
    //             }
    //           : item,
    //       ) ?? [],
    //   },
    // }));
  }, []);
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
