import { getUser } from "@/src/app/_utils/get-session";
import { db } from "@/src/db";
import { posts } from "@/src/db/schema/article";
import { redirect } from "next/navigation";

export async function getPostsData() {
  const user = await getUser();

  if (!user || !user?.id) {
    return redirect("/auth/admin/login");
  }

  try {
    const postsData = await db.select().from(posts);

    return postsData;
  } catch (error) {
    if (error instanceof Error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error fetching posts data:", error.message);
      }

      throw new Error("Something went wrong getting posts data.");
    }

    throw new Error("Something went wrong");
  }
}
