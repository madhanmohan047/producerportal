import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import styles from "./NewAccountModal.module.scss";
import FormInput from "../../../../../components/common/FormInput/FormInput";
import Combobox, { ComboboxOption } from "../../../../../components/common/Combobox/Combobox";
import { getUser, createAccount } from "../../../../../api/services";
import { getTypeList } from "../../../../../api/services/typelist/typelistApi";
import { User } from "../../../../../api/services/admin/types";
import messages from "./NewAccountModal.messages";

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  onSubmitSuccess: (account: any) => void;
};

const accountTypeOptions: ComboboxOption[] = [
  { code: "person", name: "Person" },
  { code: "company", name: "Company" },
];

type ApiResult<T> = T | { data: T };

const unwrapApiData = <T,>(response: ApiResult<T>): T => {
  if (response && typeof response === "object" && "data" in response) {
    return (response as { data: T }).data;
  }
  return response as T;
};

export const NewAccountModal = ({ isOpen, onCancel, onSubmitSuccess }: Props) => {
  const intl = useIntl();
  const [saving, setSaving] = useState(false);

  const [organizationId, setOrganizationId] = useState<string>("");
  const [organizationName, setOrganizationName] = useState<string>("");
  const [producerCodeOptions, setProducerCodeOptions] = useState<ComboboxOption[]>([]);
  const [selectedProducerCode, setSelectedProducerCode] = useState<ComboboxOption | undefined>();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [accountType, setAccountType] = useState<ComboboxOption | undefined>();
  const [role, setRole] = useState<ComboboxOption | undefined>();
  const [roleOptions, setRoleOptions] = useState<ComboboxOption[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    Promise.all([getUser(), getTypeList("ContactRole")])
      .then(([userResponse, contactRoleRes]) => {
        const userData = unwrapApiData<User[] | User>(userResponse.data as any);
        const contactRoles = unwrapApiData<ComboboxOption[]>(contactRoleRes as any);

        const rolesData = Array.isArray(contactRoles) ? contactRoles : [];
        const roleOptionsMapped: ComboboxOption[] = rolesData.map((r) => ({
          code: r.code,
          name: r.name,
        }));

        setRoleOptions(roleOptionsMapped);

        const userArray = Array.isArray(userData) ? userData : [userData];
        if (!userArray.length) return;

        const user = userArray[0] as User;
        const organization = user.organization;

        if (organization) {
          const org =
            typeof organization === "string"
              ? { _id: organization, name: "" }
              : (organization as any);
          setOrganizationId(org._id ?? "");
          setOrganizationName(org.name ?? "");
        } else {
          setOrganizationId("");
          setOrganizationName("");
        }

        const producerCodesData = user.producerCode || (user as any).producerCodes;
        if (!Array.isArray(producerCodesData)) {
          setProducerCodeOptions([]);
          return;
        }

        const options: ComboboxOption[] = producerCodesData.map((pc: any) => {
          const codeObj = typeof pc === "string" ? { code: pc, name: pc } : pc;
          const codeValue = codeObj.code || codeObj._id || "";
          return { code: codeValue, name: codeValue };
        });

        setProducerCodeOptions(options);
      })
      .catch((error) => {
        console.error("Failed to fetch user data or contact roles:", error);
      });
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
    });
    setAccountType(undefined);
    setRole(undefined);
  };

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  const handleSubmit = async () => {
    if (!formData.firstName.trim()) {
      alert(intl.formatMessage(messages.errorFirstName));
      return;
    }
    if (!formData.lastName.trim()) {
      alert(intl.formatMessage(messages.errorLastName));
      return;
    }
    if (!formData.email.trim()) {
      alert(intl.formatMessage(messages.errorEmail));
      return;
    }
    if (!formData.address.trim()) {
      alert(intl.formatMessage(messages.errorAddress));
      return;
    }
    if (!formData.city.trim()) {
      alert(intl.formatMessage(messages.errorCity));
      return;
    }
    if (!formData.state.trim()) {
      alert(intl.formatMessage(messages.errorState));
      return;
    }
    if (!formData.postalCode.trim()) {
      alert(intl.formatMessage(messages.errorPostalCode));
      return;
    }
    if (!selectedProducerCode) {
      alert(intl.formatMessage(messages.errorProducerCode));
      return;
    }
    if (!role) {
      alert(intl.formatMessage(messages.errorRole));
      return;
    }

    try {
      setSaving(true);

      const response = await createAccount({
        organization: organizationId,
        producerCode: selectedProducerCode.code,
        status: { code: "active", name: "Active" },
        accountHolder: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailAddress: formData.email,
          workPhone: formData.phone,
          type: { code: accountType?.code, name: accountType?.name },
          ...(role ? { roles: [{ code: role.code, name: role.name }] } : {}),
        },
        primaryLocation: {
          addressLine1: formData.address,
          addressLine2: "",
          city: formData.city,
          county: "",
          state: { code: formData.state, name: formData.state },
          postalCode: formData.postalCode,
          country: { code: "US", name: "United States" },
          addressType: { code: "primary", name: "Primary" },
        },
      } as any);

      const accountData = unwrapApiData(response.data as any);

      const createdAccount = {
        ...accountData,
        accountHolder: accountData.accountHolder || {
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
        primaryLocation: accountData.primaryLocation || {
          addressLine1: formData.address,
        },
      };

      onSubmitSuccess(createdAccount);
      handleCancel();
    } catch (error) {
      console.error("Error creating account", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`${styles["modal-overlay"]} ${isOpen ? styles["open"] : ""}`}>
      <div className={styles["modal-container"]}>
        <div className={styles["modal-header"]}>
          <h2>{intl.formatMessage(messages.title)}</h2>
          <button className={styles["close-btn"]} onClick={handleCancel}>✕</button>
        </div>

        <div className={styles["modal-body"]}>
          <section className={styles["section"]}>
            <h3>{intl.formatMessage(messages.sectionGeneral)}</h3>
            <div className={styles["grid-2"]}>
              <FormInput
                label={intl.formatMessage(messages.organization)}
                name="organization"
                value={organizationName}
                disabled
              />
              <Combobox
                label={intl.formatMessage(messages.producerCodeLabel)}
                options={producerCodeOptions}
                value={selectedProducerCode}
                placeholder={intl.formatMessage(messages.producerCodePlaceholder)}
                onChange={(opt) => setSelectedProducerCode(opt)}
              />
            </div>
          </section>

          <section className={styles["section"]}>
            <h3>{intl.formatMessage(messages.sectionAccountHolder)}</h3>
            <div className={styles["grid-2"]}>
              <FormInput
                label={intl.formatMessage(messages.firstNameRequired)}
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder={intl.formatMessage(messages.firstNamePlaceholder)}
              />
              <FormInput
                label={intl.formatMessage(messages.lastNameRequired)}
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder={intl.formatMessage(messages.lastNamePlaceholder)}
              />
              <FormInput
                label={intl.formatMessage(messages.emailRequired)}
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={intl.formatMessage(messages.emailPlaceholder)}
              />
              <FormInput
                label={intl.formatMessage(messages.phone)}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={intl.formatMessage(messages.phonePlaceholder)}
              />
              <Combobox
                label={intl.formatMessage(messages.accountType)}
                options={accountTypeOptions}
                value={accountType}
                onChange={setAccountType}
                placeholder={intl.formatMessage(messages.accountTypePlaceholder)}
              />
              <Combobox
                label={intl.formatMessage(messages.role)}
                options={roleOptions}
                value={role}
                onChange={setRole}
                placeholder={intl.formatMessage(messages.rolePlaceholder)}
              />
            </div>
          </section>

          <section className={styles["section"]}>
            <h3>{intl.formatMessage(messages.sectionPrimaryLocation)}</h3>
            <div className={styles["grid-1"]}>
              <FormInput
                label={intl.formatMessage(messages.addressRequired)}
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder={intl.formatMessage(messages.addressPlaceholder)}
              />
            </div>
            <div className={styles["grid-3"]}>
              <FormInput
                label={intl.formatMessage(messages.city)}
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder={intl.formatMessage(messages.cityPlaceholder)}
              />
              <FormInput
                label={intl.formatMessage(messages.state)}
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder={intl.formatMessage(messages.statePlaceholder)}
              />
              <FormInput
                label={intl.formatMessage(messages.postalCode)}
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder={intl.formatMessage(messages.postalCodePlaceholder)}
              />
            </div>
          </section>
        </div>

        <div className={styles["modal-footer"]}>
          <button
            className={styles["cancel-btn"]}
            onClick={handleCancel}
            disabled={saving}
          >
            {intl.formatMessage(messages.cancel)}
          </button>
          <button
            className={styles["create-btn"]}
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? intl.formatMessage(messages.creating) : intl.formatMessage(messages.createAccount)}
          </button>
        </div>
      </div>
    </div>
  );
};
