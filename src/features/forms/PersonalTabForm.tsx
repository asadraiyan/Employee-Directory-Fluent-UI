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
import { DatePicker } from "@fluentui/react-datepicker-compat";

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
        render={({ field }) => {
          const dateValue =
            typeof field.value === "string" && field.value
              ? new Date(field.value)
              : null;

          return (
            <FormField label="Birth date" error={tabErrors?.age?.message as string}>
              <DatePicker
                placeholder="Select birth date..."
                value={dateValue}
                onSelectDate={(date) => {
                  console.log("Selected date:", date);
                  if (date) {
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const day = String(date.getDate()).padStart(2, "0");

                    field.onChange(`${year}-${month}-${day}`);
                  } else {
                    field.onChange("");
                  }
                }}
                maxDate={new Date()}
              />
            </FormField>
          );
        }}
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
