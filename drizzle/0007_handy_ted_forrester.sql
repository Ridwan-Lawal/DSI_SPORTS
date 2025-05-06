ALTER TABLE "passwordResetToken" RENAME TO "passwordCreateToken";--> statement-breakpoint
ALTER TABLE "passwordCreateToken" DROP CONSTRAINT "passwordResetToken_id_unique";--> statement-breakpoint
ALTER TABLE "passwordCreateToken" DROP CONSTRAINT "passwordResetToken_email_unique";--> statement-breakpoint
ALTER TABLE "passwordCreateToken" DROP CONSTRAINT "passwordResetToken_token_unique";--> statement-breakpoint
ALTER TABLE "passwordCreateToken" ADD CONSTRAINT "passwordCreateToken_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "passwordCreateToken" ADD CONSTRAINT "passwordCreateToken_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "passwordCreateToken" ADD CONSTRAINT "passwordCreateToken_token_unique" UNIQUE("token");