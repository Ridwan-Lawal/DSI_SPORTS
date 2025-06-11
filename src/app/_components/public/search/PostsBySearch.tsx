import PostCardForSearch from "@/src/app/_components/public/search/PostCardForSearch";
import SearchPostPagination from "@/src/app/_components/public/search/SearchPostPagination";
import {
  getPostBySearchCount,
  getPostsBySearchValue,
} from "@/src/app/_lib/data-service/news/search";
import { bebasNeue } from "@/src/app/_styles/font";
import Link from "next/link";

interface PostsBySearchProps {
  query: string | undefined;
  pageNo: string | undefined;
}

export default async function PostsBySearch({
  query,
  pageNo,
}: PostsBySearchProps) {
  const [articles, articlesCount] = await Promise.all([
    getPostsBySearchValue(query, pageNo ?? "1"),
    getPostBySearchCount(query),
  ]);

  console.log(articles);

  return (
    <div className="mt-8 md:mt-10">
      {!articles?.length && !query && (
        <p className="text-neutral-700">
          Start typing to search for articles...
        </p>
      )}
      {!articles?.length && query && (
        <h6
          className={`${bebasNeue?.className} flex h-[100px] items-center justify-center text-center`}
        >
          No available post for this search, try again or enter a different
          keyword.
        </h6>
      )}

      {articles && articles?.length > 0 && query && (
        <div className="space-y-10">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
            {articles?.map((article) => (
              <Link href={`/news/${article?.slug}`} key={article?.id}>
                <PostCardForSearch article={article} />
              </Link>
            ))}
          </div>

          <SearchPostPagination newsCount={articlesCount?.at(0)?.count} />
        </div>
      )}
    </div>
  );
}
