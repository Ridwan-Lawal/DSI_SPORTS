"use server";

import { db } from "@/src/db";
import { siteVisitors } from "@/src/db/schema/article";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function countVisitorsAction() {
  const headersList = await headers();
  const realIp = headersList.get("x-real-ip");
  const forwardedFor = headersList.get("x-forwarded-for");
  const clientIP = forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";

  try {
    // if there's an existing visitor already exist by ip

    const existingVisitor = await db.query.siteVisitors.findFirst({
      where: eq(siteVisitors?.userIP, clientIP),
    });

    if (existingVisitor) {
      await db
        .update(siteVisitors)
        .set({
          visitedCount: existingVisitor?.visitedCount + 1,
        })
        .where(eq(siteVisitors?.id, existingVisitor?.id));
    } else {
      await db.insert(siteVisitors).values({
        userIP: clientIP,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
