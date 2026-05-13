type WizardStep = {
  id: string;
  type: string;
  route: string;
  component: React.ComponentType<any>;
  wizardPageConfig: WizardPageConfig;
};
type WizardPageConfig = {
  title: string;
  description: string;
  stepId: string;
  hideNameInProgress?: boolean;
  isSubmission?: boolean;
  buttonProps: {
    next: {
      label: string;
    };
    previous: {
      label: string;
    };
    saveDraft?: {
      label: string;
    };
  };
};
type WizardProps = {
  steps: WizardStep[];
  header: string;
  url: string;
  location: any;
  wizardSidebarprops?: WizardSidebarProps;
};
type WizardPageProps = {
  step: WizardStep;
  location: any;
  handleNext?: () => void;
  handlePrevious?: () => void;
  handleSaveDraft?: () => void;
  wizardSidebarprops?: WizardSidebarProps;
  children?: React.ReactNode;
};
type WizardSidebarItemProps = {
  transformationKey: string;
  transformationLabel: string;
};
type WizardSidebarProps = {
  title: string;
  additionalData?: React.ComponentType<any>;
  sidebaritems: WizardSidebarItemProps[];
};

export type {
  WizardStep,
  WizardPageProps,
  WizardProps,
  WizardPageConfig,
  WizardSidebarProps,
  WizardSidebarItemProps,
};
