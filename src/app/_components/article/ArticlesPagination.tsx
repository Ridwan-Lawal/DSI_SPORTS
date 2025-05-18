import Pagination from "@/src/app/_components/article/Pagination";
import { db } from "@/src/db";
import { posts } from "@/src/db/schema/article";

export default async function ArticlesPagination() {
  const totalArticles = await db.$count(posts);
  //   const totalArticles = articles?.length;

  return <Pagination totalArticles={totalArticles} />;
}
