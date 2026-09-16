import { Control, Controller, FieldErrors } from "react-hook-form";
import {
  Input,
  makeStyles,
  Radio,
  RadioGroup,
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

export function PersonalTabForm({ control, errors }: Props) {
  const styles = useStyles();
  const tabErrors = errors.tab1;

  return (
    <div className={styles.formStack}>
      <Controller
        name="tab1.name"
        control={control}
        render={({ field }) => (
          <FormField label="Full name" error={tabErrors?.name?.message as string}>
            <Input {...field} value={field.value ?? ""} />
          </FormField>
        )}
      />

      <Controller
        name="tab1.age"
        control={control}
        render={({ field }) => (
          <FormField label="Age" error={tabErrors?.age?.message as string}>
            <Input
              {...field}
              value={field.value ?? ""}
              type="number"
              min={18}
              max={100}
            />
          </FormField>
        )}
      />

      <Controller
        name="tab1.gender"
        control={control}
        render={({ field }) => (
          <FormField
            label="Gender"
            error={tabErrors?.gender?.message as string}
          >
            <RadioGroup
              value={field.value}
              onChange={(_, data) => field.onChange(data.value)}
            >
              <Radio value="Male" label="Male" />
              <Radio value="Female" label="Female" />
              <Radio value="Other" label="Other" />
            </RadioGroup>
          </FormField>
        )}
      />
    </div>
  );
}
