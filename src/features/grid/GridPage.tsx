import {
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  makeStyles,
  Text,
  tokens,
} from "@fluentui/react-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setSelectedEmployeeId } from "../forms/formsSlice";
import { updateEmployee } from "../employee/employeeSlice";
import type { Employee } from "../../types/employee";
import { createEmployeeColumns } from "./employeeColumn";

const useStyles = makeStyles({
  section: {
    marginTop: "58px",
    paddingTop: "28px",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  tableScroll: {
    overflowX: "auto",
  },
  employeeTable: {
    minWidth: "1060px",
    marginTop: "14px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    overflow: "hidden",
  },
  emptyState: {
    padding: "18px",
    color: tokens.colorNeutralForeground2,
  },
  heading: {
    fontWeight: "bold",
    color: tokens.colorBrandForeground1,
    backgroundColor: tokens.colorNeutralBackground3,
  },
  selectedRow: {
    backgroundColor: tokens.colorBrandBackground2,
    ":hover": {
      backgroundColor: tokens.colorBrandBackground2Hover,
    },
  },
  tableHeading: {
    color: tokens.colorBrandForeground1,
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
  const handleRowClick = (employeeId: number) => {
    dispatch(
      setSelectedEmployeeId(
        employeeId === selectedEmployeeId ? null : employeeId
      )
    );
  };

  return (
    <section className={styles.section}>
      <Text className={styles.tableHeading} as="h2" size={500} weight="bold">Table Grid</Text>
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
                onClick={() => handleRowClick(item.id)}
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
