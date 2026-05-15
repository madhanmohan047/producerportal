import { useNavigate } from "react-router-dom";

import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import ClaimSubmitted from "../../../../components/ClaimSubmittedComponent/ClaimSubmittedComponent";

import { WizardPageProps } from "../../../../types/Wizardtype";
import { FNOLWizardsteps } from "../FNOLWizardsteps";
import { useFNOLContext } from "../../FNOLWizardContext";

const DEFAULT_CLAIM_NUMBER = "CL-2025-004872";
const DEFAULT_SUBMITTED_DATE = "Submitted April 15, 2025 • 2:34 PM ET";
const DEFAULT_EMAIL = "s.mitchell@email.com";

const ClaimSubmittedStep = (
  wizardPageProps: WizardPageProps,
) => {
  const navigate = useNavigate();
  const { fnolFormData } = useFNOLContext();

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
        claimNumber={fnolFormData.claimNumber ?? DEFAULT_CLAIM_NUMBER}
        submittedDate={fnolFormData.submittedDate ?? DEFAULT_SUBMITTED_DATE}
        emailAddress={fnolFormData.emailAddress ?? DEFAULT_EMAIL}
        onFileAnotherClaim={handleFileAnotherClaim}
        onViewDashboard={handleViewDashboard}
      />
    </WizardPage>
  );
};

export default ClaimSubmittedStep;
