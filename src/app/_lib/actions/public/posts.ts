"use server";

import { db } from "@/src/db";
import { posts, postViews } from "@/src/db/schema/article";
import { and, eq, sql } from "drizzle-orm";
import { headers } from "next/headers";

export async function storeViewsAction(slug: string) {
  const headersList = await headers();
  const realIp = headersList.get("x-real-ip");
  const forwardedFor = headersList.get("x-forwarded-for");
  const clientIP = forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";

  try {
    const postAlreadyViewed = await db
      .select()
      .from(postViews)
      .where(and(eq(postViews.userIP, clientIP), eq(postViews.postSlug, slug)));

    if (!postAlreadyViewed?.length) {
      await db.insert(postViews).values({ postSlug: slug, userIP: clientIP });

      await db
        .update(posts)
        .set({ views: sql`${posts.views} + 1` })
        .where(eq(posts.slug, slug));
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
