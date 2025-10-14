import { db } from "@/src/db";
import { posts } from "@/src/db/schema/article";
import { and, desc, eq, ne } from "drizzle-orm";
import { cache } from "react";

export async function getMostRecentPosts(currentPostSlug: string) {
  try {
    const recentPosts = await db.query.posts.findMany({
      where: and(
        eq(posts?.status, "published"),
        ne(posts?.slug, currentPostSlug),
      ),
      orderBy: desc(posts?.publishedAt),
      limit: 5,
      with: {
        author: true,
      },
    });

    return recentPosts;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export const getArticleBySlug = cache(async function (slug: string) {
  try {
    const article = await db.query.posts.findFirst({
      where: eq(posts?.slug, slug),
      with: {
        author: true,
      },
    });

    return article;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
});
