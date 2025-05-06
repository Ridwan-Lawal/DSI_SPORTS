"use server";

import { getAdminByEmail } from "@/src/app/_lib/data-service/server/auth/auth-service";
import { sendPasswordCreateMail } from "@/src/app/_lib/data-service/server/auth/mails";
import { generatePasswordCreateToken } from "@/src/app/_lib/data-service/server/auth/tokens";
import { LoginSchema } from "@/src/app/_lib/schema/auth-schema";
import { signIn } from "@/src/auth";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export async function loginAction(prevState: unknown, formData: FormData) {
  // Build the data and ensure input safety
  const credentials = Object.fromEntries(formData.entries());

  //   const callbackUrl = formData.get("callbackUrl") as string;

  const validatedCredentials = LoginSchema.safeParse(credentials);

  if (!validatedCredentials?.success) {
    return {
      formErrors: validatedCredentials?.error?.flatten()?.fieldErrors,
      inputs: credentials,
    };
  }

  const { email, password } = validatedCredentials?.data ?? {};

  // on first login, check if email exist  and password is correct, then send password creation mail.

  // check if admin exist with email
  const existingAdmin = await getAdminByEmail(email);
  if (!existingAdmin) return { error: "Invalid credentials" };

  // check if password match admin password
  const passwordMatch = await bcrypt.compare(
    password,
    existingAdmin?.password as string,
  );
  if (!passwordMatch) return { error: "Invalid credentials" };

  if (existingAdmin?.isFirstLogin) {
    const passwordCreateToken = await generatePasswordCreateToken(email);

    if (passwordCreateToken) {
      await sendPasswordCreateMail(
        passwordCreateToken?.token,
        passwordCreateToken?.email,
      );
    }

    return {
      success:
        "New password creation mail sent (check your mail), create a new password",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: `Welcome back, Name`, redirect: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error?.name) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials",
          };

        default:
          return {
            error: "Something went wrong!",
          };
      }
    }

    throw error;
  }
}
