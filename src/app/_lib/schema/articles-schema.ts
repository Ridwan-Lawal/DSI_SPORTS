import { z } from "zod";

export const PublishArticleSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Please fill in your article title!" })
    .max(200, { message: "Your article title cannot exceed 200 characters." }),
  excerpt: z
    .string()
    .min(1, { message: "Please fill in your article excerpt!" })
    .max(200, { message: "Your article title cannot exceed 180 characters." }),
  content: z.string().min(1, { message: "Please write an article." }),
  category: z.string().min(1, { message: "Please select a category." }),

  tags: z
    .string()
    .min(1, { message: "Please fill in your article tags!" })
    .max(150, { message: "Your article title cannot exceed 150 characters." }),

  // featuredImage: z.string().min(1, "Enter a featured image"),

  featuredImage: z.object({
    size: z.number().gt(0, { message: "Please upload a valid feature image." }),
  }),
  featuredImageLink: z
    .string()
    .min(1, { message: "Image could not be converted to a url." }),
  seoTitle: z.optional(z.string()),
  seoDescription: z.optional(z.string()),
});
