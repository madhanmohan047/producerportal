import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";

const RiskInfoStep = (wizardPageProps: WizardPageProps) => (
  <WizardPage
    step={wizardPageProps.step}
    location={wizardPageProps.location}
    handleNext={wizardPageProps.handleNext}
    handlePrevious={wizardPageProps.handlePrevious}
    SidebarComponent={wizardPageProps.SidebarComponent}
  >
    <h2>Risk Info</h2>
    <p>Provide risk information for underwriting.</p>
  </WizardPage>
);

export default RiskInfoStep;
