"use server";

import { ArticleContentProps } from "@/src/app/_lib/actions/articles/type";
import { PublishArticleSchema } from "@/src/app/_lib/schema/articles-schema";
import { getUser } from "@/src/app/_utils/get-session";
import { db } from "@/src/db";
import { posts } from "@/src/db/schema/article";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function draftArticleAction(articleContents: ArticleContentProps) {
  const user = await getUser();
  if (!user || !user?.id) {
    redirect("/auth/admin/login");
  }

  const {
    title,
    tags,
    seoDescription,
    seoTitle,
    excerpt,
    featuredImageLink,
    category,
    content,
  } = articleContents ?? {};

  const tagsArray = tags?.split(",").map((tag) => tag.toLowerCase());
  // slug
  const slug = title
    .toLowerCase()
    .split(" ")
    .join("-")
    .replace(/[^\w-]/g, "");
  try {
    await db.insert(posts).values({
      title,
      category: category || "premier league",
      excerpt,
      content,
      slug,
      tags: tagsArray,
      seoTitle: seoTitle ?? title,
      seoDescription: seoDescription || excerpt,
      status: "draft",
      featuredImage: featuredImageLink ?? "",
      authorId: user?.id,
    });

    revalidatePath("/admin/overview");

    return {
      success: "Article successfully drafted.",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
  }
}

export async function publishArticleAction(
  prevState: unknown,
  formData: FormData,
) {
  // check if user is logged in
  const user = await getUser();
  console.log(user, "users");
  if (!user || !user?.id) {
    redirect("/auth/admin/login");
  }

  // Build the data and ensure type safety.
  const articleContents = Object.fromEntries(formData.entries());

  const validatedArticleContent =
    PublishArticleSchema.safeParse(articleContents);

  console.log(articleContents);

  if (!validatedArticleContent?.success) {
    console.log(validatedArticleContent?.error?.flatten()?.fieldErrors);
    return {
      formErrors: validatedArticleContent?.error?.flatten()?.fieldErrors,
      inputs: articleContents,
    };
  }

  const {
    title,
    category,
    content,
    featuredImageLink,
    tags,
    seoTitle,
    seoDescription,
    excerpt,
  } = validatedArticleContent?.data ?? {};

  const tagsArray = tags?.split(",").map((tag) => tag.toLowerCase());
  // slug
  const slug = title
    .toLowerCase()
    .split(" ")
    .join("-")
    .replace(/[^\w-]/g, "");

  try {
    await db.insert(posts).values({
      title,
      category,
      excerpt,
      content,
      slug,
      tags: tagsArray,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt,
      status: "published",
      featuredImage: featuredImageLink,
      authorId: user?.id,
    });

    revalidatePath("/admin/overview");
    revalidatePath("/admin/articles");

    revalidatePath("/news");
    revalidatePath("/");

    console.log("no errroroo");

    return {
      success: "Article successfully published.",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: "Article successfully drafted.",
      };
    }
  }
}

// handle the draft submission
// when you finish this part, start with the article page
