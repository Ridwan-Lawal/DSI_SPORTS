CREATE TABLE "postViews" (
	"id" text PRIMARY KEY NOT NULL,
	"userIP" text NOT NULL,
	"postSlug" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
