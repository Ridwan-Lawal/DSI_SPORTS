import NewArticle from "@/src/app/_components/article/NewArticle";
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

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewArticle />
    </HydrationBoundary>
  );
}
