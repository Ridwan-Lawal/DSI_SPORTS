"use server";

import { getUser } from "@/src/app/_utils/get-session";
import { db } from "@/src/db";
import { posts } from "@/src/db/schema/article";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteArticleAction(id: string) {
  const user = await getUser();
  if (!user || !user?.id) {
    redirect("/auth/admin/login");
  }

  /** Check if data user is trying to delete belongs to users: do this later, when they are other users, use role gate */

  //   mutate - I'm not worried about deleting only post that belongs to the user for now, because, it belongs to one person for now.
  try {
    await db.delete(posts).where(eq(posts.id, id));

    revalidatePath("/admin/overview");
    revalidatePath("/admin/articles");

    return { success: "Article successfully deleted." };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error?.message };
    }
  }
}
