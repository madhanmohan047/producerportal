import { WizardPageProps } from "../../../../types/Wizardtype";
import WizardPage from "../../../../components/Wizard/BaseWizardPage/BaseWizardpage";
import SideBar from "../../../../components/SideBar/SideBar";
import { AddressCustomerSearch } from "../../../../components/AddressCustomerSearch/AddressCustomerSearch";

const AccountSearchStep = (props: WizardPageProps) => (
  <WizardPage
    step={props.step}
    handleNext={props.handleNext}
    handlePrevious={props.handlePrevious}
    sidebarContent={<SideBar />}
  >
    <AddressCustomerSearch />
  </WizardPage>
);

export default AccountSearchStep;
