import React from 'react';
import '../DatePicker/DatePicker.css';

export interface DateObject {
  day: number;
  month: number;
  year: number;
}

export interface DatePickerProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'size'
  > {
  value?: DateObject;
  onChange?: (date: DateObject | null) => void;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  fullWidth?: boolean;
  className?: string;
}

const formatDateToString = (
  date?: DateObject
): string => {
  if (!date) return '';

  const day = String(date.day).padStart(2, '0');
  const month = String(date.month).padStart(2, '0');

  return `${date.year}-${month}-${day}`;
};

const parseStringToDate = (
  value: string
): DateObject | null => {
  if (!value) return null;

  const [year, month, day] = value
    .split('-')
    .map(Number);

  return {
    day,
    month,
    year,
  };
};

const DatePicker = React.forwardRef<
  HTMLInputElement,
  DatePickerProps
>(
  (
    {
      value,
      onChange,
      label,
      size = 'medium',
      variant = 'primary',
      fullWidth = false,
      className = '',
      disabled,
      ...rest
    },
    ref
  ) => {
    const containerClass = [
      'datepicker',
      `datepicker--${size}`,
      `datepicker--${variant}`,
      fullWidth ? 'datepicker--full-width' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClass}>
        {label && (
          <label className="datepicker__label">
            {label}
          </label>
        )}

        <input
          ref={ref}
          type="date"
          className="datepicker__input"
          value={formatDateToString(value)}
          disabled={disabled}
          onChange={(e) =>
            onChange?.(
              parseStringToDate(e.target.value)
            )
          }
          {...rest}
        />
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;