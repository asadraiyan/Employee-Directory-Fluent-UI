export type Gender = "Male" | "Female" | "Other";

export interface EmployeeFormValues {
  tab1: {
    name: string;
    age: string;
    gender: Gender;
  };
  tab2: {
    email: string;
    phone: string;
    address: string;
    contactMethod: "Email" | "Phone" | "Teams";
  };
  tab3: {
    department: string;
    role: string;
    state: string;
    city: string;
  };
}

export interface Employee extends EmployeeFormValues {
  id: number;
  status: "Active" | "Inactive";
}

export type EmployeeCreatePayload = Omit<Employee, "id">;
