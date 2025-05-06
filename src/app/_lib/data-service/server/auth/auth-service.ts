import { db } from "@/src/db";
import {
  passwordCreateToken,
  passwordResetTokens,
  users,
} from "@/src/db/schema/auth";
import { eq } from "drizzle-orm";
import { cache } from "react";

export async function getPasswordResetTokenByToken(token: string) {
  const existingToken = await db.query.passwordResetTokens.findFirst({
    where: eq(passwordResetTokens?.token, token),
  });

  return existingToken;
}

export async function getPasswordResetTokenByEmail(email: string) {
  const existingToken = await db.query.passwordResetTokens.findFirst({
    where: eq(passwordResetTokens?.email, email),
  });

  return existingToken;
}

export async function getPasswordCreateTokenByToken(token: string) {
  const createPasswordToken = await db.query.passwordCreateToken.findFirst({
    where: eq(passwordCreateToken.token, token),
  });

  return createPasswordToken;
}

export async function getPasswordCreateTokenByEmail(email: string) {
  const existingToken = await db.query.passwordCreateToken.findFirst({
    where: eq(passwordCreateToken?.email, email),
  });

  return existingToken;
}

export const getAdminByEmail = cache(async function (email: string) {
  const user = await db.query.users.findFirst({
    where: eq(users?.email, email),
  });

  return user;
});

export const getAdminById = cache(async function (userId: string) {
  const user = await db.query.users.findFirst({
    where: eq(users?.id, userId),
  });

  return user;
});
