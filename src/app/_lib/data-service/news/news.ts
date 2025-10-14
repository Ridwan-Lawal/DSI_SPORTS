import { NEWS_PER_PAGE } from "@/src/app/_utils/constant";
import { db } from "@/src/db";
import { posts } from "@/src/db/schema/article";
import { and, count, desc, eq } from "drizzle-orm";

export async function getNews(category: string | undefined, pageNo: string) {
  let dbQuery;

  if (!category && pageNo) {
    dbQuery = db.query.posts.findMany({
      where: eq(posts?.status, "published"),
      orderBy: desc(posts?.publishedAt),
      with: {
        author: true,
      },
      limit: NEWS_PER_PAGE,
      offset: (+pageNo - 1) * NEWS_PER_PAGE,
    });
  }

  if (category && pageNo) {
    dbQuery = db.query.posts.findMany({
      where: and(eq(posts?.status, "published"), eq(posts?.category, category)),
      orderBy: desc(posts?.publishedAt),
      with: {
        author: true,
      },
      limit: NEWS_PER_PAGE,
      offset: (+pageNo - 1) * NEWS_PER_PAGE,
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

    return postByCategoryCount;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
  }
}
