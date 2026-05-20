import React, { useEffect, useState } from "react";
import styles from "./PolicyLobSelection.module.scss";

import { getTypeList } from "../../../../api/services/typelist/typelistApi";
import Combobox, {
  ComboboxOption,
} from "../../../../components/common/Combobox/Combobox";
import { Account } from "../../../../api/services/account/types";
import { getUser } from "../../../../api/services";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";

type Props = WizardPageProps & {
  accountName?: string;
};

type TypelistResponse = ComboboxOption[] | { data?: ComboboxOption[] };

type PolicyLobFormData = {
  product: string;
  programPlan: string;
  effectiveDate: string;
  expirationDate: string;
  termLength: string;
  garagingState: string;
  submissionType: string;
  producingAgent: string;
};

const termLengthOptions: ComboboxOption[] = [
  { code: "12", name: "12 Months" },
  { code: "6", name: "6 Months" },
];

const formatDate = (date: Date): string => date.toISOString().slice(0, 10);

const addMonths = (dateValue: string, months: number): string => {
  const date = new Date(`${dateValue}T00:00:00`);
  date.setMonth(date.getMonth() + months);
  return formatDate(date);
};

const mapToComboboxOptions = (items: any[] = []): ComboboxOption[] =>
  items.map(({ code, name }) => ({ code, name }));

const getResponseData = (response: TypelistResponse): ComboboxOption[] =>
  Array.isArray(response) ? response : response.data || [];

const getStoredSelectedAccount = (): Account | undefined => {
  const account = sessionStorage.getItem("selectedAccount");
  return account ? (JSON.parse(account) as Account) : undefined;
};

const getInitialFormData = (): PolicyLobFormData => {
  const effectiveDate = formatDate(new Date());
  const termLength = termLengthOptions[0].code;

  return {
    product: "",
    programPlan: "",
    effectiveDate,
    expirationDate: addMonths(effectiveDate, Number(termLength)),
    termLength,
    garagingState: "",
    submissionType: "New Submission",
    producingAgent: "",
  };
};

const getProducerName = (user: any, account?: Account): string => {
  const producerCodes = user?.producerCodes || [];
  const accountProducerCode = account?.producerCode;

  if (!Array.isArray(producerCodes) || producerCodes.length === 0) {
    return "";
  }

  if (!accountProducerCode) {
    return producerCodes[0]?.name || "";
  }

  if (typeof accountProducerCode !== "string") {
    return accountProducerCode.name || "";
  }

  const matchedProducer = producerCodes.find(
    (producer: any) =>
      producer.code === accountProducerCode ||
      producer._id === accountProducerCode,
  );

  return matchedProducer?.name || "";
};

const findMatchingState = (
  states: ComboboxOption[],
  account?: Account,
): ComboboxOption | undefined => {
  const accountState = account?.primaryLocation?.state;

  if (!accountState) return undefined;

  return (
    states.find(
      (state) =>
        state.code === accountState.code || state.name === accountState.name,
    ) || {
      code: accountState.code,
      name: accountState.name,
    }
  );
};

export const PolicyLobSelection = (wizardPageProps: Props) => {
  const { accountName } = wizardPageProps;
  const [productOptions, setProductOptions] = useState<ComboboxOption[]>([]);
  const [programOptions, setProgramOptions] = useState<ComboboxOption[]>([]);
  const [stateOptions, setStateOptions] = useState<ComboboxOption[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ComboboxOption>();
  const [selectedProgram, setSelectedProgram] = useState<ComboboxOption>();
  const [selectedTermLength, setSelectedTermLength] = useState<ComboboxOption>(
    termLengthOptions[0],
  );
  const [selectedGaragingState, setSelectedGaragingState] =
    useState<ComboboxOption>();
  const [formData, setFormData] =
    useState<PolicyLobFormData>(getInitialFormData);
  const updateFormData = (field: keyof PolicyLobFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    const loadPolicyLobData = async () => {
      try {
        const selectedAccount = getStoredSelectedAccount();
        const [productResponse, programResponse, stateResponse, userResponse] =
          await Promise.all([
            getTypeList("Product"),
            getTypeList("ProgramPlan"),
            getTypeList("State"),
            getUser(),
          ]);
        const products = mapToComboboxOptions(
          getResponseData(productResponse as TypelistResponse),
        );
        const programs = mapToComboboxOptions(
          getResponseData(programResponse as TypelistResponse),
        );
        const states = mapToComboboxOptions(
          getResponseData(stateResponse as TypelistResponse),
        );

        const defaultProduct = products[0];
        const defaultProgram = programs[0];
        const defaultState = findMatchingState(states, selectedAccount);
        const user = (userResponse as any).data || userResponse;

        setProductOptions(products);
        setProgramOptions(programs);
        setStateOptions(states);

        setSelectedProduct(defaultProduct);
        setSelectedProgram(defaultProgram);
        setSelectedGaragingState(defaultState);

        setFormData((prev) => ({
          ...prev,
          product: defaultProduct?.code || "",
          programPlan: defaultProgram?.code || "",
          garagingState: defaultState?.code || "",
          producingAgent: getProducerName(user, selectedAccount),
        }));
      } catch (error) {
        console.error("Error loading policy LOB data:", error);
      }
    };

    loadPolicyLobData();
  }, []);

  const handleTermLengthChange = (option: ComboboxOption) => {
    setSelectedTermLength(option);

    setFormData((prev) => ({
      ...prev,
      termLength: option.code,
      expirationDate: addMonths(prev.effectiveDate, Number(option.code)),
    }));
  };

  const handleEffectiveDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const effectiveDate = event.target.value;

    setFormData((prev) => ({
      ...prev,
      effectiveDate,
      expirationDate: addMonths(effectiveDate, Number(prev.termLength)),
    }));
  };

  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={wizardPageProps.handleNext}
      handlePrevious={wizardPageProps.handlePrevious}
      SidebarComponent={wizardPageProps.SidebarComponent}
    >
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.subtitle}>
            Confirm the line of business, term, and key dates.
          </p>

          <div className={styles.successBox}>
            <span className={styles.successText}>
              Account Linked
              {accountName && <strong>{accountName}</strong>}
            </span>
          </div>

          <div className={styles.gridTwo}>
            <div className={styles.field}>
              <Combobox
                label="Line of Business *"
                options={productOptions}
                value={selectedProduct}
                placeholder="Select Line of Business"
                fullWidth
                onChange={(option) => {
                  setSelectedProduct(option);
                  updateFormData("product", option.code);
                }}
              />
            </div>

            <div className={styles.field}>
              <Combobox
                label="Program / Plan"
                options={programOptions}
                value={selectedProgram}
                placeholder="Select Program / Plan"
                fullWidth
                onChange={(option) => {
                  setSelectedProgram(option);
                  updateFormData("programPlan", option.code);
                }}
              />
            </div>
          </div>

          <div className={styles.gridThree}>
            <div className={styles.field}>
              <Combobox
                label="Term Length *"
                options={termLengthOptions}
                value={selectedTermLength}
                placeholder="Select Term Length"
                fullWidth
                onChange={handleTermLengthChange}
              />
            </div>

            <div className={styles.field}>
              <label>
                Effective Date <span>*</span>
              </label>

              <input
                type="date"
                value={formData.effectiveDate}
                onChange={handleEffectiveDateChange}
              />
            </div>

            <div className={styles.field}>
              <label>Expiration Date</label>

              <input type="date" value={formData.expirationDate} readOnly />
            </div>
          </div>

          <h4 className={styles.sectionTitle}>STATE &amp; UNDERWRITING</h4>

          <div className={styles.gridThree}>
            <div className={styles.field}>
              <Combobox
                label="Garaging State *"
                options={stateOptions}
                value={selectedGaragingState}
                placeholder="Select Garaging State"
                fullWidth
                onChange={(option) => {
                  setSelectedGaragingState(option);
                  updateFormData("garagingState", option.code);
                }}
              />
            </div>

            <div className={styles.field}>
              <label>Submission Type</label>

              <input type="text" value={formData.submissionType} readOnly />
            </div>

            <div className={styles.field}>
              <label>Producing Agent</label>

              <input type="text" value={formData.producingAgent} readOnly />
            </div>
          </div>
        </div>
      </div>
    </WizardPage>
  );
};
