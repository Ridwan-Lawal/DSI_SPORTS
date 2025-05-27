import { others } from "@/src/app/(public)/page";
import { bebasNeue } from "@/src/app/_styles/font";
import { Dot } from "lucide-react";
import Image from "next/image";

export default function TransferNews() {
  return (
    <div className="space-y-6">
      <div>
        <h5 className={`${bebasNeue?.className}`}>Transfer News</h5>
        <p className="text-sm text-neutral-500">The latest Transfer News.</p>
      </div>

      <div className="no-scrollbar flex items-center gap-4 overflow-x-scroll">
        {/*  ========= card ========= */}
        {others?.map((post, id) => (
          <div
            className="w-[300px] shrink-0 space-y-4 overflow-hidden border-b border-neutral-200 pb-5 md:space-y-8 md:rounded-sm md:border md:border-neutral-100 md:shadow-sm md:shadow-neutral-100"
            key={id}
          >
            {/* title and post image */}
            <div className="flex justify-between gap-4 md:flex-col">
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

        {/* ======= End of card */}
      </div>
    </div>
  );
}
