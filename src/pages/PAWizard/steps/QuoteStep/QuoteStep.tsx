import { WizardPageProps } from "../../../../types/Wizardtype";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import SideBar from "../../../../components/SideBar/SideBar";

const CoverageStep = (props: WizardPageProps) => (
  <WizardPage
    step={props.step}
    location={props.location}
    handleNext={props.handleNext}
    handlePrevious={props.handlePrevious}
    sidebarContent={<SideBar />}
  >
    <h2>Coverage</h2>
    <p>Select and configure coverages for this policy.</p>
  </WizardPage>
);

export default CoverageStep;
