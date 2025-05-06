"use server";

import {
  getAdminByEmail,
  getPasswordCreateTokenByToken,
} from "@/src/app/_lib/data-service/server/auth/auth-service";
import { CreateNewPassword } from "@/src/app/_lib/schema/auth-schema";
import { db } from "@/src/db";
import { passwordCreateToken, users } from "@/src/db/schema/auth";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export async function createNewPasswordAction(
  prevState: unknown,
  formData: FormData,
) {
  const passwords = Object.fromEntries(formData.entries());
  const createPasswordTokenFromUrl = formData.get(
    "createPasswordTokenFromUrl",
  ) as string;

  const validatedPasswords = CreateNewPassword.safeParse(passwords);

  if (!validatedPasswords?.success) {
    return {
      formErrors: validatedPasswords?.error?.flatten()?.fieldErrors,
      inputs: passwords,
    };
  }
  const { confirmPassword } = validatedPasswords?.data ?? {};

  if (!createPasswordTokenFromUrl) {
    return { error: "Invalid token" };
  }

  const existingPasswordCreateToken = await getPasswordCreateTokenByToken(
    createPasswordTokenFromUrl,
  );

  //   if token is not in the database
  if (!existingPasswordCreateToken) {
    return { error: "Invalid token" };
  }

  const tokenHasExpired =
    new Date(existingPasswordCreateToken?.expires as Date) < new Date();

  if (tokenHasExpired) {
    return {
      error:
        "Token has expired, please login to get a new password creation mail.",
    };
  }

  //   Updating the users password and isFirstLogin
  const existingAdmin = await getAdminByEmail(
    existingPasswordCreateToken?.email,
  );

  if (!existingAdmin) {
    return { error: "Invalid token" };
  }

  //   if the token exist, and not expired, update password.

  const hashedPassword = await bcrypt.hash(confirmPassword, 10);

  await db
    .update(users)
    .set({ password: hashedPassword, isFirstLogin: false })
    .where(eq(users.id, existingAdmin?.id));

  await db
    .delete(passwordCreateToken)
    .where(eq(passwordCreateToken.id, existingPasswordCreateToken?.id));

  return { success: "Password has been updated! Please sign in." };
}
