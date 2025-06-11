CREATE TABLE "siteVisitors" (
	"id" text PRIMARY KEY NOT NULL,
	"userIP" text NOT NULL,
	"visitedCount" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
