import { NEWS_PER_PAGE } from "@/src/app/_utils/constant";
import { db } from "@/src/db";
import { posts } from "@/src/db/schema/article";
import { and, arrayOverlaps, count, desc, eq, ilike, or } from "drizzle-orm";

export async function getPostBySearchCount(searchValue: string | undefined) {
  let dbQuery;

  if (searchValue) {
    dbQuery = db
      .select({ count: count() })
      .from(posts)
      .where(
        and(
          or(
            ilike(posts.title, `%${searchValue}%`),
            arrayOverlaps(posts.tags, [searchValue.toLowerCase()]),
          ),
          eq(posts.status, "published"),
        ),
      );
  }

  try {
    const postsBySearchCount = await dbQuery;

    return postsBySearchCount;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
  }
}

export async function getPostsBySearchValue(
  searchValue: string | undefined,
  pageNo: string,
) {
  let dbQuery;

  if (searchValue) {
    dbQuery = db.query.posts.findMany({
      where: and(
        or(
          ilike(posts.title, `%${searchValue}%`),
          arrayOverlaps(posts.tags, [searchValue.toLowerCase()]),
        ),
        eq(posts.status, "published"),
      ),
      orderBy: desc(posts.publishedAt),
      limit: NEWS_PER_PAGE,
      offset: (+pageNo - 1) * NEWS_PER_PAGE,
      with: {
        author: true,
      },
    });
  }

  try {
    const postsBySearch = await dbQuery;
    return postsBySearch;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
