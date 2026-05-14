import { useNavigate } from "react-router-dom";

import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import ClaimSubmitted from "../../../../components/ClaimSubmittedComponent/ClaimSubmittedComponent";

import { WizardPageProps } from "../../../../types/Wizardtype";
import { FNOLWizardsteps } from "../FNOLWizardsteps";

const ClaimSubmittedStep = (
  wizardPageProps: WizardPageProps,
) => {
  const navigate = useNavigate();

  const handleFileAnotherClaim = () => {
    navigate(`/fnol-wizard/${FNOLWizardsteps[0].route}`);
  };

  const handleViewDashboard = () => {
    navigate("/");
  };

  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={wizardPageProps.handleNext}
      handlePrevious={
        wizardPageProps.handlePrevious
      }
      handleSaveDraft={
        wizardPageProps.handleSaveDraft
      }
      wizardSidebarprops={
        wizardPageProps.wizardSidebarprops
      }
    >
      <ClaimSubmitted
        claimNumber="CL-2025-004872"
        submittedDate="Submitted April 15, 2025 • 2:34 PM ET"
        emailAddress="s.mitchell@email.com"
        onFileAnotherClaim={handleFileAnotherClaim}
        onViewDashboard={handleViewDashboard}
      />
    </WizardPage>
  );
};

export default ClaimSubmittedStep;