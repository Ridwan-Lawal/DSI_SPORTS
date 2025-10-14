import {
  getArticlesCategory,
  getHomeArticles,
} from "@/src/app/_lib/data-service/homepage/articles";
import { unstable_cache } from "next/cache";

export const getHomeArticlesCache = unstable_cache(
  async (category?: string) => {
    return getHomeArticles(category);
  },
  ["homepage-articles-cache"],
  {
    tags: ["articles"],
    revalidate: 3600,
  },
);

export const getHomeArticlesCategoryCache = unstable_cache(
  async () => {
    return getArticlesCategory();
  },
  ["homepage-articles-category"],
  {
    tags: ["categories"],
    revalidate: 3600,
  },
);
