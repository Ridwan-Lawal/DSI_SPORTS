// export metadata using generateMetadata()

import Post from "@/src/app/_components/public/post-page/Post";
import { getArticleBySlug } from "@/src/app/_lib/data-service/news/posts";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const paramsData = await params;
  const article = await getArticleBySlug(paramsData?.slug);

  return { title: article?.title };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const paramsData = await params;

  return (
    <div className="bg-slate-50 py-12">
      <Suspense fallback={<div>Loading...</div>} key={paramsData?.slug}>
        <Post slug={paramsData?.slug} />
      </Suspense>
    </div>
  );
}
