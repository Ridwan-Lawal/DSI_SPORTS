import { db } from "@/src/db";
import { categories, posts } from "@/src/db/schema/article";
import { and, desc, eq } from "drizzle-orm";
import { cache } from "react";

export const getAllArticles = cache(async function () {
  try {
    const articles = await db
      .select({
        id: posts?.id,
        slug: posts?.slug,
        updatedAt: posts?.updatedAt,
        createdAt: posts?.createdAt,
        tags: posts?.tags,
      })
      .from(posts)
      .where(eq(posts?.status, "published"));

    return articles;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
  }
});

export const getArticlesCategory = cache(async function () {
  try {
    const articleCategories = await db
      .select({ id: categories?.id, category: categories?.category })
      .from(categories);

    return articleCategories;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
  }
});

export const getHomeArticles = cache(async function (category?: string) {
  try {
    let dbQuery;

    if (!category) {
      dbQuery = db.query.posts.findMany({
        columns: {
          id: true,
          slug: true,
          publishedAt: true,
          featuredImage: true,
          title: true,
          category: true,
          excerpt: true,
          authorId: true,
        },
        where: eq(posts.status, "published"),
        orderBy: desc(posts?.publishedAt),
        with: {
          author: {
            columns: {
              name: true,
              image: true,
            },
          },
        },
      });
    }

    if (category === "premier league") {
      dbQuery = db.query.posts.findMany({
        columns: {
          id: true,
          slug: true,
          publishedAt: true,
          featuredImage: true,
          title: true,
          category: true,
          excerpt: true,
          authorId: true,
        },
        where: and(
          eq(posts.status, "published"),
          eq(posts.category, "premier league"),
        ),
        orderBy: desc(posts.publishedAt),
        with: {
          author: {
            columns: {
              name: true,
              image: true,
            },
          },
        },
      });
    }

    if (category === "transfer") {
      dbQuery = db.query.posts.findMany({
        columns: {
          id: true,
          slug: true,
          publishedAt: true,
          featuredImage: true,
          title: true,
          category: true,
          excerpt: true,
          authorId: true,
        },
        where: and(
          eq(posts.status, "published"),
          eq(posts.category, "transfer"),
        ),
        orderBy: desc(posts?.publishedAt),
        with: {
          author: {
            columns: {
              name: true,
              image: true,
            },
          },
        },
      });
    }

    const articles = await dbQuery;

    return articles;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
  }
});
