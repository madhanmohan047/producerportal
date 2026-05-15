import { WizardPageProps } from "../../../../types/Wizardtype";
import WizardPage from "../../../../components/Wizard/BaseWizardPage/BaseWizardpage";
import SideBar from "../../../../components/SideBar/SideBar";
import { usePAWizard } from "../../../../context/PAWizardContext";
import styles from "./PolicyLobStep.module.scss";
import { LOB_OPTIONS } from "../../../../constants";

const PolicyLobStep = (props: WizardPageProps) => {
  const { lob, setLob, effectiveDate, setEffectiveDate } = usePAWizard();

  return (
    <WizardPage
      step={props.step}
      location={props.location}
      handleNext={props.handleNext}
      handlePrevious={props.handlePrevious}
      sidebarContent={<SideBar />}
    >
      
        <div className={styles.container}>
        <h2>Policy &amp; LOB</h2>
        <p>Configure the line of business and policy details.</p>
      </div>
      
    </WizardPage>
  );
};

export default PolicyLobStep;
