import { getUser } from "@/src/app/_utils/get-session";
import { db } from "@/src/db";
import { posts } from "@/src/db/schema/article";
import { desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import { cache } from "react";

export async function getRecentArticles() {
  const user = await getUser();
  if (!user || !user?.id) {
    redirect("/auth/admin/login");
  }

  try {
    const recentArticles = await db
      .select({
        id: posts?.id,
        title: posts?.title,
        publishedAt: posts?.publishedAt,
      })
      .from(posts)
      .orderBy(desc(posts?.publishedAt))
      .limit(5);
    return recentArticles;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
  }
}

export const getOverviewArticles = cache(async function () {
  const user = await getUser();
  if (!user || !user?.id) {
    redirect("/auth/admin/login");
  }

  //   mutation
  try {
    const articles = await db.select().from(posts);
    return articles;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
  }
});
