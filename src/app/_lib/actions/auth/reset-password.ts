"use server";

import {
  getAdminByEmail,
  getPasswordResetTokenByToken,
} from "@/src/app/_lib/data-service/auth/auth-service";
import { sendPasswordResetMail } from "@/src/app/_lib/data-service/auth/mails";
import { generatePasswordResetToken } from "@/src/app/_lib/data-service/auth/tokens";
import {
  ForgotPassword,
  ResetPassword,
} from "@/src/app/_lib/schema/auth-schema";
import { db } from "@/src/db";
import { passwordResetTokens, users } from "@/src/db/schema/auth";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export async function resetPasswordAction(
  prevState: unknown,
  formData: FormData,
) {
  const passwords = Object.fromEntries(formData.entries());
  const resetPasswordTokenFromUrl = formData.get(
    "resetPasswordTokenFromUrl",
  ) as string;
  const validatedPasswords = ResetPassword.safeParse(passwords);

  if (!validatedPasswords?.success) {
    return {
      formErrors: validatedPasswords?.error?.flatten()?.fieldErrors,
      inputs: passwords,
    };
  }

  const { confirmPassword } = validatedPasswords?.data ?? {};

  //   check if there's any token in the url
  if (!resetPasswordTokenFromUrl) {
    return { error: "Invalid token" };
  }

  const existingResetToken = await getPasswordResetTokenByToken(
    resetPasswordTokenFromUrl,
  );

  if (!existingResetToken) {
    return { error: "Invalid token" };
  }

  const hasExpired = new Date(existingResetToken?.expires as Date) < new Date();

  if (hasExpired) {
    return {
      error: "Token has expired, please request for a new password reset mail!",
    };
  }

  //   update password

  const existingAdmin = await getAdminByEmail(existingResetToken?.email);

  if (!existingAdmin) {
    return {
      error: "Please create an account",
    };
  }

  const hashedPassword = await bcrypt.hash(confirmPassword, 10);

  await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.id, existingAdmin?.id));

  // token useless now, so delete
  await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens?.id, existingResetToken?.id));

  return { success: "Password has been successfully updated, please sign in" };
}

export async function forgotPasswordAction(
  prevState: unknown,
  formData: FormData,
) {
  const emailCredential = Object.fromEntries(formData.entries());
  const validatedEmailCredential = ForgotPassword.safeParse(emailCredential);

  if (!validatedEmailCredential?.success) {
    return {
      formErrors: validatedEmailCredential?.error?.flatten()?.fieldErrors,
      inputs: emailCredential,
    };
  }

  const { email } = validatedEmailCredential?.data ?? {};

  //   Checking if an admin with this email exists
  const existingAdmin = await getAdminByEmail(email);

  //   if admin doesn't exist, we will still return a success message, so as not to give the user a clue, if email is valid or not
  if (!existingAdmin) {
    return {
      success: "Password reset mail sent!",
    };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  if (passwordResetToken) {
    sendPasswordResetMail(passwordResetToken?.email, passwordResetToken?.token);
  }

  return { success: "Password reset mail sent (check your mail)." };
}
