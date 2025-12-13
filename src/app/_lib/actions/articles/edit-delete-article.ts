"use server";

import { PublishArticleSchema } from "@/src/app/_lib/schema/articles-schema";
import { getUser } from "@/src/app/_utils/get-session";
import { db } from "@/src/db";
import { posts } from "@/src/db/schema/article";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editArticleAction(
  prevState: unknown,
  formData: FormData,
) {
  const user = await getUser();
  if (!user || !user?.id) {
    redirect("/auth/admin/login");
  }

  /**
   * Check if the data the user is trying to mutate his is own data.
   * use role gate for this: editor should be allowed to edit only their data, but admin should be able to edit all data
   */
  // TODO: check is data belong to user for editor

  const updatedData = Object.fromEntries(formData.entries());
  const articleToUpdatedId = formData.get("articleToUpdateId");

  const validatedUpdatedData = PublishArticleSchema.safeParse(updatedData);
  if (validatedUpdatedData?.error) {
    return {
      formErrors: validatedUpdatedData?.error?.flatten()?.fieldErrors,
      inputs: updatedData,
    };
  }

  const {
    title,
    category,
    content,
    featuredImageLink,
    // featuredImage,
    tags,
    seoTitle,
    seoDescription,
    excerpt,
  } = validatedUpdatedData?.data ?? {};

  const articleTags = tags.toLowerCase()?.split(",");

  const slug = title
    .toLowerCase()
    .split(" ")
    .join("-")
    .replace(/[^\w-]/g, "");

  if (!articleToUpdatedId) {
    return { error: "Please select an article to edit!" };
  }

  try {
    await db
      .update(posts)
      .set({
        title,
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || excerpt,
        featuredImage: featuredImageLink,
        content,
        category,
        tags: articleTags,
        authorId: user?.id,
        slug,
        status: "published",
        updatedAt: new Date(Date.now()),
      })
      .where(eq(posts?.id, articleToUpdatedId as string));

    revalidatePath("/admin/overview");
    revalidatePath("/admin/articles");
    revalidatePath("/news");
    revalidatePath("/");

    return { success: "Article successfully updated." };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
  }
}

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
