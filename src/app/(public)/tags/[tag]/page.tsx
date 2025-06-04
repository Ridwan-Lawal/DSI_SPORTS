import PostsByTags from "@/src/app/_components/public/tags/PostsByTags";
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
      <div className="tags-search-container">
        <div>
          <h3 className="md:text-[33.18px]; text-[27.65px] uppercase">
            {paramsData?.tag}
          </h3>

          <p className="text-sm font-medium text-neutral-700 md:text-base">
            News related to the tag &quot;{paramsData?.tag}&quot;
          </p>
        </div>
        <Suspense fallback={<div>Loading</div>} key={suspenseKey}>
          <PostsByTags tag={paramsData?.tag} pageNo={queryData?.page} />
        </Suspense>
      </div>
    </div>
  );
}
