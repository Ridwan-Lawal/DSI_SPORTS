"use server";

import { db } from "@/src/db";
import { siteVisitors } from "@/src/db/schema/article";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function countVisitorsAction() {
  const headersList = await headers();
  const realIp = headersList.get("x-real-ip");
  const forwardedFor = headersList.get("x-forwarded-for");
  const clientIP = forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";

  try {
    const visitors = await db.select().from(siteVisitors);

    const existingVisitor = visitors?.find(
      async (visitor) => await bcrypt.compare(clientIP, visitor?.userIP),
    );

    const hashedClientIp = await bcrypt.hash(clientIP, 10);

    console.log(existingVisitor, "existing");

    if (existingVisitor) {
      await db
        .update(siteVisitors)
        .set({
          visitedCount: existingVisitor?.visitedCount + 1,
        })
        .where(eq(siteVisitors?.id, existingVisitor?.id));
    } else {
      await db.insert(siteVisitors).values({
        userIP: hashedClientIp,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

// feature complete,

// check the sidebar scroll in the admin dashboard, why is it slow,

// recrawl site from google search console
