"use server";

import { db } from "@/src/db";
import { posts, postViews } from "@/src/db/schema/article";
import bcrypt from "bcryptjs";
import { eq, sql } from "drizzle-orm";
import { headers } from "next/headers";

export async function storeViewsAction(slug: string) {
  const headersList = await headers();
  const realIp = headersList.get("x-real-ip");
  const forwardedFor = headersList.get("x-forwarded-for");
  const clientIP = forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";

  try {
    const views = await db.select().from(postViews);

    const postAlreadyViewed = views?.find(
      async (view) =>
        (await bcrypt.compare(clientIP, view?.userIP)) &&
        view?.postSlug === slug,
    );

    const hashedClientIp = await bcrypt.hash(clientIP, 10);

    if (!postAlreadyViewed) {
      await db
        .insert(postViews)
        .values({ postSlug: slug, userIP: hashedClientIp });

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
