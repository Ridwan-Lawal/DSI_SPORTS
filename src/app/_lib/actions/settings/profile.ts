"use server";

import { ProfileSettingsSchema } from "@/src/app/_lib/schema/settings-schema";
import { getUser } from "@/src/app/_utils/get-session";
import { db } from "@/src/db";
import { users } from "@/src/db/schema/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function ProfileSettingsAction(
  prevState: unknown,
  formData: FormData,
) {
  // Check if user is logged in
  const user = await getUser();
  if (!user || !user?.id) {
    redirect("/auth/admin/login");
  }

  //   Build the data and ensure the inputs are safe
  const profileDetails = Object.fromEntries(formData.entries());

  const profileValidatedDetails =
    ProfileSettingsSchema.safeParse(profileDetails);

  if (!profileValidatedDetails?.success) {
    return {
      formErrors: profileValidatedDetails?.error?.flatten()?.fieldErrors,
      inputs: profileDetails,
    };
  }

  const { displayName, bio, avatarUrl } = profileValidatedDetails?.data ?? {};

  //   start mutating
  if (
    displayName === user?.name &&
    bio === user?.bio &&
    avatarUrl === user?.image
  )
    return;

  try {
    await db
      .update(users)
      .set({ name: displayName, bio, image: avatarUrl })
      .where(eq(users?.id, user?.id));

    revalidatePath("/admin/settings");
    revalidatePath("/admin/overview");

    return { success: "Changes successfully applied." };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error?.message };
    }
  }
}
