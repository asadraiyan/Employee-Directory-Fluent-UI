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
import { useAppSelector } from "../../app/hooks";
import type { Employee } from "../../types/employee";
import { employeeColumns } from "./employeeColumns";

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
});

export function GridPage() {
  const styles = useStyles();
  const employees = useAppSelector((state) => state.employees.items);

  return (
    <section className={styles.section}>
      <Text as="h2" size={500} weight="bold">Table Grid</Text>
      <div className={styles.tableScroll}>
        <DataGrid items={employees} columns={employeeColumns} className={styles.employeeTable} aria-label="Employee directory">
          <DataGridHeader>
            <DataGridRow>
              {({ renderHeaderCell }) => (
                <DataGridHeaderCell className={styles.heading}> {renderHeaderCell()}</DataGridHeaderCell>
              )}
            </DataGridRow>
          </DataGridHeader>
          <DataGridBody<Employee>>
            {({ item, rowId }) => (
              <DataGridRow<Employee> key={rowId}>
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
