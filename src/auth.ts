import { getAdminById } from "@/src/app/_lib/data-service/auth/auth-service";
import { authConfig } from "@/src/auth.config";
import { db } from "@/src/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { type DefaultSession } from "next-auth";

type userRole = "admin" | "user";
type Socials = {
  X: string;
  whatsapp: string;
  instagram: string;
};
declare module "next-auth" {
  interface Session {
    user: {
      role: userRole;
      bio: string;
      avatar: string;
      socials: Socials;
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
      if (token?.sub) {
        session.user.bio = token?.bio as string;
        session.user.avatar = token?.picture as string;
        session.user.socials = token?.socials as Socials;
      }

      if (token?.sub && token?.email) {
        session.user.email = token?.email;
      }

      return session;
    },
    async jwt({ token }) {
      const userId = token?.sub;
      if (userId) {
        const existingUser = await getAdminById(userId);

        if (existingUser) {
          token.role = existingUser?.userRole;
          token.bio = existingUser?.bio;
          token.picture = existingUser?.image;
          token.socials = existingUser?.socials;
          token.email = existingUser?.email;
        }
      }

      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  ...authConfig,
});
