import { users } from "@/src/db/schema/auth";
import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const status = pgEnum("status", ["published", "draft"]);

export const posts = pgTable("posts", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  status: status("status").notNull().default("draft"),
  category: text("category")
    .references(() => categories.category)
    .notNull(),
  tags: text("tags").array().notNull(),
  featuredImage: text("featuredImage").notNull(),
  publishedAt: timestamp("publishedAt", {
    precision: 6,
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
  createdAt: timestamp("createdAt", {
    precision: 6,
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
  updatedAt: timestamp("updatedAt", {
    precision: 6,
    withTimezone: true,
    mode: "date",
  }),
  seoTitle: text("seoTitle").notNull(),
  seoDescription: text("seoDescription").notNull(),
  authorId: text("authorId")
    .notNull()
    .references(() => users.id),
  views: integer("views").default(0).notNull(),
});

export const categories = pgTable("categories", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  createdAt: timestamp("createdAt", {
    precision: 6,
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
  category: text("category").notNull().unique(),
});

export const postViews = pgTable("postViews", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),

  userIP: text("userIP").notNull(),
  postSlug: text("postSlug").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const siteVisitors = pgTable("siteVisitors", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  userIP: text("userIP").notNull(),
  visitedCount: integer("visitedCount").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const postRelations = relations(posts, ({ one }) => {
  return {
    author: one(users, {
      fields: [posts.authorId],
      references: [users?.id],
    }),
    category: one(categories, {
      fields: [posts.category],
      references: [categories.category],
    }),
  };
});

export const categoryPostsRelation = relations(categories, ({ many }) => {
  return {
    posts: many(posts),
  };
});

export const userPostsRelation = relations(users, ({ many }) => {
  return {
    posts: many(posts),
  };
});
