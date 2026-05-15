import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";

const PolicyLobStep = (wizardPageProps: WizardPageProps) => (
  <WizardPage
    step={wizardPageProps.step}
    location={wizardPageProps.location}
    handleNext={wizardPageProps.handleNext}
    handlePrevious={wizardPageProps.handlePrevious}
    SidebarComponent={wizardPageProps.SidebarComponent}
  >
    <h2>Policy & LOB</h2>
    <p>Select line of business and policy details.</p>
  </WizardPage>
);

export default PolicyLobStep;
