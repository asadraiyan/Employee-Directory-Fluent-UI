import { ReactNode } from "react";
import { Field } from "@fluentui/react-components";

interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactNode;
  required?: boolean;
}

export function FormField({ label, error, children, required = true }: FormFieldProps) {
  return (
    <Field
      label={label}
      required={required}
      validationState={error ? "error" : "none"}
      validationMessage={error}
    >
      {children}
    </Field>
  );
}
