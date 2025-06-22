import NewArticle from "@/src/app/_components/article/NewArticle";
import { getArticleById } from "@/src/app/_lib/data-service/articles/articles-data";
import { getCategories } from "@/src/app/_lib/data-service/articles/categories";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Write",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ articleToEditId?: string }>;
}) {
  const query = await searchParams;
  const articleToEdit = await getArticleById(query?.articleToEditId);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewArticle articleToEdit={articleToEdit?.at(0)} />
    </HydrationBoundary>
  );
}
