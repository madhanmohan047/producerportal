import React, { useEffect, useState } from "react";
import styles from "./NewAccountModal.module.scss";
import FormInput from "../../common/FormInput/FormInput";
import Combobox, { ComboboxOption } from "../../common/Combobox/Combobox";
import { getUser, createAccount } from "../../../api/services";
import { getTypeList } from "../../../api/services/typelist/typelistApi";
import { User } from "../../../api/services/admin/types";

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  onSubmitSuccess: (account: any) => void;
};

const accountTypeOptions: ComboboxOption[] = [
  {
    code: "person",
    name: "Person",
  },
  {
    code: "company",
    name: "Company",
  },
];

type ApiResult<T> = T | { data: T };

const unwrapApiData = <T,>(response: ApiResult<T>): T => {
  if (response && typeof response === "object" && "data" in response) {
    return (response as { data: T }).data;
  }

  return response as T;
};

export const NewAccountModal = ({
  isOpen,
  onCancel,
  onSubmitSuccess,
}: Props) => {
  const [saving, setSaving] = useState(false);

  const [organizationId, setOrganizationId] = useState<string>("");
  const [organizationName, setOrganizationName] = useState<string>("");
  const [producerCodeOptions, setProducerCodeOptions] = useState<
    ComboboxOption[]
  >([]);
  const [selectedProducerCode, setSelectedProducerCode] = useState<
    ComboboxOption | undefined
  >();

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
        const userData = unwrapApiData<User[] | User>(userResponse as any);
        const contactRoles = unwrapApiData<ComboboxOption[]>(
          contactRoleRes as any,
        );

        console.log("User API Response:", userData);
        console.log("Contact Roles:", contactRoles);

        const rolesData = Array.isArray(contactRoles) ? contactRoles : [];
        const roleOptionsMapped: ComboboxOption[] = rolesData.map((role) => ({
          code: role.code,
          name: role.name,
        }));

        console.log("Role Options:", roleOptionsMapped);
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

        const producerCodesData =
          user.producerCode || (user as any).producerCodes;

        if (!Array.isArray(producerCodesData)) {
          console.warn("No producer codes found");
          setProducerCodeOptions([]);
          return;
        }

        const producerCodeOptions: ComboboxOption[] = producerCodesData.map(
          (pc: any) => {
            const codeObj =
              typeof pc === "string" ? { code: pc, name: pc } : pc;

            const codeValue = codeObj.code || codeObj._id || "";

            return {
              code: codeValue,
              name: codeValue,
            };
          },
        );

        setProducerCodeOptions(producerCodeOptions);
      })
      .catch((error) => {
        console.error("Failed to fetch user data or contact roles:", error);
      });
  }, [isOpen]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
      alert("First Name is required");
      return;
    }
    if (!formData.lastName.trim()) {
      alert("Last Name is required");
      return;
    }
    if (!formData.email.trim()) {
      alert("Email Address is required");
      return;
    }
    if (!formData.address.trim()) {
      alert("Address is required");
      return;
    }
    if (!formData.city.trim()) {
      alert("City is required");
      return;
    }
    if (!formData.state.trim()) {
      alert("State is required");
      return;
    }
    if (!formData.postalCode.trim()) {
      alert("Postal Code is required");
      return;
    }
    if (!selectedProducerCode) {
      alert("Producer Code is required");
      return;
    }
    if (!role) {
      alert("Role is required");
      return;
    }

    try {
      setSaving(true);

      const response = await createAccount({
        organization: organizationId,
        producerCode: selectedProducerCode.code,
        status: {
          code: "active",
          name: "Active",
        },
        accountHolder: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailAddress: formData.email,
          workPhone: formData.phone,
          type: {
            code: accountType?.code,
            name: accountType?.name,
          },
          ...(role ? { roles: [{ code: role.code, name: role.name }] } : {}),
        },
        primaryLocation: {
          addressLine1: formData.address,
          addressLine2: "",
          city: formData.city,
          county: "",
          state: {
            code: formData.state,
            name: formData.state,
          },
          postalCode: formData.postalCode,
          country: {
            code: "US",
            name: "United States",
          },
          addressType: {
            code: "primary",
            name: "Primary",
          },
        },
      } as any);

      const accountData = unwrapApiData(response as any);

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

      //console.log("sending to parent", createdAccount);

      onSubmitSuccess(createdAccount);

      handleCancel();
    } catch (error) {
      console.error("Error creating account", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={`${styles["modal-overlay"]} ${isOpen ? styles["open"] : ""}`}
    >
      <div className={styles["modal-container"]}>
        <div className={styles["modal-header"]}>
          <h2>Create New Account</h2>

          <button className={styles["close-btn"]} onClick={handleCancel}>
            ✕
          </button>
        </div>

        <div className={styles["modal-body"]}>
          <section className={styles["section"]}>
            <h3>GENERAL INFORMATION</h3>
            <div className={styles["grid-2"]}>
              <FormInput
                label="Organization"
                name="organization"
                value={organizationName}
                disabled
              />

              <Combobox
                label="Producer Code *"
                options={producerCodeOptions}
                value={selectedProducerCode}
                placeholder="Select Producer Code"
                onChange={(opt) => setSelectedProducerCode(opt)}
              />
            </div>
          </section>

          <section className={styles["section"]}>
            <h3>ACCOUNT HOLDER DETAILS</h3>

            <div className={styles["grid-2"]}>
              <FormInput
                label="First Name *"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
              />

              <FormInput
                label="Last Name *"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
              />

              <FormInput
                label="Email Address *"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
              />

              <FormInput
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. (555) 123-4567"
              />

              <Combobox
                label="Account Type"
                options={accountTypeOptions}
                value={accountType}
                onChange={setAccountType}
                placeholder="Select Account Type"
              />

              <Combobox
                label="Role"
                options={roleOptions}
                value={role}
                onChange={setRole}
                placeholder="Select Role"
              />
            </div>
          </section>

          <section className={styles["section"]}>
            <h3>PRIMARY LOCATION</h3>

            <div className={styles["grid-1"]}>
              <FormInput
                label="Address *"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
              />
            </div>

            <div className={styles["grid-3"]}>
              <FormInput
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
              />

              <FormInput
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
              />

              <FormInput
                label="Postal Code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Postal Code"
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
            Cancel
          </button>

          <button
            className={styles["create-btn"]}
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? "Creating..." : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
};
