import FeaturedNews from "@/src/app/_components/public/news/FeaturedNews";
import OtherNewsPagePosts from "@/src/app/_components/public/news/OtherNewsPagePost";
import { getNews } from "@/src/app/_lib/data-service/news/news";
import { bebasNeue } from "@/src/app/_styles/font";
import { QueryType } from "@/src/app/_utils/types";
import Image from "next/image";

export default async function NewsByCategory({ query }: QueryType) {
  const newsArticles = await getNews(query?.category);

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
          {query?.category && (
            <div className="relative -mt-1 size-6">
              <Image
                src={`/categories/${query?.category}.png`}
                alt="logo"
                quality={100}
                priority={true}
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>
        <p className="text-sm text-neutral-500">
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
            <OtherNewsPagePosts key={news?.id} news={news} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <h6 className={`${bebasNeue?.className}`}>
            No available news for this category, please browse through other
            categories.
          </h6>
        </div>
      )}
    </div>
  );
}

// handle to load more button
