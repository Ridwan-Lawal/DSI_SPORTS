import { posts } from "@/src/db/schema/article";
import { InferSelectModel } from "drizzle-orm";

export type Article = InferSelectModel<typeof posts>;
