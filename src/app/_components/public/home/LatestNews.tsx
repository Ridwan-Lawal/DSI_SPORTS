import { others, top } from "@/src/app/(public)/page";
import { bebasNeue } from "@/src/app/_styles/font";
import { Dot } from "lucide-react";
import Image from "next/image";

export default function LatestNews() {
  return (
    <div className="space-y-6">
      {/* header */}
      <div>
        <h5 className={`${bebasNeue?.className}`}>Latest News</h5>
        <p className="text-sm text-neutral-500">
          The hottest news from the world of football
        </p>
      </div>

      {/* continue with the desktop view of the featured post. */}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {/* ======= featured post ========= */}
        <div className="flex flex-col gap-4 border-b border-neutral-200 pb-6 md:col-span-2 md:flex-row md:items-center md:pb-0 lg:col-span-4 lg:mb-6">
          {/* feature */}
          <div className="md:w-[50%] lg:w-[65%]">
            <Image
              src={top?.image}
              alt="feature-image"
              className="object-cover md:h-full md:w-full"
              quality={100}
              priority={true}
            />
          </div>

          <div className="space-y-3 border md:w-[50%] lg:w-[35%] lg:space-y-5">
            {/* title */}
            <p className={`text-[22px] lg:text-2xl ${bebasNeue?.className} `}>
              {top?.title}
            </p>

            <p className="hidden text-sm text-neutral-700 md:block lg:text-[15px]">
              {top?.excerpts}
            </p>

            <div className="flex items-center justify-between">
              {/* Author and publish time */}

              <div className="flex items-center gap-1">
                {/* author */}
                <div className="flex items-center gap-3">
                  <div className="relative size-[24px] overflow-hidden rounded-full">
                    <Image
                      src={top?.author?.avatar}
                      alt="feature-image"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <p className="text-[13px] font-medium text-neutral-500">
                    {top?.author?.name}
                  </p>
                </div>
                <Dot className="size-4 text-neutral-500" />

                <p className="text-[13px] text-neutral-500">{top?.time}</p>
              </div>

              <p className="text-[13px] text-neutral-500 capitalize">
                {top?.category}
              </p>
            </div>
          </div>
        </div>

        {/* ========== Rest of the post */}
        {/* grid */}

        {others?.map((post, id) => (
          <div
            className="space-y-4 overflow-hidden border-b border-neutral-200 pb-5 md:space-y-8 md:rounded-sm md:border md:border-neutral-100 md:shadow-sm md:shadow-neutral-100"
            key={id}
          >
            {/* title and post image */}
            <div className="flex justify-between md:flex-col md:gap-4">
              <p
                className={`${bebasNeue?.className} w-[80%] sm:text-lg md:order-2 md:w-full md:px-4`}
              >
                {post?.title}
              </p>

              <div className="sm:[110px] relative order-1 h-[90px] w-[70px] overflow-hidden rounded-sm md:aspect-video md:h-[220px] md:w-full md:rounded-none lg:h-[200px]">
                <Image
                  src={post?.image}
                  alt="post-image"
                  fill
                  className="object-cover"
                  quality={100}
                />
              </div>
            </div>

            {/* author and category */}
            <div className="flex items-center justify-between md:px-4">
              {/* Author and publish time */}

              <div className="flex items-center gap-1">
                {/* author */}
                <div className="flex items-center gap-3">
                  <div className="relative size-[20px] overflow-hidden rounded-full">
                    <Image
                      src={post?.author?.avatar}
                      alt="feature-image"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <p className="text-[12px] font-medium text-neutral-500">
                    {post?.author?.name}
                  </p>
                </div>
                <Dot className="size-3.5 text-neutral-500" />

                <p className="text-[12px] text-neutral-500">{post?.time}</p>
              </div>

              <p className="text-[12px] text-neutral-500 capitalize lg:hidden xl:block">
                {post?.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
