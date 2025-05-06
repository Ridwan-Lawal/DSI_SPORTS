CREATE TABLE "passwordResetToken" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp,
	CONSTRAINT "passwordResetToken_id_unique" UNIQUE("id"),
	CONSTRAINT "passwordResetToken_email_unique" UNIQUE("email"),
	CONSTRAINT "passwordResetToken_token_unique" UNIQUE("token")
);
