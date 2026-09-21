import { Combobox, createTableColumn, makeStyles, Option } from "@fluentui/react-components";
import { City, State } from "country-state-city";
import type { Employee } from "../../types/employee";

const useStyles = makeStyles({
  locationListbox: {
    maxHeight: "240px",
    overflowY: "auto",
  },
  locationControl: {
    minWidth: "180px",
    marginInline: "6px",
  },
});

const indianStates = State.getStatesOfCountry("IN");

export const createEmployeeColumns = (
  onLocationChange: (employee: Employee) => void
) => {
  const styles = useStyles();

  return [
  createTableColumn<Employee>({
    columnId: "id",
    renderHeaderCell: () => "ID",
    renderCell: (employee) => String(employee.id % 100).padStart(2, "0"),
  }),
  createTableColumn<Employee>({
    columnId: "name",
    renderHeaderCell: () => "Name",
    renderCell: (employee) => employee.tab1.name,
  }),
  createTableColumn<Employee>({
    columnId: "role",
    renderHeaderCell: () => "Role",
    renderCell: (employee) => employee.tab3.role,
  }),
  createTableColumn<Employee>({
    columnId: "email",
    renderHeaderCell: () => "Email",
    renderCell: (employee) => employee.tab2.email,
  }),
  createTableColumn<Employee>({
    columnId: "department",
    renderHeaderCell: () => "Department",
    renderCell: (employee) => employee.tab3.department,
  }),
    createTableColumn<Employee>({
    columnId: "status",
    renderHeaderCell: () => "Status",
    renderCell: (employee) => employee.status,
  }),
  createTableColumn<Employee>({
    columnId: "state",
    renderHeaderCell: () => "State",
    renderCell: (employee) => (
      <div onClick={(event) => event.stopPropagation()}>
        <Combobox
          className={styles.locationControl}
          placeholder="Select state"
          value={employee.tab3.state}
          selectedOptions={employee.tab3.state ? [employee.tab3.state] : []}
          freeform={false}
          inlinePopup
          positioning="below"
          listbox={{ className: styles.locationListbox }}
          onOptionSelect={(_, data) => {
            onLocationChange({
              ...employee,
              tab3: {
                ...employee.tab3,
                state: data.optionValue ?? data.optionText ?? "",
                city: "",
              },
            });
          }}
        >
          {indianStates.map((state) => (
            <Option key={state.isoCode} value={state.name}>
              {state.name}
            </Option>
          ))}
        </Combobox>
      </div>
    ),
  }),
  createTableColumn<Employee>({
    columnId: "city",
    renderHeaderCell: () => "City",
    renderCell: (employee) => {
      const selectedState = indianStates.find(
        (state) => state.name === employee.tab3.state
      );
      const cities = selectedState
        ? City.getCitiesOfState("IN", selectedState.isoCode)
        : [];

      return (
        <div onClick={(event) => event.stopPropagation()}>
          <Combobox
            className={styles.locationControl}
            placeholder={selectedState ? "Select city" : "Select state first"}
            value={employee.tab3.city}
            selectedOptions={employee.tab3.city ? [employee.tab3.city] : []}
            freeform={false}
            disabled={!selectedState}
            inlinePopup
            positioning="below"
            listbox={{ className: styles.locationListbox }}
            onOptionSelect={(_, data) => {
              onLocationChange({
                ...employee,
                tab3: {
                  ...employee.tab3,
                  city: data.optionValue ?? data.optionText ?? "",
                },
              });
            }}
          >
            {cities.map((city) => (
              <Option key={city.name} value={city.name}>
                {city.name}
              </Option>
            ))}
          </Combobox>
        </div>
      );
    },
  }),
  ];
};
