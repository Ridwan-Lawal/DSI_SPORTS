// Not cached - render dynamically
// Not called multiple times - so no

import { ARTICLES_PER_PAGE } from "@/src/app/_utils/constant";
import { getUser } from "@/src/app/_utils/get-session";
import { db } from "@/src/db";
import { posts } from "@/src/db/schema/article";
import { eq, ilike, or } from "drizzle-orm";
import { redirect } from "next/navigation";
import { cache } from "react";

export async function getArticleById(articleToEditId: string | undefined) {
  const user = await getUser();
  if (!user || !user?.id) {
    redirect("/auth/admin/login");
  }

  if (articleToEditId) {
    try {
      const articleToEdit = await db
        .select()
        .from(posts)
        .where(eq(posts?.id, articleToEditId));

      return articleToEdit;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error?.message);
      }
    }
  }
}

export const getArticles = cache(async function ({
  status,
  search,
  page,
}: {
  status?: string;
  search?: string;
  page?: string;
}) {
  // check if the user trying to call the server action is a logged in user
  const user = await getUser();
  if (!user || !user?.id) {
    redirect("/auth/admin/login");
  }

  let dbQuery = db.select().from(posts);

  if (status && status !== "all") {
    dbQuery = dbQuery.where(
      eq(posts.status, status as "published" | "draft"),
    ) as typeof dbQuery;
  } else if (search) {
    dbQuery = dbQuery.where(
      or(
        ilike(posts.title, `%${search}%`),
        ilike(posts.category, `%${search}%`),
      ),
    ) as typeof dbQuery;
  } else if (page) {
    const offset = (+page - 1) * 1 * 10;
    dbQuery = dbQuery.limit(ARTICLES_PER_PAGE).offset(offset) as typeof dbQuery;
  }

  try {
    const postsData = await dbQuery;

    return postsData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
  }
});
// build the pagination
