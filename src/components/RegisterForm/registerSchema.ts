import * as z from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    age: z
      .number({ message: "Age must be a number" })
      .min(18, "You must be at least 18 years old")
      .max(100, "Age must be realistic"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

// Важливо: переконайтеся, що тип виглядає саме так
export type RegisterFormData = z.infer<typeof registerSchema>;
