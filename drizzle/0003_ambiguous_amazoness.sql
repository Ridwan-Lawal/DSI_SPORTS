CREATE TYPE "public"."roles" AS ENUM('admin', 'user');--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "role" TO "user_role";