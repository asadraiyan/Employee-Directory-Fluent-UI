import { Control, Controller, FieldErrors } from "react-hook-form";
import {
  Dropdown,
  Input,
  makeStyles,
  Option,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  formStack: {
    width: "min(520px, 100%)",
  },
});
import type { EmployeeFormValues } from "../../types/employee";
import { FormField } from "../../components/FormField";

interface Props {
  control: Control<EmployeeFormValues>;
  errors: FieldErrors<EmployeeFormValues>;
}

export function ContactTabForm({ control, errors }: Props) {
  const styles = useStyles();
  const tabErrors = errors.tab2;

  return (
    <div className={styles.formStack}>
      <Controller
        name="tab2.email"
        control={control}
        render={({ field }) => (
          <FormField label="Email" error={tabErrors?.email?.message as string}>
            <Input {...field} value={field.value ?? ""} type="email" />
          </FormField>
        )}
      />

      <Controller
        name="tab2.phone"
        control={control}
        render={({ field }) => (
          <FormField label="Phone" error={tabErrors?.phone?.message as string}>
            <Input {...field} value={field.value ?? ""} type="tel" />
          </FormField>
        )}
      />

      <Controller
        name="tab2.address"
        control={control}
        render={({ field }) => (
          <FormField
            label="Address"
            error={tabErrors?.address?.message as string}
          >
            <Input {...field} value={field.value ?? ""} />
          </FormField>
        )}
      />

      <Controller
        name="tab2.contactMethod"
        control={control}
        render={({ field }) => (
          <FormField
            label="Preferred contact method"
            error={tabErrors?.contactMethod?.message as string}
          >
            <Dropdown
              placeholder="Select contact method"
              selectedOptions={field.value ? [field.value] : []}
              onOptionSelect={(_, data) =>
                field.onChange(data.optionValue ?? "")
              }
            >
              <Option value="Email">Email</Option>
              <Option value="Phone">Phone</Option>
              <Option value="Teams">Teams</Option>
            </Dropdown>
          </FormField>
        )}
      />
    </div>
  );
}
