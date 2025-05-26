import { Skeleton } from "@/components/ui/skeleton";

export function ArticlesFooterSkeletion() {
  return (
    <footer className="mt-6 flex items-center justify-between py-2">
      {/* Pagination info text */}
      <div className="text-[13px] text-gray-500 md:text-sm">
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-12" />
      </div>
    </footer>
  );
}

export function ArticlesSkeleton() {
  return (
    <div className="mt-9 overflow-hidden rounded-md border border-neutral-100 text-sm">
      {/* Table Header */}
      <div className="hidden w-full grid-cols-3 justify-between gap-4 bg-neutral-50 px-3 py-4 md:grid md:grid-cols-4 lg:grid-cols-5">
        <div className="max-w-[200px]">
          <Skeleton className="h-4 w-8" />
        </div>
        <div className="justify-self-center">
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="justify-self-center">
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="justify-self-center">
          <Skeleton className="h-4 w-8" />
        </div>
      </div>
      <div className="w-full">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="justify-items-between grid min-h-[100px] w-full grid-cols-3 items-center gap-4 px-3 py-3 text-[13.5px] text-neutral-700 odd:bg-neutral-50 even:bg-white md:grid-cols-4 md:text-sm md:odd:bg-white md:even:bg-neutral-50 lg:min-h-[80px] lg:grid-cols-5"
          >
            {/* Title */}
            <div className="max-w-[200px]">
              <Skeleton className="h-4 w-full" />
            </div>

            {/* Category and Status for mobile */}
            <div className="flex flex-col items-center gap-4 md:hidden">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-6 w-20 rounded-xl" />
            </div>

            {/* Category for desktop */}
            <div className="hidden justify-self-center md:block">
              <Skeleton className="h-4 w-16" />
            </div>

            {/* Status for desktop */}
            <div className="hidden self-center justify-self-center md:block">
              <Skeleton className="h-6 w-20 rounded-xl" />
            </div>

            {/* Published date for desktop */}
            <div className="hidden justify-self-center lg:block">
              <Skeleton className="h-4 w-20" />
            </div>

            {/* Actions and mobile date */}
            <div className="flex h-full flex-col items-end justify-between gap-4 lg:justify-center">
              <Skeleton className="size-4" />
              <div className="lg:hidden">
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="border-input bg-background flex h-10 w-full items-center justify-between rounded-md border px-3 py-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-4" />
    </div>
  );
}
