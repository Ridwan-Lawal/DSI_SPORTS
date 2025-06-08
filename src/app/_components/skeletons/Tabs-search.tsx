import { Skeleton } from "@/components/ui/skeleton";

export function PostsByTagsSkeleton() {
  return (
    <>
      {/* Grid layout for loading cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="flex shrink-0 flex-col justify-between space-y-4 overflow-hidden border-b border-neutral-200 pb-5 md:space-y-8 md:rounded-sm md:border md:border-neutral-100 md:shadow-sm md:shadow-neutral-100"
          >
            {/* Title and image */}
            <div className="flex justify-between gap-4 md:flex-col">
              <Skeleton className="h-4 w-[80%] md:order-2 md:w-full md:px-4" />
              <Skeleton className="relative order-1 h-[90px] w-[70px] md:aspect-video md:h-[220px] md:w-full md:rounded-none lg:h-[200px]" />
            </div>

            {/* Author and category */}
            <div className="flex items-center justify-between md:px-4">
              <div className="flex items-center gap-3">
                <Skeleton className="size-[20px] rounded-full" />
                <Skeleton className="h-4 w-[60px]" />
                <Skeleton className="h-3 w-[12px] rounded-full" />
                <Skeleton className="h-4 w-[50px]" />
              </div>

              <Skeleton className="hidden h-4 w-[50px] xl:block" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export function PostsBySearchSkeleton() {
  return (
    <>
      {/* Grid layout for loading cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="flex shrink-0 flex-col justify-between space-y-4 overflow-hidden border-b border-neutral-200 pb-5 md:space-y-8 md:rounded-sm md:border md:border-neutral-100 md:shadow-sm md:shadow-neutral-100"
          >
            {/* Title and image */}
            <div className="flex justify-between gap-4 md:flex-col">
              <Skeleton className="h-4 w-[80%] md:order-2 md:w-full md:px-4" />
              <Skeleton className="relative order-1 h-[90px] w-[70px] md:aspect-video md:h-[220px] md:w-full md:rounded-none lg:h-[200px]" />
            </div>

            {/* Author and category */}
            <div className="flex items-center justify-between md:px-4">
              <div className="flex items-center gap-3">
                <Skeleton className="size-[20px] rounded-full" />
                <Skeleton className="h-4 w-[60px]" />
                <Skeleton className="h-3 w-[12px] rounded-full" />
                <Skeleton className="h-4 w-[50px]" />
              </div>

              <Skeleton className="hidden h-4 w-[50px] xl:block" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
