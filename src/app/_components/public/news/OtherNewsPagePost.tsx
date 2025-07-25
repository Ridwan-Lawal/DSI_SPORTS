import { getNews } from "@/src/app/_lib/data-service/news/news";
import { getImageBlurDataUrl } from "@/src/app/_lib/sharp/blur-data-url";
import { bebasNeue } from "@/src/app/_styles/font";
import { formatArticleDate } from "@/src/app/_utils/date";
import { Dot } from "lucide-react";
import Image from "next/image";

type NewsReturnType = NonNullable<Awaited<ReturnType<typeof getNews>>>[0];

export default async function OtherNewsPagePosts({
  news,
}: {
  news: NewsReturnType | undefined;
}) {
  const { title, publishedAt, featuredImage, author, category } = news ?? {};

  const [featuredImageBlurDataUrl, avatarBlurDataUrl] = await Promise.all([
    getImageBlurDataUrl(featuredImage),
    getImageBlurDataUrl(author?.image),
  ]);

  return (
    <div className="cursor-pointer space-y-4 overflow-hidden border-b border-neutral-200 pb-5 md:flex md:flex-col md:justify-between md:space-y-8 md:rounded-sm md:border md:border-neutral-100 md:shadow-sm md:shadow-neutral-100">
      {/* title and post image */}
      <div className="flex justify-between gap-4 md:flex-col">
        <p
          className={`${bebasNeue?.className} w-[80%] sm:text-lg md:order-2 md:w-full md:px-4`}
        >
          {title}
        </p>

        <div className="sm:[110px] relative order-1 h-[90px] w-[70px] overflow-hidden rounded-sm md:aspect-video md:h-[220px] md:w-full md:rounded-none lg:h-[200px]">
          {featuredImage && (
            <Image
              src={featuredImage}
              alt="top-image"
              fill
              className="object-cover"
              quality={100}
              placeholder={featuredImageBlurDataUrl ? "blur" : "empty"}
              blurDataURL={featuredImageBlurDataUrl ?? ""}
            />
          )}
        </div>
      </div>

      {/* author and category */}
      <div className="flex items-center justify-between md:px-4">
        {/* Author and publish time */}

        <div className="flex items-center gap-1">
          {/* author */}
          <div className="flex items-center gap-3">
            <div className="relative size-[20px] overflow-hidden rounded-full">
              {author?.image && (
                <Image
                  src={author?.image}
                  alt="feature-image"
                  fill
                  placeholder={avatarBlurDataUrl ? "blur" : "empty"}
                  blurDataURL={avatarBlurDataUrl ?? ""}
                  className="object-cover"
                />
              )}
            </div>

            <p className="text-[12px] font-medium text-neutral-500">
              {author?.name}
            </p>
          </div>
          <Dot className="size-3.5 text-neutral-500" />

          <p className="text-[12px] text-neutral-500">
            {formatArticleDate(publishedAt)}
          </p>
        </div>

        <p className="text-[12px] text-neutral-500 capitalize lg:hidden xl:block">
          {category}
        </p>
      </div>
    </div>
  );
}
