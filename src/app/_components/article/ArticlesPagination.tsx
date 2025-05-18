import Pagination from "@/src/app/_components/article/Pagination";
import { getArticles } from "@/src/app/_lib/data-service/articles/articles-data";
import { db } from "@/src/db";
import { posts } from "@/src/db/schema/article";

interface ArticlesProps {
  queries: {
    search?: string | undefined;
    status?: string | undefined;
    page?: string | undefined;
  };
}

export default async function ArticlesPagination({ queries }: ArticlesProps) {
  const [totalArticlesCount, articles] = await Promise.all([
    db.$count(posts),
    getArticles(queries),
  ]);

  const pageArticlesCount = articles?.length;

  return (
    totalArticlesCount && (
      <Pagination
        totalArticlesCount={totalArticlesCount}
        pageArticlesCount={pageArticlesCount}
      />
    )
  );
}
