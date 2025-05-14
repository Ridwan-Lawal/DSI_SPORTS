import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as authSchema from "./schema/auth";

import * as articleSchema from "./schema/article";

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL!);

export const db = drizzle(sql, {
  schema: {
    ...authSchema,
    ...articleSchema,
  },
});
