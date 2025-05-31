import { getNews } from "@/src/app/_lib/data-service/news/news";
import { getImageBlurDataUrl } from "@/src/app/_lib/sharp/blur-data-url";
import { bebasNeue } from "@/src/app/_styles/font";
import { formatArticleDate } from "@/src/app/_utils/date";
import { formatExcerpts } from "@/src/app/_utils/formatExcerpts";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type NewsReturnType = NonNullable<Awaited<ReturnType<typeof getNews>>>[0];

export default async function FeaturedNews({
  featuredNewsData,
}: {
  featuredNewsData: NewsReturnType | undefined;
}) {
  const { featuredImage, slug, category, publishedAt, title, excerpt, author } =
    featuredNewsData ?? {};

  const [featuredImageBlurDataUrl, avatarImageBlurDataUrl] = await Promise.all([
    getImageBlurDataUrl(featuredImage),
    getImageBlurDataUrl(author?.image),
  ]);

  return (
    <Link
      href={`/news/${slug}`}
      className="flex flex-col gap-4 overflow-hidden rounded-sm border border-neutral-200 pb-6 md:col-span-2 md:flex-row md:items-center md:pr-4 md:pb-0 lg:col-span-4 lg:mb-6"
    >
      {/* feature */}
      <div className="relative h-[280px] w-full md:h-[400px] md:w-[50%] lg:w-[65%]">
        {featuredImage && (
          <Image
            src={featuredImage}
            alt="feature-image"
            fill
            className="object-cover object-top"
            quality={100}
            placeholder={featuredImageBlurDataUrl ? "blur" : "empty"}
            blurDataURL={featuredImageBlurDataUrl ?? ""}
            priority={true}
          />
        )}
      </div>

      <div className="space-y-3 border md:w-[50%] lg:w-[35%] lg:space-y-5">
        {/* title */}
        <p className={`text-[22px] lg:text-2xl ${bebasNeue?.className} `}>
          {title}
        </p>

        <p className="hidden text-sm text-neutral-700 md:block lg:text-[14.5px]">
          {formatExcerpts(excerpt)}
        </p>

        <div className="flex items-center justify-between">
          {/* Author and publish time */}

          <div className="flex items-center gap-1">
            {/* author */}
            <div className="flex items-center gap-3">
              <div className="relative size-[24px] overflow-hidden rounded-full">
                {author?.image && (
                  <Image
                    src={author?.image}
                    alt="feature-image"
                    fill
                    quality={100}
                    className="object-cover"
                    placeholder={avatarImageBlurDataUrl ? "blur" : "empty"}
                    blurDataURL={avatarImageBlurDataUrl ?? ""}
                  />
                )}
              </div>

              <p className="text-[13px] font-medium text-neutral-500">
                {author?.name}
              </p>
            </div>
            <Dot className="size-4 text-neutral-500" />

            <p className="text-[13px] text-neutral-500">
              {formatArticleDate(publishedAt)}
            </p>
          </div>

          <p className="text-[13px] text-neutral-500 capitalize">{category}</p>
        </div>
      </div>
    </Link>
  );
}
