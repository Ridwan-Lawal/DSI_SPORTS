import { z } from "zod";

export const ResetPassword = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be 8 or more characters!" })
      .max(100, { message: "Password cannot exceed 100 characters!" })
      .regex(/[a-zA-z]/, {
        message: "Password must contain at least one letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least a number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character.",
      })
      .trim(),

    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password." })
      .trim(),
  })
  .refine((data) => data.confirmPassword === data.newPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export const ForgotPassword = z.object({
  email: z
    .string()
    .email({ message: "Please fill in a valid email address!" })
    .max(255, { message: "Please fill in a valid email address!" })
    .min(1, { message: "Please enter a valid email address!" }),
});

export const CreateNewPassword = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be 8 or more characters!" })
      .max(100, { message: "Password cannot exceed 100 characters!" })
      .regex(/[a-zA-z]/, {
        message: "Password must contain at least one letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least a number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character.",
      })
      .trim(),

    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password." })
      .trim(),
  })
  .refine((data) => data.confirmPassword === data.newPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please fill in a valid email address!" })
    .max(255, { message: "Please fill in a valid email address!" })
    .min(1, { message: "Please enter a valid email address!" }),

  password: z
    .string()
    .min(1, { message: "Please fill in a password!" })
    .max(255, { message: "Please fill in a valid password" }),
});
