import { posts } from "@/src/db/schema/article";
import { users } from "@/src/db/schema/auth";
import { InferSelectModel } from "drizzle-orm";

export type Article = InferSelectModel<typeof posts>;

export type User = InferSelectModel<typeof users>;

export interface FeatureArticleProp {
  featuredArticleData:
    | {
        id: string;
        title: string;
        slug: string;
        category: string;
        featuredImage: string;
        publishedAt: Date | null;
        excerpt: string;
        author: {
          name: string | null;
          image: string | null;
        };
      }
    | undefined;
}

export interface OtherArticleProp {
  article:
    | {
        id: string;
        title: string;
        slug: string;
        category: string;
        featuredImage: string;
        publishedAt: Date | null;
        excerpt: string;
        author: {
          name: string | null;
          image: string | null;
        };
      }
    | undefined;
}

export interface QueryType {
  query: {
    category?: string;
  };
}
