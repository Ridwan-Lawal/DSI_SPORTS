import { getAdminById } from "@/src/app/_lib/data-service/auth/auth-service";
import { authConfig } from "@/src/auth.config";
import { db } from "@/src/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { type DefaultSession } from "next-auth";

type userRole = "admin" | "user";
declare module "next-auth" {
  interface Session {
    user: {
      role: userRole;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/admin/login",
  },
  callbacks: {
    async signIn({ user }) {
      const existingAdmin = await getAdminById(user?.id as string);

      // if admin doesn't exist or , first login
      if (!existingAdmin) return false;

      if (existingAdmin?.isFirstLogin) {
        return false;
      }

      return true;
    },
    session({ token, session }) {
      if (token?.sub && token?.role) {
        session.user.id = token?.sub;
        session.user.role = token?.role as userRole;
      }

      return session;
    },
    async jwt({ token }) {
      const userId = token?.sub;
      if (userId) {
        const existingUser = await getAdminById(userId);

        if (existingUser) {
          token.role = existingUser?.userRole;
        }
      }

      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  ...authConfig,
});
