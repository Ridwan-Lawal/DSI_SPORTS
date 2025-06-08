import PostsByTags from "@/src/app/_components/public/tags/PostsByTags";
import { PostsByTagsSkeleton } from "@/src/app/_components/skeletons/Tabs-search";
import { Suspense } from "react";

interface ParamsProp {
  params: Promise<{ tag: string }>;
  searchParams?: Promise<{ page: string }>;
}

export async function generateMetadata({ params }: ParamsProp) {
  const paramsData = await params;

  return {
    title: paramsData?.tag,
  };
}

export default async function page({ params, searchParams }: ParamsProp) {
  const [paramsData, queryData] = await Promise.all([params, searchParams]);
  const suspenseKey = `${paramsData?.tag}-${queryData?.page}`;

  return (
    <div className="bg-slate-50 py-12">
      <div className="space-y-8 bg-white px-4 pt-6 pb-10 shadow-lg shadow-gray-100 sm:px-6 md:space-y-10 md:px-8 md:pt-8 md:pb-12">
        <div>
          <h3 className="text-[27.65px] uppercase md:text-[33.18px]">
            {paramsData?.tag}
          </h3>

          <p className="text-sm font-medium text-neutral-700 md:text-base">
            News related to the tag &quot;{paramsData?.tag}&quot;
          </p>
        </div>

        <Suspense fallback={<PostsByTagsSkeleton />} key={suspenseKey}>
          <PostsByTags tag={paramsData?.tag} pageNo={queryData?.page} />
        </Suspense>
      </div>
    </div>
  );
}
