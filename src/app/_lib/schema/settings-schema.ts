import { z } from "zod";

export const PasswordSettingsSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Please fill in your current password!" }),
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

    confirmNewPassword: z
      .string()
      .min(1, { message: "Please confirm your password." })
      .trim(),
  })
  .refine((data) => data.confirmNewPassword === data.newPassword, {
    message: "Passwords do not match!",
    path: ["confirmNewPassword"],
  });

export const EmailSchema = z.object({
  email: z
    .string()
    .email({ message: "Please fill in a valid email address." })
    .min(1, { message: "Please input your email address." })
    .max(200, { message: "Please enter a valid email address." }),
});

export const SocialMediaSchema = z.object({
  X: z
    .string()
    .url({ message: "Please enter a valid url." })
    .max(150, { message: "Please enter a valid url." })
    .optional()
    .or(z.literal("")),

  instagram: z
    .string()
    .url({ message: "Please enter a valid url." })
    .max(150, { message: "Please enter a valid url." })
    .optional()
    .or(z.literal("")),

  whatsapp: z
    .string()
    .url({ message: "Please enter a valid url." })
    .max(150, { message: "Please enter a valid url." })
    .optional()
    .or(z.literal("")),
});

export const ProfileSettingsSchema = z.object({
  avatarUrl: z.string().min(1, {
    message: "Image could not be converted to a url. Try uploading again. ",
  }),
  avatar: z.object({
    size: z.number().gt(0, { message: "Please upload an avatar." }),
  }),
  displayName: z
    .string()
    .min(1, { message: "Please set your display name." })
    .max(255, { message: "Please enter a valid name." }),
  bio: z.string().min(1, {
    message: "Please create a memorable bio, even if it's a short one :)",
  }),
});
