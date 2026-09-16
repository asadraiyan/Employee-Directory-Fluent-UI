import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Employee, Location } from "../../types/employee";

type EmployeeState = {
  items: Employee[];
};

const initialState: EmployeeState = {
  items: [
    {
      id: 1,
      tab1: { name: "Alice Johnson", age: "29", gender: "Female" },
      tab2: {
        email: "alice@example.com",
        phone: "9876543210",
        address: "Noida",
        contactMethod: "Email",
      },
      tab3: { department: "Engineering", role: "Developer" },
      status: "Active",
      location: "",
      notes: "Available",
    },
    {
      id: 2,
      tab1: { name: "Bob Smith", age: "31", gender: "Male" },
      tab2: {
        email: "bob@example.com",
        phone: "9876543211",
        address: "Gurgaon",
        contactMethod: "Teams",
      },
      tab3: { department: "Design", role: "Designer" },
      status: "Active",
      location: "",
      notes: "Prefers mornings",
    },
    {
      id: 3,
      tab1: { name: "Carol Lee", age: "28", gender: "Female" },
      tab2: {
        email: "carol@example.com",
        phone: "9876543212",
        address: "Bangalore",
        contactMethod: "Phone",
      },
      tab3: { department: "Design", role: "Designer" },
      status: "Active",
      location: "",
      notes: "Prefers afternoons",
    },
  ],
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.items.push(action.payload);
    },
    updateEmployeeMeta: (
      state,
      action: PayloadAction<{
        id: number;
        location?: Location;
        notes?: string;
      }>
    ) => {
      const employee = state.items.find((item) => item.id === action.payload.id);
      if (!employee) return;

      if (action.payload.location !== undefined) {
        employee.location = action.payload.location;
      }
      if (action.payload.notes !== undefined) {
        employee.notes = action.payload.notes;
      }
    },
  },
});

export const { addEmployee, updateEmployeeMeta } = employeeSlice.actions;
export default employeeSlice.reducer;
