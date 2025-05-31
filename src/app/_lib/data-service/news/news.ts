import { db } from "@/src/db";
import { posts } from "@/src/db/schema/article";
import { and, desc, eq } from "drizzle-orm";

export async function getNews(category: string | undefined) {
  // 1. Ensure user is logged - This is a public page,

  // 2. Ensure data belongs to user - no mutations / public page,

  // 3. build the data and ensure input safety - no data to build

  // 4. Getting data....

  let dbQuery;

  if (!category) {
    dbQuery = db.query.posts.findMany({
      where: eq(posts?.status, "published"),
      orderBy: desc(posts?.publishedAt),
      with: {
        author: true,
      },
    });
  }
  if (category) {
    dbQuery = db.query.posts.findMany({
      where: and(eq(posts?.status, "published"), eq(posts?.category, category)),
      orderBy: desc(posts?.publishedAt),
      with: {
        author: true,
      },
    });
  }

  try {
    const articles = await dbQuery;
    return articles;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
