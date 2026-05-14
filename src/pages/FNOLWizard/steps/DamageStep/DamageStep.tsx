import React, { useState } from "react";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import {
  DamageComponent,
  DamageInfo,
  LineOfBusiness,
} from "../../../../components/DamageComponent/DamageComponent";
import { WizardPageProps } from "../../../../types/Wizardtype";

const EMPTY_DAMAGE: DamageInfo = {
  damageAreas: [],
  safetyConcerns: false,
};

type DamageStepProps = WizardPageProps & {
  lineOfBusiness?: LineOfBusiness;
};

const DamageStep = (wizardPageProps: DamageStepProps) => {
  const [damage, setDamage] = useState<DamageInfo>(EMPTY_DAMAGE);
  const lob = wizardPageProps.lineOfBusiness ?? "auto";

  const handleValueChange = (value: any, path: string) => {
    setDamage((prev) => ({ ...prev, [path]: value }));
  };

  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={wizardPageProps.handleNext}
      handlePrevious={wizardPageProps.handlePrevious}
      handleSaveDraft={wizardPageProps.handleSaveDraft}
      wizardSidebarprops={wizardPageProps.wizardSidebarprops}
    >
      <DamageComponent
        value={damage}
        onValueChange={handleValueChange}
        lineOfBusiness={lob}
      />
    </WizardPage>
  );
};

export default DamageStep;
