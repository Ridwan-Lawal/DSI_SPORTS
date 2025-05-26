import { Skeleton } from "@/components/ui/skeleton";

export function MatchSkeleton() {
  return (
    <div className="space-y-6 rounded-md border border-neutral-100 bg-white px-6 pt-4 pb-6 shadow-md shadow-neutral-100">
      {/* Header */}
      <header>
        <Skeleton className="mb-2 h-5 w-36" />
        <Skeleton className="h-4 w-64" />
      </header>

      {/* Main content - Match cards */}
      <main className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-3 justify-center px-2 py-2 odd:bg-neutral-50 even:bg-white"
          >
            {/* Home team */}
            <div className="flex items-center justify-end gap-3">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="size-[22px] rounded-full" />
            </div>

            {/* Time/Score */}
            <div className="justify-self-center">
              <Skeleton className="h-6 w-12 rounded-md" />
            </div>

            {/* Away team */}
            <div className="flex items-center gap-3">
              <Skeleton className="size-[22px] rounded-full" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer>
        <Skeleton className="h-9 w-32" />
      </footer>
    </div>
  );
}

export function PopularArticleSkeleton() {
  return (
    <div className="space-y-6 rounded-md border border-neutral-100 bg-white px-6 pt-4 pb-6 shadow-md shadow-neutral-100">
      {/* Header */}
      <header>
        <Skeleton className="mb-2 h-5 w-36" />
        <Skeleton className="h-4 w-52" />
      </header>

      {/* Main content - Popular article cards */}
      <main className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              {/* Number indicator */}
              <Skeleton className="h-5 w-4" />

              <div>
                {/* Article title */}
                <Skeleton className="mb-1 h-4 w-44" />

                {/* Views count with icon */}
                <div className="flex items-center gap-1">
                  <Skeleton className="size-3.5" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>

            {/* Arrow button */}
            <Skeleton className="size-5" />
          </div>
        ))}
      </main>
    </div>
  );
}

export function RecentArticleSkeleton() {
  return (
    <div className="space-y-6 rounded-md border border-neutral-100 bg-white px-6 pt-4 pb-6 shadow-md shadow-neutral-100">
      {/* Header */}
      <header>
        <Skeleton className="mb-2 h-5 w-32" />
        <Skeleton className="h-4 w-56" />
      </header>

      {/* Main content - Article cards */}
      <main className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex-1">
              <Skeleton className="mb-1 h-4 w-48" />
              <Skeleton className="h-4 w-36" />
            </div>
            <Skeleton className="h-4 w-8" />
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer>
        <Skeleton className="h-9 w-32" />
      </footer>
    </div>
  );
}

export function AnalyticCardSkeleton() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }, (_, i) => i + 1)?.map((num) => (
        <div
          key={num}
          className="flex h-auto items-start justify-between rounded-sm border-neutral-100 bg-white p-4 shadow-md shadow-neutral-100"
        >
          <div className="flex w-full flex-col">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="size-4" />
            </div>

            {/* Mobile value */}
            <Skeleton className="mt-1 h-6 w-16 md:hidden" />
            {/* Desktop value */}
            <Skeleton className="mt-1 hidden h-7 w-16 md:block" />

            {/* Percentage indicator */}
            <div className="mt-1 flex items-center gap-1">
              <Skeleton className="size-4" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
