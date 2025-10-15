import FeaturedNews from "@/src/app/_components/public/news/FeaturedNews";
import NewsPagination from "@/src/app/_components/public/news/NewsPagination";
import OtherNewsPagePosts from "@/src/app/_components/public/news/OtherNewsPagePost";
import {
  getNews,
  getPostsCountByCategory,
} from "@/src/app/_lib/data-service/news/news";
import { bebasNeue } from "@/src/app/_styles/font";
import { QueryType } from "@/src/app/_utils/types";
import Link from "next/link";

export default async function NewsByCategory({ query }: QueryType) {
  const [newsArticles, newsCount] = await Promise.all([
    await getNews(query?.category, query?.page ?? "1"),
    await getPostsCountByCategory(query?.category),
  ]);

  const featuredNewsData = newsArticles?.at(0);

  const otherNewsData = newsArticles?.slice(1);

  return (
    <div className="mt-5 space-y-6">
      {/* header */}
      <div>
        <div className="flex items-center gap-3">
          <h5 className={`${bebasNeue?.className}`}>
            {query?.category ?? "News"}
          </h5>
        </div>
        <p className="items-center justify-center text-sm text-neutral-500">
          The hottest news from{" "}
          {query?.category ? (
            <span className="capitalize">{query?.category}</span>
          ) : (
            "the world of football"
          )}
        </p>
      </div>

      {/* continue with the desktop view of the featured post. */}

      {newsArticles?.length ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* ======= featured post ========= */}
          <FeaturedNews featuredNewsData={featuredNewsData} />
          {/* ========== Rest of the post */}
          {/* grid */}

          {otherNewsData?.map((news) => (
            <Link
              href={`/news/${news?.slug}`}
              key={news?.id}
              className="h-full self-stretch"
            >
              <OtherNewsPagePosts news={news} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex h-[100px] items-center justify-center">
          <h6 className={`${bebasNeue?.className}`}>
            No available news for this category, please browse through other
            categories.
          </h6>
        </div>
      )}

      <NewsPagination newsCount={newsCount?.at(0)?.count} />
    </div>
  );
}

// handle to load more button
