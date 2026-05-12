import React, { useEffect, useState, useMemo } from "react";
import "../Combobox/Combobox.scss";

export interface ComboboxOption {
  code: string;
  name: string;
}

export interface ComboboxProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "size" | "value" | "onChange"
> {
  loadOptions?: () => Promise<ComboboxOption[]>;
  options?: ComboboxOption[];
  value?: ComboboxOption;
  onChange?: (option: ComboboxOption) => void;
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  label?: string;
  placeholder?: string;
  className?: string;
}

const DEFAULT_CODE = "0";

const Combobox = React.forwardRef<HTMLSelectElement, ComboboxProps>(
  (
    {
      loadOptions,
      options: staticOptions,
      value,
      onChange,
      variant = "primary",
      size = "medium",
      fullWidth = false,
      label,
      placeholder = "--Select--",
      className = "",
      disabled,
      id: elementId,
      ...rest
    },
    ref,
  ) => {
    const [options, setOptions] = useState<ComboboxOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [internalCode, setInternalCode] = useState<string>(
      value?.code ?? DEFAULT_CODE,
    );

    const currentCode = value !== undefined ? value.code : internalCode;
    useEffect(() => {
      if (value !== undefined) {
        setInternalCode(value.code);
      }
    }, [value]);
    useEffect(() => {
      let isMounted = true;
      if (loadOptions) {
        setLoading(true);
        setError(null);
        loadOptions()
          .then((data) => {
            if (isMounted) setOptions(data);
          })
          .catch(() => {
            if (isMounted) setError("Failed to load options");
          })
          .finally(() => {
            if (isMounted) setLoading(false);
          });
      } else if (staticOptions) {
        setOptions(staticOptions);
      }
      return () => {
        isMounted = false;
      };
    }, [loadOptions, staticOptions]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedCode = e.target.value;
      setInternalCode(selectedCode);

      if (onChange) {
        const foundOption = options.find((o) => o.code === selectedCode);

        if (foundOption) {
          onChange(foundOption);
        }
      }
    };

    const generatedId = useMemo(
      () => elementId || `combobox-${Math.random().toString(36).substr(2, 9)}`,
      [elementId],
    );

    const containerClass = [
      "combobox",
      `combobox--${variant}`,
      `combobox--${size}`,
      fullWidth ? "combobox--full-width" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={containerClass}>
        {label && (
          <label className="combobox__label" htmlFor={generatedId}>
            {label}
          </label>
        )}

        <div className="combobox__input-wrapper">
          {disabled ? (
            <div>{value?.name}</div>
          ) : (
            <>
              {" "}
              <select
                ref={ref}
                id={generatedId}
                className={`combobox__select ${loading ? "combobox__select--loading" : ""}`}
                value={currentCode}
                onChange={handleChange}
                disabled={disabled || loading}
                {...rest}
              >
                <option value={DEFAULT_CODE}>
                  {loading ? "Loading…" : placeholder}
                </option>
                {error && (
                  <option disabled value="">
                    ⚠️ {error}
                  </option>
                )}
                {!loading &&
                  options.map((opt) => (
                    <option key={opt.code} value={opt.code}>
                      {opt.name}
                    </option>
                  ))}
              </select>
              {loading ? (
                <span className="combobox__spinner" aria-hidden="true" />
              ) : (
                <span className="combobox__chevron" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 4L6 8L10 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </>
          )}
        </div>
      </div>
    );
  },
);

Combobox.displayName = "Combobox";
export default Combobox;
