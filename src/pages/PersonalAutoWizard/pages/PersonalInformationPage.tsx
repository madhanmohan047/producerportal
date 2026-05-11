import React from "react";
import PersonalAutoWizardLayout from "../PersonalAutoWizardLayout";
import PersonalInformationStep from "../steps/PersonalInformationStep";
import { usePersonalAutoState } from "../usePersonalAutoState";

const PersonalInformationPage: React.FC = () => {
  const { personalInfo, setPersonalInfo } = usePersonalAutoState();

  return (
    <PersonalAutoWizardLayout currentStep={0}>
      <PersonalInformationStep
        value={personalInfo}
        onChange={setPersonalInfo}
      />
    </PersonalAutoWizardLayout>
  );
};

export default PersonalInformationPage;
