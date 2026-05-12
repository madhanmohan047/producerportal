import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getAccountById,
  createAccount,
  getAllProducerCodes,
  getAllOrganizations,
  ProducerCode,
  Organization,
  Account,
  Address,
  Contact as ContactType,
} from "./../../api/services";
import { TypeKeyValue } from "./../../api/utils/types";
import Combobox, {
  ComboboxOption,
} from "../../components/common/Combobox/Combobox";
import AddressSection from "../../components/AddressComponent/AddressComponent";
import { Contact } from "../../components/ContactComponent/ContactComponent";
import FormInput from "../../components/common/FormInput/FormInput";
import Button from "../../components/common/Button/Button";
import styles from "../NewAccount/NewAccount.module.scss";

const STATUS_OPTIONS: ComboboxOption[] = [
  { code: "active", name: "Active" },
  { code: "inactive", name: "Inactive" },
  { code: "pending", name: "Pending" },
  { code: "suspended", name: "Suspended" },
];

const emptyAddress: Address = {
  _id: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  county: "",
  state: { code: "", name: "" },
  postalCode: "",
  country: { code: "", name: "" },
  addressType: { code: "", name: "" },
};

const emptyContact: ContactType = {
  _id: "",
  firstName: "",
  lastName: "",
  type: { code: "person", name: "Person" },
  roles: [],
};

export const NewAccount = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const accountId = params.get("id");
  const isCreateMode = !accountId;

  const [accountDetails, setAccountDetails] = useState<any>(null);
  const [producerCodes, setProducerCodes] = useState<ProducerCode[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  // Create-mode form state
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState<ContactType>(emptyContact);
  const [primaryLocation, setPrimaryLocation] = useState<Address>(emptyAddress);
  const [status, setStatus] = useState<TypeKeyValue | undefined>(undefined);
  const [selectedOrganization, setSelectedOrganization] = useState<
    ComboboxOption | undefined
  >(undefined);
  const [selectedProducerCode, setSelectedProducerCode] = useState<
    ComboboxOption | undefined
  >(undefined);
  const [saving, setSaving] = useState(false);

  // View-mode local state
  const [selectedPolicyId, setSelectedPolicyId] = useState<number | string>(0);
  const [selectedJobId, setSelectedJobId] = useState<number | string>(0);

  // useEffect(() => {
  //   if (!accountId) return;
  //   const fetchData = async () => {
  //     try {
  //       const res = await getAccountById(accountId);
  //       setAccountDetails(res.data);
  //       console.log("Account details fetched successfully:", res.data);
  //     } catch (error) {
  //       console.error("Error fetching account details:", error);
  //     }
  //   };
  //   fetchData();
  // }, [accountId]);

  useEffect(() => {
    getAllProducerCodes()
      .then((res) => setProducerCodes(res.data))
      .catch((err) => console.error("Error fetching producer codes:", err));
    getAllOrganizations()
      .then((res) => setOrganizations(res.data))
      .catch((err) => console.error("Error fetching organizations:", err));
  }, []);

  const organizationOptions = useMemo<ComboboxOption[]>(() => {
    if (!Array.isArray(organizations)) return [];

    return organizations.map((o) => ({
      code: o._id || (o as any).code,
      name: o.name,
    }));
  }, [organizations]);

  const producerCodeOptions = useMemo<ComboboxOption[]>(() => {
    if (!Array.isArray(producerCodes)) return [];

    return producerCodes.map((p) => ({
      code: p._id || p.code,
      name: `${p.code} - ${p.name}`,
    }));
  }, [producerCodes]);

  const handleContactChange = (val: any, path: string) => {
    if (path === "contactType") {
      setAccountHolder((prev) => ({
        ...prev,
        type: {
          code: val,
          name: val === "person" ? "Person" : "Company",
        },
      }));
    } else {
      setAccountHolder((prev) => ({ ...prev, [path]: val }));
    }
  };

  const handleCreate = async () => {
    if (!selectedOrganization || !selectedProducerCode) {
      console.warn("Organization and Producer Code are required");
      return;
    }
    setSaving(true);
    try {
      const payload: Account = {
        accountHolder,
        status: status || { code: "Pending", name: "Pending" },
        primaryLocation,
        organization: selectedOrganization.code,
        producerCode: selectedProducerCode.code,
      };
      const res = await createAccount(payload);
      console.log("Account created:", res.data);
      const newId = (res.data as any)?._id;
      if (newId) navigate(`/accountDetails?id=${newId}`);
      else navigate(-1);
    } catch (err) {
      console.error("Error creating account:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles["new-account-page"]}>
      <div className={styles["new-account-card"]}>
        <div className={styles["card-header"]}>
          <button
            className={styles["back-button"]}
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <h1 className={styles["new-account-title"]}>Create Account</h1>
        </div>

        <div className={styles["card-content"]}>
          <div className={styles["new-account-grid"]}>
            <Contact
              value={accountHolder}
              onValueChange={handleContactChange}
            />
            <span>
              <AddressSection
                readOnly={false}
                address={primaryLocation}
                onAddressChange={setPrimaryLocation}
              />
            </span>

            <Combobox
              label="Organization"
              options={organizationOptions || []}
              value={selectedOrganization}
              onChange={setSelectedOrganization}
              variant="primary"
              size="small"
              placeholder="--Select Organization--"
            />

            <Combobox
              label="Producer Code"
              options={producerCodeOptions || []}
              value={selectedProducerCode}
              onChange={setSelectedProducerCode}
              variant="primary"
              size="small"
              placeholder="--Select Producer Code--"
            />
          </div>

          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              gap: "0.75rem",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="secondary"
              onClick={() => navigate(-1)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreate} disabled={saving}>
              {saving ? "Creating..." : "Create Account"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAccount;
