import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Address } from "../../api/services/account/types/Address";
import FormInput from "../common/FormInput/FormInput";
import { ADDRESS_MESSAGES } from "./AddressComponent.messages";
import styles from "./AddressComponent.module.scss";
import Combobox, { ComboboxOption } from "../common/Combobox/Combobox";
import { getTypeList } from "../../api/services/typelist/typelistApi";

type AddressSectionProps = {
  readOnly: boolean;
  address: Address;
  onAddressChange?: (address: Address) => void;
  addressLine1Input?: React.ReactNode;
};

export const AddressSection = ({
  readOnly,
  address,
  onAddressChange,
  addressLine1Input,
}: AddressSectionProps) => {
  const intl = useIntl();

  const handleFieldChange =
    (field: keyof Address) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onAddressChange?.({
        ...address,
        [field]: e.target.value,
      });
    };

  const handleTypeKeyValueChange =
    (field: keyof Address) => (option: ComboboxOption) => {
      onAddressChange?.({
        ...address,
        [field]: option,
      });
    };

  const [countries] = useState<ComboboxOption[]>([]);
  const [states, setStates] = useState<ComboboxOption[]>([]);
  const [addressTypes] = useState<ComboboxOption[]>([]);

  useEffect(() => {
    getTypeList("State").then((response) => {
      const raw = response.data as any;
      const list = Array.isArray(raw) ? raw : (Array.isArray(raw?.data) ? raw.data : []);
      setStates(list);
    });
  }, []);

  return (
    <div className={styles.addressSection}>
      {addressLine1Input ?? (
        <FormInput
          label={intl.formatMessage(ADDRESS_MESSAGES.addressLine1Label)}
          required
          value={address.addressLine1}
          onChange={handleFieldChange("addressLine1")}
          placeholder={intl.formatMessage(
            ADDRESS_MESSAGES.addressLine1Placeholder,
          )}
          autoComplete="off"
          readOnly={readOnly}
        />
      )}
      <FormInput
        label={intl.formatMessage(ADDRESS_MESSAGES.addressLine2Label)}
        value={address.addressLine2}
        onChange={handleFieldChange("addressLine2")}
        placeholder={intl.formatMessage(
          ADDRESS_MESSAGES.addressLine2Placeholder,
        )}
        readOnly={readOnly}
      />
      <div className={styles.row}>
        <FormInput
          label={intl.formatMessage(ADDRESS_MESSAGES.cityLabel)}
          required
          value={address.city}
          onChange={handleFieldChange("city")}
          readOnly={readOnly}
        />
      </div>
      <FormInput
        label={intl.formatMessage(ADDRESS_MESSAGES.countyLabel)}
        value={address.county}
        onChange={handleFieldChange("county")}
        readOnly={readOnly}
      />
      <div className={styles.row}>
        <Combobox
          label={intl.formatMessage(ADDRESS_MESSAGES.stateLabel)}
          required
          options={states}
          value={address.state}
          onChange={handleTypeKeyValueChange("state")}
          disabled={readOnly}
        />
        <FormInput
          label={intl.formatMessage(ADDRESS_MESSAGES.postalCodeLabel)}
          required
          value={address.postalCode}
          onChange={handleFieldChange("postalCode")}
          readOnly={readOnly}
        />
        <Combobox
          label={intl.formatMessage(ADDRESS_MESSAGES.countryLabel)}
          required
          options={countries}
          value={address.country}
          onChange={handleTypeKeyValueChange("country")}
          disabled={true}
        />
      </div>
      <Combobox
        label={intl.formatMessage(ADDRESS_MESSAGES.addressTypeLabel)}
        options={addressTypes}
        value={address.addressType}
        onChange={handleTypeKeyValueChange("addressType")}
        disabled={readOnly}
        placeholder={intl.formatMessage(
          ADDRESS_MESSAGES.addressTypePlaceholder,
        )}
      />
    </div>
  );
};

export default AddressSection;
