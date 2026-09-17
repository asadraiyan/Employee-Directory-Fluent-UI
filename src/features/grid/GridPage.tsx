import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  makeStyles,
  Text,
} from "@fluentui/react-components";
import { useAppSelector } from "../../app/hooks";

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
            </TableRow>
          </TableHeader>

          <TableBody>
            {employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
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
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
