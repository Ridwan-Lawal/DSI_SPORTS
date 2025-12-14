"use server";

import { getUser } from "@/src/app/_utils/get-session";
import { db } from "@/src/db";
import { posts } from "@/src/db/schema/article";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function postsImageUploadAction(
  prevState: unknown,
  formData: FormData,
) {
  const user = await getUser();
  if (!user || !user?.id) {
    redirect("/auth/admin/login");
  }
  const postsUpdateData = Object.fromEntries(formData.entries());

  const { featuredImageLink, postId } = postsUpdateData;

  if (!featuredImageLink || !postId) {
    return { error: "Invalid form data." };
  }

  console.log("postsUpdateData", postsUpdateData);
  console.log("featuredImageLink", featuredImageLink);
  console.log("postId", postId);

  try {
    await db
      .update(posts)
      .set({
        featuredImage: featuredImageLink as string,
      })
      .where(eq(posts.id, postId as string));

    revalidatePath("/");

    return { success: "Post image uploaded successfully." };
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error uploading post image:", error.message);
      return {
        error: "Something went wrong uploading post image.",
      };
    }
    return { error: "Something went wrong." };
  }
}
