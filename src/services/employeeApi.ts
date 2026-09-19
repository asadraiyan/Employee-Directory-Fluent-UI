import type { Employee, EmployeeCreatePayload } from "../types/employee";

const API_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

export async function createEmployee(
  payload: EmployeeCreatePayload
): Promise<Employee> {
  if (API_URL) {
    const response = await fetch(`${API_URL}/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Unable to create employee.");
    }

    return (await response.json()) as Employee;
  }

  await new Promise((resolve) => setTimeout(resolve, 700));

  return {
    ...payload,
    id: Date.now()
  };
}

export async function updateEmployee(
  id: number,
  payload: EmployeeCreatePayload
): Promise<Employee> {
  if (API_URL) {
    const response = await fetch(`${API_URL}/employees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Unable to update employee.");
    }

    return (await response.json()) as Employee;
  }

  await new Promise((resolve) => setTimeout(resolve, 700));

  return {
    ...payload,
    id,
  };
}
