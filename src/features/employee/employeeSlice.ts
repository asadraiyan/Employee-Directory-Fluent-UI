import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Employee } from "../../types/employee";

type EmployeeState = {
  items: Employee[];
};

const initialState: EmployeeState = {
  items: [
    {
      id: 1,
      tab1: { name: "John Doe", age: "1996-05-14", gender: "Male" },
      tab2: {
        email: "john@example.com",
        phone: "9876543210",
        address: "Noida",
        contactMethod: "Email",
      },
      tab3: {
        department: "Engineering",
        role: "Developer",
        state: "Uttar Pradesh",
        city: "Noida",
      },
      status: "Active",
    },
    {
      id: 2,
      tab1: { name: "James Smith", age: "1994-09-22", gender: "Male" },
      tab2: {
        email: "james@example.com",
        phone: "9876543211",
        address: "Gurgaon",
        contactMethod: "Phone",
      },
      tab3: {
        department: "Design",
        role: "Designer",
        state: "Haryana",
        city: "Gurugram",
      },
      status: "Active",
    },
    {
      id: 3,
      tab1: { name: "Emily Johnson", age: "1997-02-08", gender: "Female" },
      tab2: {
        email: "emily@example.com",
        phone: "9876543212",
        address: "Bangalore",
        contactMethod: "Email",
      },
      tab3: {
        department: "Design",
        role: "Designer",
        state: "Karnataka",
        city: "Bengaluru Urban",
      },
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
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.items.findIndex(
        (employee) => employee.id === action.payload.id
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { addEmployee, updateEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
