import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../features/employee/employeeSlice";
import formsReducer from "../features/forms/formsSlice";

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    forms: formsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
