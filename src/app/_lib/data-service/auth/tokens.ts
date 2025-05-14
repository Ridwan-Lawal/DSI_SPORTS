import {
  getPasswordCreateTokenByEmail,
  getPasswordResetTokenByEmail,
} from "@/src/app/_lib/data-service/auth/auth-service";
import { db } from "@/src/db";
import { passwordCreateToken, passwordResetTokens } from "@/src/db/schema/auth";

import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export async function generatePasswordResetToken(email: string) {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 10 * 60 * 1000);

  // check if a token exists for the user
  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens?.id, existingToken?.id));
  }

  const passwordResetToken = await db
    .insert(passwordResetTokens)
    .values({
      email,
      expires,
      token,
    })
    .returning();

  return passwordResetToken?.at(0);
}

export async function generatePasswordCreateToken(email: string) {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 10 * 60 * 1000);

  //   if admin already as a token
  const existingToken = await getPasswordCreateTokenByEmail(email);

  // if there's an existing token, delete it before creating a new token
  if (existingToken) {
    await db
      .delete(passwordCreateToken)
      .where(eq(passwordCreateToken?.id, existingToken?.id));
  }

  //   if no existing token, create one

  const newPasswordCreateToken = await db
    .insert(passwordCreateToken)
    .values({ email, token, expires })
    .returning();

  return newPasswordCreateToken?.at(0);
}
