import { createTableColumn } from "@fluentui/react-components";
import type { Employee } from "../../types/employee";

export const employeeColumns = [
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
    columnId: "state",
    renderHeaderCell: () => "State",
    renderCell: (employee) => employee.tab3.state,
  }),
  createTableColumn<Employee>({
    columnId: "city",
    renderHeaderCell: () => "City",
    renderCell: (employee) => employee.tab3.city,
  }),
  createTableColumn<Employee>({
    columnId: "status",
    renderHeaderCell: () => "Status",
    renderCell: (employee) => employee.status,
  }),
];
