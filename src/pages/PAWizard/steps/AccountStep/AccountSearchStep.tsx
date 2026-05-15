import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";
import AccountSearch from "../../../../components/AccountSearch/AccountSearch";
import { ContactComponent } from "../../../../components/ContactComponent/ContactComponent";
import AddressComponent from "../../../../components/AddressComponent/AddressComponent";
import { Account } from "../../../../api/services/account/types";
import { Contact } from "../../../../api/services/account/types/Contact";
import { Address } from "../../../../api/services/account/types/Address";
import { usePAContext } from "../../PAWizardContext";
import messages from "./AccountSearchStep.messages";
import styles from "./AccountSearchStep.module.scss";

const emptyContact: Contact = {
  type: { code: "person", name: "Person" },
  roles: [],
  firstName: "",
  lastName: "",
  emailAddress: "",
};

const emptyAddress: Address = {
  addressLine1: "",
  addressLine2: "",
  city: "",
  county: "",
  state: { code: "", name: "" },
  postalCode: "",
  country: { code: "US", name: "United States" },
  addressType: { code: "home", name: "Home" },
};

const AccountSearchStep = (wizardPageProps: WizardPageProps) => {
  const intl = useIntl();
  const { paFormData, setPAFormData } = usePAContext();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(paFormData.accountNumber);
  const [contact, setContact] = useState<Contact>(paFormData.primaryContact ?? emptyContact);
  const [address, setAddress] = useState<Address>(paFormData.mailingAddress ?? emptyAddress);

  const getId = (ref: string | { _id?: string } | undefined): string =>
    !ref ? "" : typeof ref === "string" ? ref : ref._id ?? "";

  const handleAccountSelect = (account: Account) => {
    setSelectedAccountId(account._id);
    const holder = account.accountHolder as Contact;
    const location = account.primaryLocation as Address;
    setPAFormData((prev) => ({
      ...prev,
      accountId: account._id,
      accountNumber: account.accountNumber,
      organizationId: getId(account.organization),
      producerCodeId: getId(account.producerCode),
      primaryContact: holder,
      mailingAddress: location,
      sidebarProps: {
        title: "Policy Summary",
        sidebaritems: [
          {
            transformationKey: "Name",
            transformationLabel:
              [holder.firstName, holder.lastName].filter(Boolean).join(" ") || "—",
          },
          { transformationKey: "City", transformationLabel: location.city || "—" },
        ],
      },
    }));
  };

  const handleContactChange = (value: any, path: string) => {
    setContact((prev) => ({ ...prev, [path]: value }));
  };

  useEffect(() => {
    if (!showCreateForm) return;
    const fullName = [contact.firstName, contact.lastName].filter(Boolean).join(" ");
    setPAFormData((prev) => ({
      ...prev,
      primaryContact: contact,
      mailingAddress: address,
      sidebarProps: {
        title: "Policy Summary",
        sidebaritems: [
          { transformationKey: "Name", transformationLabel: fullName || "—" },
          { transformationKey: "City", transformationLabel: address.city || "—" },
        ],
      },
    }));
  }, [contact, address, showCreateForm]);

  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={wizardPageProps.handleNext}
      handlePrevious={wizardPageProps.handlePrevious}
      SidebarComponent={wizardPageProps.SidebarComponent}
    >
      {!showCreateForm ? (
        <AccountSearch
          selectedAccountId={selectedAccountId}
          onAccountSelect={handleAccountSelect}
          onCreateNew={() => setShowCreateForm(true)}
        />
      ) : (
        <div className={styles["create-form"]}>
          <div className={styles["create-form-header"]}>
            <button
              className={styles["back-link"]}
              onClick={() => setShowCreateForm(false)}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              {intl.formatMessage(messages.backToSearch)}
            </button>
            <h3>{intl.formatMessage(messages.newAccountTitle)}</h3>
          </div>
          <ContactComponent value={contact} onValueChange={handleContactChange} />
          <AddressComponent
            readOnly={false}
            address={address}
            onAddressChange={setAddress}
          />
        </div>
      )}
    </WizardPage>
  );
};

export default AccountSearchStep;
