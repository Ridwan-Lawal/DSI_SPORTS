import Comments from "@/src/app/_components/public/post-page/Comments";
import Content from "@/src/app/_components/public/post-page/Content";
import MostRecentArticles from "@/src/app/_components/public/post-page/MostRecentArticles";
import SharePostButton from "@/src/app/_components/public/post-page/SharePostButton";
import { MostRecentArticlesSkeleton } from "@/src/app/_components/skeletons/news-skeleton";
import { storeViewsAction } from "@/src/app/_lib/actions/public/posts";
import { getArticleBySlug } from "@/src/app/_lib/data-service/news/posts";
import { getImageBlurDataUrl } from "@/src/app/_lib/sharp/blur-data-url";
import { bebasNeue } from "@/src/app/_styles/font";
import { formatDateForPostPage } from "@/src/app/_utils/date";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function Post({ slug }: { slug: string }) {
  const postData = await getArticleBySlug(slug);
  const { featuredImage, author, publishedAt, title, tags, excerpt, content } =
    postData ?? {};
  const [featuredImageBlurUrl, authorImageBlurUrl] = await Promise.all([
    getImageBlurDataUrl(featuredImage),
    getImageBlurDataUrl(author?.image),
  ]);

  setTimeout(async () => {
    await storeViewsAction(slug);
  }, 10000);

  return (
    <div>
      <div className="mx-auto max-w-[900px]">
        {/*============= header, title,  excerpt =========*/}

        <div className="relative z-0 aspect-video">
          {featuredImage && (
            <Image
              src={featuredImage}
              alt="featured-image"
              fill
              className="z-0 object-cover"
              quality={100}
              placeholder={featuredImageBlurUrl ? "blur" : "empty"}
              blurDataURL={featuredImageBlurUrl ?? ""}
              priority={true}
            />
          )}
        </div>

        {/* title excerpt */}
        <div className="z-10 bg-white px-4 pt-6 pb-10 shadow-lg shadow-neutral-100 sm:px-6 md:px-8 md:pt-8 md:pb-12 lg:relative lg:-top-16 lg:ml-auto lg:max-w-[850px]">
          {/* author & time posted */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="relative size-7 overflow-hidden rounded-full">
                  {author?.image && (
                    <Image
                      src={author?.image}
                      alt="author-avatar"
                      fill
                      className="object-cover"
                      quality={100}
                      placeholder={authorImageBlurUrl ? "blur" : "empty"}
                      blurDataURL={authorImageBlurUrl ?? ""}
                    />
                  )}
                </div>
                <p className="text-[15px] font-medium capitalize md:text-base">
                  {author?.name}
                </p>
              </div>
              <div className="h-4 border border-neutral-700" />
              <p className="text-sm">{formatDateForPostPage(publishedAt)}</p>
            </div>

            <SharePostButton slug={slug} />
          </div>

          {/* title */}
          <h4
            className={`${bebasNeue?.className} mt-3 text-3xl font-extrabold md:text-4xl lg:text-[40px]`}
          >
            {title}
          </h4>

          {/* tags */}
          <ul className="mt-4 flex flex-wrap items-center gap-2">
            {tags?.map((tag, id, arr) => (
              <Link href={`/tags/${tag.trim()}`} key={id}>
                <li className="flex items-center gap-2">
                  <span className="text-[11px] font-medium text-gray-500 capitalize md:text-xs">
                    {" "}
                    {tag}
                  </span>
                  {/* id is not the last id */}
                  {id !== arr.length - 1 && (
                    <Dot className="size-3.5 text-gray-700" />
                  )}
                </li>
              </Link>
            ))}
          </ul>

          {/* excerpt */}
          <p className="mt-6 text-[17.5px] font-medium text-gray-700 md:text-[19px]">
            {excerpt}
          </p>
        </div>

        {/* ======== content ========== */}
        <div className="-mt-4 bg-white px-4 pt-6 pb-8 text-[15px] shadow-lg shadow-gray-100 sm:px-6 md:px-8 md:pt-8 md:pb-9 md:text-base lg:ml-auto lg:max-w-[850px]">
          <Content postContent={content} />
        </div>
      </div>

      {/* most recent articles (change later to editor picks) */}

      <Suspense fallback={<MostRecentArticlesSkeleton />}>
        <MostRecentArticles currentPostSlug={slug} />
      </Suspense>

      {/* comments */}
      <Comments />
    </div>
  );
}

// search
