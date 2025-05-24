"use server";

import {
  getAdminByEmail,
  getAdminById,
} from "@/src/app/_lib/data-service/auth/auth-service";
import {
  EmailSchema,
  PasswordSettingsSchema,
} from "@/src/app/_lib/schema/settings-schema";
import { getUser } from "@/src/app/_utils/get-session";
import { db } from "@/src/db";
import { users } from "@/src/db/schema/auth";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function passwordSettingsAction(
  prevState: unknown,
  formData: FormData,
) {
  const user = await getUser();
  if (!user || !user?.id) {
    redirect("/auth/admin/login");
  }

  const passwordDetails = Object.fromEntries(formData.entries());

  const validatedPasswordDetails =
    PasswordSettingsSchema.safeParse(passwordDetails);

  if (!validatedPasswordDetails?.success) {
    return {
      formErrors: validatedPasswordDetails?.error?.flatten()?.fieldErrors,
      inputs: passwordDetails,
    };
  }

  const { currentPassword, confirmNewPassword } =
    validatedPasswordDetails?.data ?? {};

  //mutation

  const currentAdmin = await getAdminById(user?.id);

  console.log("before");

  if (currentPassword && currentAdmin?.password) {
    const doesPasswordsMatch = await bcrypt.compare(
      currentPassword,
      currentAdmin?.password,
    );

    if (!doesPasswordsMatch) {
      console.log(doesPasswordsMatch, "retttttttttttttttttttttturn");
      return { error: "Password update failed!", inputs: passwordDetails };
    }

    console.log("middle");
    const isNewPasswordSameAsCurrent = await bcrypt.compare(
      confirmNewPassword,
      currentAdmin?.password,
    );

    if (isNewPasswordSameAsCurrent) {
      return {
        error: "Your new password must be different from your current.",
        inputs: passwordDetails,
      };
    }
  }

  console.log("after");

  const hashedPassword = await bcrypt.hash(confirmNewPassword, 10);

  try {
    await db
      .update(users)
      ?.set({ password: hashedPassword })
      .where(eq(users?.id, user?.id));

    return { success: "Password successfully updated!" };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error?.message };
    }
  }
}

export async function emailSettingsAction(
  prevState: unknown,
  formData: FormData,
) {
  const user = await getUser();

  if (!user || !user?.id) {
    redirect("/auth/admin/login");
  }

  //   building & validating form data
  const emailDetail = Object.fromEntries(formData.entries());

  const validatedEmailDetail = EmailSchema.safeParse(emailDetail);
  if (!validatedEmailDetail?.success) {
    return {
      formErrors: validatedEmailDetail?.error?.flatten()?.fieldErrors,
      inputs: emailDetail,
    };
  }

  const { email } = validatedEmailDetail?.data ?? {};

  // mutation

  //   if the email is equal to our current email.
  if (email === user?.email) {
    return {
      error:
        "Please use a different email address other than your current email. ",
    };
  }

  //   Check if the email already exist or is in use by someone else
  const existingAdminWithEmail = await getAdminByEmail(email);

  if (existingAdminWithEmail && existingAdminWithEmail?.id !== user?.id) {
    return { error: "Email address already in use." };
  }

  try {
    await db.update(users).set({ email }).where(eq(users?.id, user?.id));

    revalidatePath("/admin/overview");
    revalidatePath("/admin/settings");

    return { success: "Email address successfully updated." };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error?.message };
    }
  }
}
