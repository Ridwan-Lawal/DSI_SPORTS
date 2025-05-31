import { Tabs } from "@/components/ui/tabs";
import NewsByCategory from "@/src/app/_components/public/news/NewsByCategory";
import NewsTabLists from "@/src/app/_components/public/news/NewsTabLists";
import { getArticlesCategory } from "@/src/app/_lib/data-service/homepage/articles";
import { QueryType } from "@/src/app/_utils/types";
import { Suspense } from "react";

export default async function NewsTabs({ query }: QueryType) {
  const articleCategories = await getArticlesCategory();

  console.log(query?.category);
  return (
    <div className="">
      <Tabs
        defaultValue={query?.category ?? "all"}
        className="no-scrollbar h-full w-full overflow-auto rounded-lg"
      >
        <NewsTabLists articleCategories={articleCategories} />

        <Suspense fallback={<div>Loading...</div>} key={query?.category}>
          <NewsByCategory query={query} />
        </Suspense>
      </Tabs>
    </div>
  );
}
