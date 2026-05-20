import React, { useEffect, useState } from "react";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import {
  DamageAreaOption,
  DamageComponent,
  DamageInfo,
  LineOfBusiness,
} from "../../../../components/DamageComponent/DamageComponent";
import { WizardPageProps } from "../../../../types/Wizardtype";
import { useFNOLContext } from "../../FNOLWizardContext";
import { getTypeList } from "../../../../api/services/typelist/typelistApi";
import { ComboboxOption } from "../../../../components/common/Combobox/Combobox";

const EMPTY_DAMAGE: DamageInfo = {
  damageAreas: [],
  safetyConcerns: false,
};

type DamageStepProps = WizardPageProps & {
  lineOfBusiness?: LineOfBusiness;
};

const DamageStep = (wizardPageProps: DamageStepProps) => {
  const { fnolFormData, setFnolFormData } = useFNOLContext();
  const damage = fnolFormData.damage ?? EMPTY_DAMAGE;
  const lob = wizardPageProps.lineOfBusiness ?? "auto";
  const [affectedAreas, setAffectedAreas] = useState<DamageAreaOption[]>([]);

  const handleValueChange = (value: any, path: string) => {
    setFnolFormData((prev) => ({
      ...prev,
      damage: {
        ...(prev.damage ?? EMPTY_DAMAGE),
        [path]: value,
      },
    }));
  };
  useEffect(() => {
    console.log("FNOL Form Data Updated:", fnolFormData);
  }, [fnolFormData]);
  useEffect(() => {
    getTypeList("AffectedAreas").then((response) => {
      const mappedAreas: DamageAreaOption[] = response.map((item: any) => ({
        code: item.code,
        label: item.name,
        img: item.img ?? "",
        active: false,
      }));

      setAffectedAreas(mappedAreas);
    });
  }, []);
  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={wizardPageProps.handleNext}
      showPageheader={false}
      handlePrevious={wizardPageProps.handlePrevious}
      handleSaveDraft={wizardPageProps.handleSaveDraft}
      wizardSidebarprops={wizardPageProps.wizardSidebarprops}
    >
      <DamageComponent
        value={damage}
        onValueChange={handleValueChange}
        lineOfBusiness={lob}
        damageAreaOptions={affectedAreas}
      />
    </WizardPage>
  );
};

export default DamageStep;
