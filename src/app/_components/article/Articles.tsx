import ArticleLists from "@/src/app/_components/article/ArticleLists";
import { getArticles } from "@/src/app/_lib/data-service/articles/articles-data";
import { Newspaper } from "lucide-react";

interface ArticlesProps {
  queries: {
    search?: string | undefined;
    status?: string | undefined;
    page?: string | undefined;
  };
}

export default async function Articles({ queries }: ArticlesProps) {
  const articles = await getArticles(queries);

  if (!articles?.length) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-2">
        <Newspaper className="size-8 text-neutral-500" />
        <h5 className="text-neutral-700">No articles yet?</h5>
        <p className="text-sm text-neutral-500 md:text-base">
          Click the{" "}
          <span className="font-medium text-neutral-800">New article</span>{" "}
          button in the top-right corner of this page.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-9 overflow-hidden rounded-md border border-neutral-100 text-sm">
      <div className="hidden w-full grid-cols-3 justify-between gap-4 bg-neutral-50 px-3 py-4 md:grid md:grid-cols-4 lg:grid-cols-5">
        <div className="max-w-[200px]">Title</div>
        <div className="justify-self-center">Category</div>
        <div className="justify-self-center">Status</div>
        <div className="justify-self-center">Date</div>
      </div>
      <ArticleLists articles={articles} />
    </div>
  );
}
