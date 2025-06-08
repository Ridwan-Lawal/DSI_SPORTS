import { z } from "zod";

export const ContactFormSchema = z.object({
  emailToContact: z
    .string()
    .min(1, { message: "Please select an email to contact!" }),

  summary: z
    .string()
    .min(1, { message: "Please enter an email summary." })
    .max(255, { message: "Please enter a valid email summary." }),

  message: z
    .string()
    .min(1, { message: "Please write a valid message." })
    .max(3000, { message: "Your message cannot exceed 3000 characters" }),

  name: z
    .string()
    .min(1, { message: "Please enter an email summary." })
    .max(255, { message: "Please enter a valid email summary." }),

  email: z
    .string()
    .min(1, { message: "Please enter an email summary." })
    .max(355, { message: "Please enter a valid email summary." }),
});
