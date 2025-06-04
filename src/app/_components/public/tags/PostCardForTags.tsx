import { getImageBlurDataUrl } from "@/src/app/_lib/sharp/blur-data-url";
import { bebasNeue } from "@/src/app/_styles/font";
import { formatArticleDate } from "@/src/app/_utils/date";
import { OtherArticleProp } from "@/src/app/_utils/types";
import { Dot } from "lucide-react";
import Image from "next/image";

export default async function PostCardForTags({ article }: OtherArticleProp) {
  const { title, author, featuredImage, publishedAt, category } = article ?? {};

  const [featuredImageBlurDataUrl, avatarBlurDataUrl] = await Promise.all([
    getImageBlurDataUrl(featuredImage),
    getImageBlurDataUrl(author?.image),
  ]);

  return (
    <div className="flex shrink-0 flex-col justify-between space-y-4 overflow-hidden border-b border-neutral-200 pb-5 md:space-y-8 md:rounded-sm md:border md:border-neutral-100 md:shadow-sm md:shadow-neutral-100">
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
              alt="post-image"
              fill
              className="object-cover"
              placeholder={featuredImageBlurDataUrl ? "blur" : "empty"}
              blurDataURL={featuredImageBlurDataUrl ?? ""}
              quality={100}
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
                  className="object-cover"
                  placeholder={avatarBlurDataUrl ? "blur" : "empty"}
                  blurDataURL={avatarBlurDataUrl ?? ""}
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
