import { Location } from "react-router";

export type WizardSidebarItemProps = {
  transformationKey: string;
  transformationLabel: string;
};

export type WizardSidebarProps = {
  title: string;
  sidebaritems: WizardSidebarItemProps[];
};

export type WizardStep = {
  id: string;
  type: string;
  route: string;
  component: React.ComponentType<any>;
  wizardPageConfig: WizardPageConfig;
};

export type WizardPageConfig = {
  title: string;
  description: string;
  stepId?: string;
  hideNameInProgress?: boolean;
  isSubmission?: boolean;
  buttonProps: {
    next: { label: string };
    previous: { label: string };
    save?: { show?: boolean; label?: string };
    saveDraft?: { label?: string };
  };
};

export type WizardProps = {
  steps: WizardStep[];
  header?: string;
  url: string;
  location?: any;
  wizardSidebarprops?: WizardSidebarProps;
};

export type WizardPageProps = {
  step: WizardStep;
  location?: any;
  handleNext?: () => void;
  handlePrevious?: () => void;
  handleSaveDraft?: () => void;
  wizardSidebarprops?: WizardSidebarProps;
  children: React.ReactNode;
  sidebarContent?: React.ReactNode;
};
