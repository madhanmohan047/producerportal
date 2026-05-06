import React, { useEffect, useState } from 'react';
import '../Combobox/Combobox.css';

export interface ComboboxOption {
  id: number | string;
  value: string;
}

export interface ComboboxProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Async or sync loader — return { id, value }[] */
  loadOptions?: () => Promise<ComboboxOption[]>;
  /** Static options (used when loadOptions is not provided) */
  options?: ComboboxOption[];
  /** Controlled selected id */
  selectedId?: number | string;
  /** Fires with the chosen option (or the default option when id === 0) */
  onOptionChange?: (option: ComboboxOption) => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  label?: string;
  placeholder?: string;
  className?: string;
}

const DEFAULT_OPTION: ComboboxOption = { id: 0, value: '--Select--' };

const Combobox = React.forwardRef<HTMLSelectElement, ComboboxProps>(
  (
    {
      loadOptions,
      options: staticOptions,
      selectedId,
      onOptionChange,
      variant = 'primary',
      size = 'medium',
      fullWidth = false,
      label,
      placeholder = '--Select--',
      className = '',
      disabled,
      ...rest
    },
    ref
  ) => {
    const [options, setOptions] = useState<ComboboxOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Resolve to controlled or internal value
    const [internalId, setInternalId] = useState<number | string>(
      selectedId ?? 0
    );
    const currentId = selectedId !== undefined ? selectedId : internalId;

    // Sync controlled selectedId → internal state
    useEffect(() => {
      if (selectedId !== undefined) setInternalId(selectedId);
    }, [selectedId]);

    // Load options dynamically
    useEffect(() => {
      if (loadOptions) {
        setLoading(true);
        setError(null);
        loadOptions()
          .then((data) => setOptions(data))
          .catch(() => setError('Failed to load options'))
          .finally(() => setLoading(false));
      } else if (staticOptions) {
        setOptions(staticOptions);
      }
    }, [loadOptions, staticOptions]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const rawId = e.target.value;
      // Preserve numeric ids if originally numeric
      const id = rawId === '0' ? 0 : isNaN(Number(rawId)) ? rawId : Number(rawId);
      setInternalId(id);
      if (onOptionChange) {
        const found =
          id === 0
            ? { id: 0, value: placeholder }
            : options.find((o) => String(o.id) === String(id)) ?? {
                id,
                value: '',
              };
        onOptionChange(found);
      }
    };

    const containerClass = [
      'combobox',
      `combobox--${variant}`,
      `combobox--${size}`,
      fullWidth ? 'combobox--full-width' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const selectClass = [
      'combobox__select',
      loading ? 'combobox__select--loading' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClass}>
        {label && (
          <label className="combobox__label">{label}</label>
        )}

        <select
          ref={ref}
          className={selectClass}
          value={String(currentId)}
          onChange={handleChange}
          disabled={disabled || loading}
          {...rest}
        >
          {/* Default "-- Select --" option with id 0 */}
          <option value="0">{loading ? 'Loading…' : placeholder}</option>

          {error && (
            <option disabled value="">
              {error}
            </option>
          )}

          {!loading &&
            options.map((opt) => (
              <option key={opt.id} value={String(opt.id)}>
                {opt.value}
              </option>
            ))}
        </select>

        {/* Show spinner while loading, chevron otherwise */}
        {loading ? (
          <span className="combobox__spinner" aria-hidden="true" />
        ) : (
          <span className="combobox__chevron" aria-hidden="true">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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
      </div>
    );
  }
);

Combobox.displayName = 'Combobox';
export default Combobox;