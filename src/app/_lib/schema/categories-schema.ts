import { z } from "zod";

export const categorySchema = z
  .object({
    id: z.string(),
    createdAt: z.string(),
    category: z.string(),
  })
  .strict();

export const categoryDataSchema = z.object({
  success: z.boolean(),
  data: z.array(categorySchema),
});

export type categoryDataSchemaType = z.infer<typeof categoryDataSchema>;

export type CategorySchemaType = z.infer<typeof categorySchema>;
