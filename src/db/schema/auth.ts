import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const roles = pgEnum("roles", ["admin", "user"]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  isFirstLogin: boolean("isFirstLogin").notNull().default(true),
  userRole: roles("user_role").default("user"),
  password: text("password"),
  image: text("image"),
  bio: text("bio"),
  socials: jsonb("socials").default({ X: "", whatsapp: "", instagram: "" }),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ],
);

export const passwordCreateToken = pgTable("passwordCreateToken", {
  id: text("id")
    .primaryKey()
    .unique()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),

  email: text("email").notNull().unique(),
  token: text("token").unique().notNull(),
  expires: timestamp("expires", { mode: "date" }),
});

export const passwordResetTokens = pgTable("passwordResetTokens", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),

  email: text("email").notNull().unique(),
  token: text("token").unique().notNull(),
  expires: timestamp("expires", { mode: "date" }),
});
