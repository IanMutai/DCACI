import React from "react";

// ============================================================================
// Form Components
// ============================================================================

export interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
  error?: string;
}

export function FormField({ children, className = "", error }: FormFieldProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export interface FormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function FormLabel({
  children,
  required,
  className = "",
  ...props
}: FormLabelProps) {
  return (
    <label
      className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ hasError, className = "", ...props }, ref) => {
    const baseClasses =
      "block w-full rounded-md shadow-sm sm:text-sm transition-colors";
    const stateClasses = hasError
      ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
      : "border-gray-300 focus:ring-nctp-primary focus:border-nctp-primary";

    return (
      <input
        ref={ref}
        className={`${baseClasses} ${stateClasses} ${className}`}
        {...props}
      />
    );
  }
);

FormInput.displayName = "FormInput";

export interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const FormTextarea = React.forwardRef<
  HTMLTextAreaElement,
  FormTextareaProps
>(({ hasError, className = "", ...props }, ref) => {
  const baseClasses =
    "block w-full rounded-md shadow-sm sm:text-sm transition-colors";
  const stateClasses = hasError
    ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
    : "border-gray-300 focus:ring-nctp-primary focus:border-nctp-primary";

  return (
    <textarea
      ref={ref}
      className={`${baseClasses} ${stateClasses} ${className}`}
      {...props}
    />
  );
});

FormTextarea.displayName = "FormTextarea";

export interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ hasError, options, placeholder, className = "", ...props }, ref) => {
    const baseClasses =
      "block w-full rounded-md shadow-sm sm:text-sm transition-colors";
    const stateClasses = hasError
      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
      : "border-gray-300 focus:ring-nctp-primary focus:border-nctp-primary";

    return (
      <select
        ref={ref}
        className={`${baseClasses} ${stateClasses} ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }
);

FormSelect.displayName = "FormSelect";
