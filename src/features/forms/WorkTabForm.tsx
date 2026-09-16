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

export function WorkTabForm({ control, errors }: Props) {
  const styles = useStyles();
  const tabErrors = errors.tab3;

  return (
    <div className={styles.formStack}>
      <Controller
        name="tab3.department"
        control={control}
        render={({ field }) => (
          <FormField
            label="Department"
            error={tabErrors?.department?.message as string}
          >
            <Dropdown
              placeholder="Select department"
              selectedOptions={field.value ? [field.value] : []}
              onOptionSelect={(_, data) =>
                field.onChange(data.optionValue ?? "")
              }
            >
              <Option value="Engineering">Engineering</Option>
              <Option value="Design">Design</Option>
              <Option value="QA">QA</Option>
              <Option value="Product">Product</Option>
              <Option value="HR">HR</Option>
            </Dropdown>
          </FormField>
        )}
      />

      <Controller
        name="tab3.role"
        control={control}
        render={({ field }) => (
          <FormField label="Role" error={tabErrors?.role?.message as string}>
            <Input {...field} value={field.value ?? ""} />
          </FormField>
        )}
      />
    </div>
  );
}
