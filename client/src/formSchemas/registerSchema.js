// Zod schema for validation
import * as z from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .transform((val) => val.toLowerCase()), // Convert email to lowercase
  password: z.string().min(6, "Password must be at least 6 characters"),
});
