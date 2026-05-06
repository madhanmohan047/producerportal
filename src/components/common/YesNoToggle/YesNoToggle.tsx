import React, { useEffect, useState } from 'react';
import '../YesNoToggle/YesNoToggle.css';

export interface YesNoToggleProps {
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  fullWidth?: boolean;
  className?: string;
  yesLabel?: string;
  noLabel?: string;
  id?: string;
  style?: React.CSSProperties;
}

const YesNoToggle = React.forwardRef<
  HTMLDivElement,
  YesNoToggleProps
>(
  (
    {
      value,
      defaultValue = false,
      onChange,
      disabled = false,
      label,
      size = 'medium',
      variant = 'primary',
      fullWidth = false,
      className = '',
      yesLabel = 'Yes',
      noLabel = 'No',
      id,
      style,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] =
      useState<boolean>(defaultValue);

    const currentValue =
      value !== undefined ? value : internalValue;

    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    const handleToggle = (newValue: boolean) => {
      if (disabled) return;

      setInternalValue(newValue);

      if (onChange) {
        onChange(newValue);
      }
    };

    const containerClass = [
      'yesno-toggle',
      `yesno-toggle--${size}`,
      `yesno-toggle--${variant}`,
      fullWidth ? 'yesno-toggle--full-width' : '',
      disabled ? 'yesno-toggle--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        id={id}
        style={style}
        className={containerClass}
      >
        {label && (
          <label className="yesno-toggle__label">
            {label}
          </label>
        )}

        <div className="yesno-toggle__wrapper">
          <button
            type="button"
            className={`yesno-toggle__button ${
              currentValue
                ? 'yesno-toggle__button--active'
                : ''
            }`}
            onClick={() => handleToggle(true)}
            disabled={disabled}
          >
            {yesLabel}
          </button>

          <button
            type="button"
            className={`yesno-toggle__button ${
              !currentValue
                ? 'yesno-toggle__button--active'
                : ''
            }`}
            onClick={() => handleToggle(false)}
            disabled={disabled}
          >
            {noLabel}
          </button>
        </div>
      </div>
    );
  }
);

YesNoToggle.displayName = 'YesNoToggle';

export default YesNoToggle;