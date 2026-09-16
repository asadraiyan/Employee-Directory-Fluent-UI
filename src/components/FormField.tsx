import { ReactNode } from "react";
import { Field } from "@fluentui/react-components";

interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <Field
      label={label}
      validationState={error ? "error" : "none"}
      validationMessage={error}
    >
      {children}
    </Field>
  );
}
