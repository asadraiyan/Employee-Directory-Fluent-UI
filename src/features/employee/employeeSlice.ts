import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Employee } from "../../types/employee";

type EmployeeState = {
  items: Employee[];
};

const initialState: EmployeeState = {
  items: [
    {
      id: 1,
      tab1: { name: "John Doe", age: "29", gender: "Male" },
      tab2: {
        email: "john@example.com",
        phone: "9876543210",
        address: "Noida",
        contactMethod: "Email",
      },
      tab3: { department: "Engineering", role: "Developer" },
      status: "Active",
    },
    {
      id: 2,
      tab1: { name: "James Smith", age: "31", gender: "Male" },
      tab2: {
        email: "james@example.com",
        phone: "9876543211",
        address: "Gurgaon",
        contactMethod: "Teams",
      },
      tab3: { department: "Design", role: "Designer" },
      status: "Active",
    },
    {
      id: 3,
      tab1: { name: "Emily Johnson", age: "28", gender: "Female" },
      tab2: {
        email: "emily@example.com",
        phone: "9876543212",
        address: "Bangalore",
        contactMethod: "Phone",
      },
      tab3: { department: "Design", role: "Designer" },
      status: "Active",
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
  },
});

export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
