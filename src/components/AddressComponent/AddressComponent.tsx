import React from "react";
import { useIntl } from "react-intl";
import { Address } from "../../api/services/account/types/Address";
import FormInput from "../common/FormInput/FormInput";
import { ADDRESS_MESSAGES } from "./AddressComponent.messages";
import styles from "./AddressComponent.module.scss";

type AddressSectionProps = {
  readOnly: boolean;
  address: Address;
  onAddressChange?: React.Dispatch<React.SetStateAction<Address>>;
  addressLine1Input?: React.ReactNode;
};

const AddressSection = ({
  readOnly,
  address,
  onAddressChange,
  addressLine1Input,
}: AddressSectionProps) => {
  const intl = useIntl();
  readOnly = false;

  const handleFieldChange =
    (field: keyof Address) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onAddressChange?.((prev) => ({ ...prev, [field]: e.target.value }));
    };

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
        {/* <FormInput
                    label={intl.formatMessage(ADDRESS_MESSAGES.stateLabel)}
                    required
                    value={address.state}
                    onChange={handleFieldChange("state")}
                    readOnly={readOnly}
                /> */}
        <FormInput
          label={intl.formatMessage(ADDRESS_MESSAGES.postalCodeLabel)}
          required
          value={address.postalCode}
          onChange={handleFieldChange("postalCode")}
          readOnly={readOnly}
        />
        {/* <FormInput
                    label={intl.formatMessage(ADDRESS_MESSAGES.countryLabel)}
                    required
                    value={address.country}
                    onChange={handleFieldChange("country")}
                    readOnly={readOnly}
                /> */}
      </div>
      {/* <FormInput
                label={intl.formatMessage(ADDRESS_MESSAGES.addressTypeLabel)}
                value={address.addressType}
                onChange={handleFieldChange("addressType")}
                readOnly={readOnly}
                placeholder={intl.formatMessage(ADDRESS_MESSAGES.addressTypePlaceholder)}
            /> */}
    </div>
  );
};

export default AddressSection;
