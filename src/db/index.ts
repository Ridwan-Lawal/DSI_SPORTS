import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as articleSchema from "./schema/article";
import * as authSchema from "./schema/auth";

const client = postgres(process.env.DATABASE_URL!);

export const db = drizzle(client, {
  schema: {
    ...authSchema,
    ...articleSchema,
  },
});
