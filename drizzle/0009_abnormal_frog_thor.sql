CREATE TYPE "public"."status" AS ENUM('published', 'draft');--> statement-breakpoint
CREATE TABLE "categories" (
	"id" text PRIMARY KEY NOT NULL,
	"category" text NOT NULL,
	CONSTRAINT "categories_id_unique" UNIQUE("id"),
	CONSTRAINT "categories_category_unique" UNIQUE("category")
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"excerpt" text NOT NULL,
	"content" text NOT NULL,
	"status" "status" DEFAULT 'draft' NOT NULL,
	"category" text NOT NULL,
	"tags" text[] NOT NULL,
	"featuredImage" text NOT NULL,
	"publishedAt" timestamp (6) with time zone DEFAULT now(),
	"createdAt" timestamp (6) with time zone DEFAULT now(),
	"updatedAt" timestamp (6) with time zone,
	"seoTitle" text NOT NULL,
	"seoDescription" text NOT NULL,
	"authorId" text NOT NULL,
	CONSTRAINT "posts_id_unique" UNIQUE("id"),
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "passwordResetToken" RENAME TO "passwordResetTokens";--> statement-breakpoint
ALTER TABLE "passwordResetTokens" DROP CONSTRAINT "passwordResetToken_id_unique";--> statement-breakpoint
ALTER TABLE "passwordResetTokens" DROP CONSTRAINT "passwordResetToken_email_unique";--> statement-breakpoint
ALTER TABLE "passwordResetTokens" DROP CONSTRAINT "passwordResetToken_token_unique";--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_category_categories_category_fk" FOREIGN KEY ("category") REFERENCES "public"."categories"("category") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "passwordResetTokens" ADD CONSTRAINT "passwordResetTokens_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "passwordResetTokens" ADD CONSTRAINT "passwordResetTokens_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "passwordResetTokens" ADD CONSTRAINT "passwordResetTokens_token_unique" UNIQUE("token");