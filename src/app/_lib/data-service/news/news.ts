import { NEWS_PER_POST } from "@/src/app/_utils/constant";
import { db } from "@/src/db";
import { posts } from "@/src/db/schema/article";
import { and, count, desc, eq } from "drizzle-orm";

export async function getNews(category: string | undefined, pageNo: string) {
  // 1. Ensure user is logged - This is a public page,

  // 2. Ensure data belongs to user - no mutations / public page,

  // 3. build the data and ensure input safety - no data to build

  // 4. Getting data....

  let dbQuery;

  if (!category && pageNo) {
    dbQuery = db.query.posts.findMany({
      where: eq(posts?.status, "published"),
      orderBy: desc(posts?.publishedAt),
      with: {
        author: true,
      },
      limit: NEWS_PER_POST,
      offset: (+pageNo - 1) * NEWS_PER_POST,
    });
  }

  if (category && pageNo) {
    dbQuery = db.query.posts.findMany({
      where: and(eq(posts?.status, "published"), eq(posts?.category, category)),
      orderBy: desc(posts?.publishedAt),
      with: {
        author: true,
      },
      limit: NEWS_PER_POST,
      offset: (+pageNo - 1) * NEWS_PER_POST,
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

export async function getPostsCountByCategory(category: string | undefined) {
  let dbQuery = db.select({ count: count() }).from(posts);

  if (category) {
    dbQuery = dbQuery.where(
      and(eq(posts?.category, category), eq(posts?.status, "published")),
    ) as typeof dbQuery;
  } else {
    dbQuery = dbQuery.where(eq(posts?.status, "published")) as typeof dbQuery;
  }

  try {
    const postByCategoryCount = await dbQuery;
    console.log(postByCategoryCount, "pageee");
    return postByCategoryCount;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
  }
}
