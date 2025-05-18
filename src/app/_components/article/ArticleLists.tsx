"use client";

import ArticleCard from "@/src/app/_components/article/ArticleCard";
import { posts } from "@/src/db/schema/article";
import { InferSelectModel } from "drizzle-orm";
import { useOptimistic } from "react";

export type Article = InferSelectModel<typeof posts>;

export default function ArticleLists({ articles }: { articles: Article[] }) {
  const [optimisticArticles, optimisticDelete] = useOptimistic(
    articles,
    (curArticles, articleId) =>
      curArticles?.filter((article) => article?.id !== articleId),
  );

  return (
    <div className="w-full odd:bg-neutral-100">
      {optimisticArticles?.map((article) => (
        <ArticleCard
          key={article?.id}
          article={article}
          optimisticDelete={optimisticDelete}
        />
      ))}
    </div>
  );
}
