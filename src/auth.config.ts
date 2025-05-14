import { getAdminByEmail } from "@/src/app/_lib/data-service/auth/auth-service";
import { LoginSchema } from "@/src/app/_lib/schema/auth-schema";
import bcrypt from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        // ensuring the input are safe
        const validatedCredentials = LoginSchema.safeParse(credentials);
        if (!validatedCredentials?.success) return null;

        const { email, password } = validatedCredentials?.data ?? {};

        // check if the user exist or user don't have a password (OAuth)
        const existingAdmin = await getAdminByEmail(email);

        if (!existingAdmin || !existingAdmin.password) return null;

        // check if password is correct
        const passwordMatch = await bcrypt.compare(
          password,
          existingAdmin?.password,
        );

        if (!passwordMatch) return null;

        return existingAdmin;
      },
    }),
  ],
} satisfies NextAuthConfig;
