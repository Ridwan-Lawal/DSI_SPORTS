import { getUser } from "@/src/app/_utils/get-session";
import { db } from "@/src/db";
import { siteVisitors } from "@/src/db/schema/article";
import { redirect } from "next/navigation";

export async function getVisitorsCount() {
  const user = await getUser();
  if (!user || !user?.id) {
    redirect("/auth/admin/login");
  }

  //   Getting the visitors,

  try {
    const visitors = await db
      .select({
        id: siteVisitors?.id,
        visitedCount: siteVisitors?.visitedCount,
        visitedAt: siteVisitors?.createdAt,
      })
      .from(siteVisitors);

    return visitors;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
  }
}
