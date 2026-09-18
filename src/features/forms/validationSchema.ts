import { z } from "zod";

export const employeeFormSchema = z.object({
  tab1: z.object({
    name: z
      .string()
      .min(1, "Full name is required.")
      .min(2, "Enter at least 2 characters."),
    age: z
      .string()
      .min(1, "Birth date is required.")
      .refine((value) => {
        const birthDate = new Date(value);
        return !isNaN(birthDate.getTime());
      }, "Please enter a valid birth date.")
      .refine((value) => {
        const birthDate = new Date(value);
        const today = new Date();

        return birthDate <= today;
      }, "Birth date cannot be in the future."),
    gender: z.enum(["Male", "Female", "Other"], {
      error: "Please select gender.",
    }),
  }),
  tab2: z.object({
    email: z
      .string()
      .min(1, "Email is required.")
      .email("Enter a valid email address."),
    phone: z
      .string()
      .min(1, "Phone is required.")
      .regex(/^\d{10}$/, "Enter a valid 10-digit phone number."),
    address: z.string().min(1, "Address is required."),
    contactMethod: z.enum(["Email", "Phone", "Teams"], {
      error: "Please select a contact method.",
    }),
  }),
  tab3: z.object({
    department: z.string().min(1, "Please select a department."),
    role: z.string().min(1, "Role is required."),
  }),
});
