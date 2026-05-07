import React from 'react';
import '../FormInput/FormInput.scss';

interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, required, className = '', ...props }, ref) => {
    return (
      <div className={`form-input ${className}`}>
        {label && (
          <label className="form-input__label">
            {label}
            {required && <span className="form-input__required">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`form-input__input ${error ? 'form-input__input--error' : ''}`}
          {...props}
        />
        {error && <span className="form-input__error">{error}</span>}
        {helperText && !error && (
          <span className="form-input__helper">{helperText}</span>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
export default FormInput;
