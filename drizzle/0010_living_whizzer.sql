ALTER TABLE "passwordResetTokens" DROP CONSTRAINT "passwordResetTokens_id_unique";--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "createdAt" timestamp (6) with time zone DEFAULT now();