import React, { useEffect, useState } from "react";
import styles from "./PolicyLobSelection.module.scss";

import { getTypeList } from "../../../../api/services/typelist/typelistApi";
import Combobox, {
  ComboboxOption,
} from "../../../../components/common/Combobox/Combobox";
import { Account } from "../../../../api/services/account/types";
import { getUser } from "../../../../api/services";
import { ProducerCode, User } from "../../../../api/services/admin/types";

type Props = {
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

const mapToComboboxOptions = (items: any[] = []): ComboboxOption[] => {
  return items.map((item) => ({
    code: item.code,
    name: item.name,
  }));
};

const getResponseData = (response: TypelistResponse): ComboboxOption[] => {
  return Array.isArray(response) ? response : response.data || [];
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

const getStoredSelectedAccount = (): Account | undefined => {
  const account = sessionStorage.getItem("selectedAccount");

  return account ? (JSON.parse(account) as Account) : undefined;
};

const getInitialFormData = (): PolicyLobFormData => {
  const effectiveDate = formatDate(new Date());

  return {
    product: "",
    programPlan: "",
    effectiveDate,
    expirationDate: addMonths(effectiveDate, Number(termLengthOptions[0].code)),
    termLength: termLengthOptions[0].code,
    garagingState: "",
    submissionType: "New Submission",
    producingAgent: "",
  };
};

const getProducerAgentName = (
  producerCode?: Account["producerCode"] | ProducerCode,
): string => {
  if (!producerCode) return "";

  if (typeof producerCode === "string") {
    return producerCode;
  }

  return producerCode.name || producerCode.code || "";
};

const getUserProducerCodes = (user: User | User[]): ProducerCode[] => {
  const currentUser = Array.isArray(user) ? user[0] : user;
  const producerCodes =
    currentUser?.producerCode || (currentUser as any)?.producerCodes;

  if (!Array.isArray(producerCodes)) {
    return [];
  }

  return producerCodes.filter(
    (producerCode): producerCode is ProducerCode =>
      typeof producerCode !== "string",
  );
};

const getSelectedAccountProducerName = (
  account: Account | undefined,
  user: User | User[],
): string => {
  const accountProducerCode = account?.producerCode;

  if (!accountProducerCode) return "";

  if (typeof accountProducerCode !== "string") {
    return getProducerAgentName(accountProducerCode);
  }

  const matchingProducerCode = getUserProducerCodes(user).find(
    (producerCode) =>
      producerCode.code === accountProducerCode ||
      producerCode._id === accountProducerCode ||
      producerCode.name === accountProducerCode,
  );

  return matchingProducerCode?.name || accountProducerCode;
};

const findMatchingState = (
  states: ComboboxOption[],
  account: Account | undefined,
): ComboboxOption | undefined => {
  const accountState = account?.primaryLocation?.state;

  if (!accountState) return undefined;

  return (
    states.find(
      (state) =>
        state.code === accountState.code || state.name === accountState.name,
    ) || { code: accountState.code, name: accountState.name }
  );
};

export const PolicyLobSelection = ({ accountName }: Props) => {
  const [productOptions, setProductOptions] = useState<ComboboxOption[]>([]);
  const [programOptions, setProgramOptions] = useState<ComboboxOption[]>([]);
  const [stateOptions, setStateOptions] = useState<ComboboxOption[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<
    ComboboxOption | undefined
  >();
  const [selectedProgram, setSelectedProgram] = useState<
    ComboboxOption | undefined
  >();
  const [selectedTermLength, setSelectedTermLength] = useState<
    ComboboxOption | undefined
  >(termLengthOptions[0]);
  const [selectedGaragingState, setSelectedGaragingState] = useState<
    ComboboxOption | undefined
  >();

  const [formData, setFormData] =
    useState<PolicyLobFormData>(getInitialFormData);

  useEffect(() => {
    const selectedAccount = getStoredSelectedAccount();

    Promise.all([
      getTypeList("Product"),
      getTypeList("ProgramPlan"),
      getTypeList("State"),
      getUser(),
    ])
      .then(
        ([productResponse, programResponse, stateResponse, userResponse]) => {
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
            producingAgent: getSelectedAccountProducerName(
              selectedAccount,
              user,
            ),
          }));
        },
      )
      .catch((error) => {
        console.error("Error loading policy LOB data:", error);
      });
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Policy &amp; LOB Selection</h1>

        <p className={styles.subtitle}>
          Confirm the line of business, term, and key dates.
        </p>

        <div className={styles.successBox}>
          <span className={styles.icon}>♙</span>

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
                setFormData((prev) => ({
                  ...prev,
                  product: option.code,
                }));
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
                setFormData((prev) => ({
                  ...prev,
                  programPlan: option.code,
                }));
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
              onChange={(option) => {
                setSelectedTermLength(option);
                setFormData((prev) => ({
                  ...prev,
                  termLength: option.code,
                  expirationDate: addMonths(
                    prev.effectiveDate,
                    Number(option.code),
                  ),
                }));
              }}
            />
          </div>
          <div className={styles.field}>
            <label>
              Effective Date <span>*</span>
            </label>

            <input
              type="date"
              value={formData.effectiveDate}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  effectiveDate: event.target.value,
                  expirationDate: addMonths(
                    event.target.value,
                    Number(prev.termLength),
                  ),
                }))
              }
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
                setFormData((prev) => ({
                  ...prev,
                  garagingState: option.code,
                }));
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
  );
};
