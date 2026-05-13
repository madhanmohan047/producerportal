import { WizardPageProps } from "../../../../types/Wizardtype";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import SideBar from "../../../../components/SideBar/SideBar";

const ReviewBindStep = (props: WizardPageProps) => (
  <WizardPage
    step={props.step}
    location={props.location}
    handleNext={props.handleNext}
    handlePrevious={props.handlePrevious}
    sidebarContent={<SideBar />}
  >
    <h2>Review &amp; Bind</h2>
    <p>Review all details and bind the policy.</p>
  </WizardPage>
);

export default ReviewBindStep;
