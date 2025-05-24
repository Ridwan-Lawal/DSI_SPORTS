"use server";

import { SocialMediaSchema } from "@/src/app/_lib/schema/settings-schema";
import { getUser } from "@/src/app/_utils/get-session";
import { db } from "@/src/db";
import { users } from "@/src/db/schema/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function socialMediaAction(
  prevState: unknown,
  formData: FormData,
) {
  // Check if the user is logged in.
  const user = await getUser();
  if (!user || !user?.id) {
    redirect("/auth/admin/login");
  }

  //  build the data and ensure the input are safe.
  const socialMediaDetails = Object.fromEntries(formData.entries());

  const socialMediaValidatedDetails =
    SocialMediaSchema.safeParse(socialMediaDetails);

  if (!socialMediaValidatedDetails?.success) {
    return {
      formErrors: socialMediaValidatedDetails?.error?.flatten()?.fieldErrors,
      inputs: socialMediaDetails,
    };
  }

  const { instagram, X, whatsapp } = socialMediaValidatedDetails?.data ?? {};

  if (
    instagram === user?.socials?.instagram &&
    whatsapp === user?.socials?.whatsapp &&
    X === user?.socials?.X
  )
    return;

  try {
    await db
      .update(users)
      .set({ socials: { X, whatsapp, instagram } })
      .where(eq(users?.id, user?.id));

    revalidatePath("/admin/settings");

    return { success: "Socials successfully updated!" };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error?.message };
    }
  }
}
