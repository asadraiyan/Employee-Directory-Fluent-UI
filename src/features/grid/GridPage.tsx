import {
  Input,
  Dropdown,
  Option,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  makeStyles,
  Text,
} from "@fluentui/react-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateEmployeeMeta } from "../employee/employeeSlice";
import type { Location } from "../../types/employee";

const locations: Location[] = ["Noida", "Gurgaon", "Bangalore", "Hyderabad"];

const useStyles = makeStyles({
  section: {
    marginTop: "58px",
  },
  tableScroll: {
    overflowX: "auto",
  },
  employeeTable: {
    minWidth: "1060px",
  },
  emptyState: {
    padding: "18px",
    color: "#616161",
  },
});

export function GridPage() {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const employees = useAppSelector((state) => state.employees.items);

  return (
    <section className={styles.section}>
      <Text as="h2" size={500} weight="bold">Table Grid</Text>
      <div className={styles.tableScroll}>
        <Table className={styles.employeeTable} aria-label="Employee directory">
          <TableHeader>
            <TableRow>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Department</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Location</TableHeaderCell>
              <TableHeaderCell>Notes</TableHeaderCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <div className={styles.emptyState}>No employees found.</div>
                </TableCell>
              </TableRow>
            ) : (
              employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.tab1.name}</TableCell>
                  <TableCell>{employee.tab3.role}</TableCell>
                  <TableCell>{employee.tab2.email}</TableCell>
                  <TableCell>{employee.tab3.department}</TableCell>
                  <TableCell>{employee.status}</TableCell>
                  <TableCell>
                    <Dropdown
                      aria-label={`Location for ${employee.tab1.name}`}
                      placeholder="Select"
                      selectedOptions={
                        employee.location ? [employee.location] : []
                      }
                      onOptionSelect={(_, data) =>
                        dispatch(
                          updateEmployeeMeta({
                            id: employee.id,
                            location: (data.optionValue ?? "") as Location,
                          })
                        )
                      }
                    >
                      {locations.map((location) => (
                        <Option key={location} value={location}>
                          {location}
                        </Option>
                      ))}
                    </Dropdown>
                  </TableCell>
                  <TableCell>
                    <Input
                      value={employee.notes}
                      aria-label={`Notes for ${employee.tab1.name}`}
                      onChange={(_, data) =>
                        dispatch(
                          updateEmployeeMeta({
                            id: employee.id,
                            notes: data.value,
                          })
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
