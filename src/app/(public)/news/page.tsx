import NewsTabs from "@/src/app/_components/public/news/NewsTabs";
import { NewsTabsSkeleton } from "@/src/app/_components/skeletons/news-skeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "News",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const query = await searchParams;

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-[1440px] border-2 border-green-500 py-12">
        <div className="space-y-12 bg-white px-4 py-10 sm:px-6 md:space-y-14 md:px-8">
          <Suspense fallback={<NewsTabsSkeleton />}>
            <NewsTabs query={query} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
