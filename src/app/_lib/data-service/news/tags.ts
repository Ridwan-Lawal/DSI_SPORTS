import { NEWS_PER_PAGE } from "@/src/app/_utils/constant";
import { db } from "@/src/db";
import { posts } from "@/src/db/schema/article";
import { and, arrayOverlaps, count, desc, eq } from "drizzle-orm";

export async function getPostsCountByTag(tag: string) {
  try {
    const postsCount = await db
      .select({ count: count() })
      .from(posts)
      .where(
        and(arrayOverlaps(posts.tags, [tag]), eq(posts.status, "published")),
      );

    return postsCount;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function getPostsByTag(tag: string, pageNo: string) {
  try {
    const articlesByTag = await db.query.posts.findMany({
      where: and(
        eq(posts.status, "published"),
        arrayOverlaps(posts.tags, [tag.toLowerCase()]),
      ),
      orderBy: desc(posts?.publishedAt),
      limit: NEWS_PER_PAGE,
      offset: (+pageNo - 1) * NEWS_PER_PAGE,
      with: {
        author: true,
      },
    });

    return articlesByTag;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
