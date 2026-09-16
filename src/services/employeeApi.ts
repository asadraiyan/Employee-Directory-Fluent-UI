import type { Employee, EmployeeCreatePayload } from "../types/employee";

const API_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

/**
 * If VITE_API_BASE_URL is configured, this calls the real backend.
 * Otherwise it uses a small mock async API so the application works immediately.
 */
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
    id: Date.now(),
  };
}
