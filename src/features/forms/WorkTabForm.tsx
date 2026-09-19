import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import {
  Dropdown,
  Input,
  makeStyles,
  Option,
} from "@fluentui/react-components";
import { City, State } from "country-state-city";

const useStyles = makeStyles({
  formStack: {
    width: "min(520px, 100%)",
  },
  locationListbox: {
    maxHeight: "240px",
    overflowY: "auto",
  },
});
import type { EmployeeFormValues } from "../../types/employee";
import { FormField } from "../../components/FormField";

interface Props {
  control: Control<EmployeeFormValues>;
  errors: FieldErrors<EmployeeFormValues>;
  setValue: UseFormSetValue<EmployeeFormValues>;
}

const indianStates = State.getStatesOfCountry("IN");

export function WorkTabForm({ control, errors, setValue }: Props) {
  const styles = useStyles();
  const tabErrors = errors.tab3;
  const selectedStateName = useWatch({ control, name: "tab3.state" });
  const selectedState = indianStates.find(
    (state) => state.name === selectedStateName
  );
  const cities = selectedState
    ? City.getCitiesOfState("IN", selectedState.isoCode)
    : [];

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

      <Controller
        name="tab3.state"
        control={control}
        render={({ field }) => (
          <FormField label="State" error={tabErrors?.state?.message as string}>
            <Dropdown
              placeholder="Select state"
              value={field.value ?? ""}
              selectedOptions={field.value ? [field.value] : []}
              inlinePopup
              positioning="below"
              listbox={{ className: styles.locationListbox }}
              onOptionSelect={(_, data) => {
                const state = data.optionValue ?? data.optionText ?? "";
                setValue("tab3.state", state, {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                });
                setValue("tab3.city", "", {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
            >
              {indianStates.map((state) => (
                <Option key={state.isoCode} value={state.name}>
                  {state.name}
                </Option>
              ))}
            </Dropdown>
          </FormField>
        )}
      />

      <Controller
        name="tab3.city"
        control={control}
        render={({ field }) => (
          <FormField label="City" error={tabErrors?.city?.message as string}>
            <Dropdown
              placeholder={selectedState ? "Select city" : "Select state first"}
              value={field.value ?? ""}
              selectedOptions={field.value ? [field.value] : []}
              disabled={!selectedState}
              inlinePopup
              positioning="below"
              listbox={{ className: styles.locationListbox }}
              onOptionSelect={(_, data) => {
                const city = data.optionValue ?? data.optionText ?? "";
                setValue("tab3.city", city, {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                });
              }}
            >
              {cities.map((city) => (
                <Option key={city.name} value={city.name}>
                  {city.name}
                </Option>
              ))}
            </Dropdown>
          </FormField>
        )}
      />
    </div>
  );
}
