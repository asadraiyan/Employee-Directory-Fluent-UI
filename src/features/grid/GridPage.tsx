import {
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  makeStyles,
  Text,
} from "@fluentui/react-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setSelectedEmployeeId } from "../forms/formsSlice";
import { updateEmployee } from "../employee/employeeSlice";
import type { Employee } from "../../types/employee";
import { createEmployeeColumns } from "./employeeColumn";

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
  heading: {
    fontWeight: "bold",
  },
  selectedRow: {
    backgroundColor: "#e8f3ff",
    ":hover": {
      backgroundColor: "#d9ebff",
    },
  },
});

export function GridPage() {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const employees = useAppSelector((state) => state.employees.items);
  const selectedEmployeeId = useAppSelector(
    (state) => state.forms.selectedEmployeeId
  );
  const columns = createEmployeeColumns((employee: Employee) => {
    dispatch(updateEmployee(employee));
  });

  return (
    <section className={styles.section}>
      <Text as="h2" size={500} weight="bold">Table Grid</Text>
      <div className={styles.tableScroll}>
        <DataGrid items={employees} columns={columns} className={styles.employeeTable} aria-label="Employee directory">
          <DataGridHeader>
            <DataGridRow>
              {({ renderHeaderCell }) => (
                <DataGridHeaderCell className={styles.heading}> {renderHeaderCell()}</DataGridHeaderCell>
              )}
            </DataGridRow>
          </DataGridHeader>
          <DataGridBody<Employee>>
            {({ item, rowId }) => (
              <DataGridRow<Employee>
                key={rowId}
                onClick={() => dispatch(setSelectedEmployeeId(item.id))}
                className={
                  item.id === selectedEmployeeId ? styles.selectedRow : undefined
                }
                style={{ cursor: "pointer" }}
              >
                {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
              </DataGridRow>
            )}
          </DataGridBody>
        </DataGrid>
        {employees.length === 0 && (
          <div className={styles.emptyState}>No employees found.</div>
        )}
      </div>
    </section>
  );
}
