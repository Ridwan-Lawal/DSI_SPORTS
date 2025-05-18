import Articles from "@/src/app/_components/article/Articles";
import ArticlesFilter from "@/src/app/_components/article/ArticlesFilter";
import ArticlesPageHeader from "@/src/app/_components/article/ArticlesPageHeader";
import ArticlesPagination from "@/src/app/_components/article/ArticlesPagination";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Articles",
};

// get the params from the url
// fetch the data using the filters in the Articles component
// create a suspense key and wrap the components around suspense

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string; page?: string }>;
}) {
  const queries = await searchParams;
  const suspenseKeyArticles = `${queries?.search}-${queries?.status}-${queries?.page}-articles`;

  const suspenseKeyPagination = `${queries?.search}-${queries?.status}-${queries?.page}-pagination`;

  return (
    <div className="px-4 pt-4 pb-8 lg:px-6">
      <ArticlesPageHeader />
      <ArticlesFilter />

      <Suspense fallback={<div>Loading...</div>} key={suspenseKeyArticles}>
        <Articles queries={queries} />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>} key={suspenseKeyPagination}>
        <ArticlesPagination />
      </Suspense>
    </div>
  );
}
