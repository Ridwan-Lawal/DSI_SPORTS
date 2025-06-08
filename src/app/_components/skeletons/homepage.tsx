import { Skeleton } from "@/components/ui/skeleton";

import { bebasNeue } from "@/src/app/_styles/font";

export function PremierLeagueNewsSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <h5 className={`${bebasNeue.className}`}>Premier League</h5>
        <p className="text-sm text-neutral-500">
          The Latest Premier League News
        </p>
      </div>

      <div className="no-scrollbar flex items-center gap-4 overflow-x-scroll">
        {[...Array(4)].map((_, i) => (
          <div
            className="w-[300px] shrink-0 space-y-4 overflow-hidden border-b border-neutral-200 pb-5 md:space-y-8 md:rounded-sm md:border md:border-neutral-100 md:shadow-sm md:shadow-neutral-100"
            key={i}
          >
            {/* Title & image */}
            <div className="flex justify-between gap-4 md:flex-col">
              <Skeleton className="h-5 w-[80%] md:order-2 md:w-full md:px-4" />
              <Skeleton className="relative order-1 h-[90px] w-[70px] md:aspect-video md:h-[220px] md:w-full md:rounded-none lg:h-[200px]" />
            </div>

            {/* Author and category */}
            <div className="flex items-center justify-between md:px-4">
              <div className="flex items-center gap-3">
                <Skeleton className="size-[20px] rounded-full" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3.5 w-3.5 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LatestNewsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div>
        <h5 className={`${bebasNeue.className}`}>Latest News</h5>
        <p className="text-sm text-neutral-500">
          The hottest news from the world of football
        </p>
      </div>

      {/* Featured Post Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        <div className="flex flex-col gap-4 overflow-hidden rounded-sm border-b border-neutral-200 pb-6 md:col-span-2 md:flex-row md:items-center md:pr-4 md:pb-0 lg:col-span-4 lg:mb-6">
          <Skeleton className="relative h-[280px] w-full md:h-[400px] md:w-[50%] lg:w-[65%]" />
          <div className="space-y-3 md:w-[50%] lg:w-[35%] lg:space-y-5">
            <Skeleton className="h-6 w-[80%]" />
            <Skeleton className="hidden h-4 w-[90%] md:block" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="size-[24px] rounded-full" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3.5 w-3.5 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>

        {/* Other Articles Skeleton */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="space-y-4 overflow-hidden border-b border-neutral-200 pb-5 md:space-y-8 md:rounded-sm"
          >
            <div className="flex justify-between md:flex-col md:gap-4">
              <Skeleton className="h-5 w-[80%] md:order-2 md:w-full md:px-4" />
              <Skeleton className="relative order-1 h-[90px] w-[70px] md:aspect-video md:h-[220px] md:w-full md:rounded-none lg:h-[200px]" />
            </div>
            <div className="flex items-center justify-between md:px-4">
              <div className="flex items-center gap-3">
                <Skeleton className="size-[20px] rounded-full" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3.5 w-3.5 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TransferNewsSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <h5 className={`${bebasNeue.className}`}>Transfer News</h5>
        <p className="text-sm text-neutral-500">The latest Transfer News.</p>
      </div>

      <div className="no-scrollbar flex items-center gap-4 overflow-x-scroll">
        {[...Array(4)].map((_, i) => (
          <div
            className="w-[300px] shrink-0 space-y-4 overflow-hidden border-b border-neutral-200 pb-5 md:space-y-8 md:rounded-sm md:border md:border-neutral-100 md:shadow-sm md:shadow-neutral-100"
            key={i}
          >
            {/* title and image */}
            <div className="flex justify-between gap-4 md:flex-col">
              <Skeleton className="h-5 w-[80%] md:order-2 md:w-full md:px-4" />
              <Skeleton className="relative order-1 h-[90px] w-[70px] md:aspect-video md:h-[220px] md:w-full md:rounded-none lg:h-[200px]" />
            </div>

            {/* author and category */}
            <div className="flex items-center justify-between md:px-4">
              <div className="flex items-center gap-3">
                <Skeleton className="size-[20px] rounded-full" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3.5 w-3.5 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NewsByCategoriesSkeleton() {
  return (
    <div className="space-y-3">
      <div>
        <h5 className={`${bebasNeue.className} text-xl`}>News By Category</h5>
        <p className="text-[13px] text-neutral-500">
          The latest Transfer News.
        </p>
      </div>

      {/* Skeleton cards */}
      <div className="no-scrollbar flex items-center gap-4 overflow-x-scroll px-4 py-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-[170px] shrink-0 space-y-2 rounded-md border border-neutral-100 bg-white px-4 py-3 shadow-md shadow-neutral-100"
          >
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-28" />
          </div>
        ))}
      </div>
    </div>
  );
}
