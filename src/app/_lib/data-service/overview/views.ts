import { getUser } from "@/src/app/_utils/get-session";
import { db } from "@/src/db";
import { posts } from "@/src/db/schema/article";
import { desc } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function getPopularArticles() {
  const user = await getUser();
  if (!user || !user?.id) {
    redirect("/auth/admin/login");
  }

  try {
    const popularArticles = await db
      .select({
        id: posts?.id,
        title: posts?.title,
        views: posts?.views,
        slug: posts?.slug,
      })
      .from(posts)
      .orderBy(desc(posts?.views))
      .limit(5);

    return popularArticles;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
  }
}
