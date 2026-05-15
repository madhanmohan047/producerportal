import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";

const ConfirmationStep = (wizardPageProps: WizardPageProps) => (
  <WizardPage
    step={wizardPageProps.step}
    location={wizardPageProps.location}
    SidebarComponent={wizardPageProps.SidebarComponent}
  >
    <h2>Policy Bound Successfully!</h2>
    <p>Your Personal Auto policy has been issued.</p>
  </WizardPage>
);

export default ConfirmationStep;
