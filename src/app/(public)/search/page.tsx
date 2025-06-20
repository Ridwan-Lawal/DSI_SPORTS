import PostsBySearch from "@/src/app/_components/public/search/PostsBySearch";
import SearchForm from "@/src/app/_components/public/search/SearchForm";
import { PostsBySearchSkeleton } from "@/src/app/_components/skeletons/Tabs-search";
import { Suspense } from "react";

export const metadata = {
  title: "Search",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const queryData = await searchParams;

  return (
    <div className="bg-slate-50 py-12">
      <div className="bg-white px-4 pt-6 pb-10 shadow-lg shadow-gray-100 sm:px-6 md:space-y-10 md:px-8 md:pt-8 md:pb-12">
        <div className="space-y-1 md:space-y-2">
          <h3 className="text-[27.65px] uppercase md:text-[33.18px]">Search</h3>
          <SearchForm />
        </div>

        {/* posts */}
        <Suspense fallback={<PostsBySearchSkeleton />} key={queryData.query}>
          <PostsBySearch query={queryData?.query} pageNo={queryData?.page} />
        </Suspense>
      </div>
    </div>
  );
}

// <p className="text-sm font-medium text-neutral-700 md:text-base">
// News related to the tag &quot;{paramsData?.tag}&quot;
// </p>
