import {
  categoryDataSchema,
  categoryDataSchemaType,
  CategorySchemaType,
} from "@/src/app/_lib/schema/categories-schema";
import { userErrorMessageForGet } from "@/src/app/_lib/userErrorMessages";
import axios from "@_lib/axios";
import { AxiosError } from "axios";

export async function getCategories(): Promise<CategorySchemaType[]> {
  try {
    const res = await axios.get<categoryDataSchemaType>(`/api/categories`);

    const validatingRes = categoryDataSchema.safeParse(res?.data);

    if (!validatingRes?.success) {
      if (process.env.NODE_ENV === "development") {
        const typeErrors = validatingRes?.error.flatten();

        throw new Error(
          `Invalid types for categories: ${typeErrors?.fieldErrors?.data?.at(0)}, please update your types`,
        );
      }
    }

    return res?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (process.env.NODE_ENV === "development") {
        console.log("categories (GET):", error);
      }

      if (error?.response) {
        const errorMessage = userErrorMessageForGet(error?.response?.status);

        throw new Error(errorMessage);
      }
      if (error?.response) {
        throw new Error("Please connect to the internet");
      }
    }
    throw error;
  }
}
