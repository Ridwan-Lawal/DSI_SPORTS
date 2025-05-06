ALTER TABLE "user" ALTER COLUMN "role" SET DATA TYPE "public"."roles";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET NOT NULL;