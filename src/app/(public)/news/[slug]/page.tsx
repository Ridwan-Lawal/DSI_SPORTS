// export metadata using generateMetadata()

import Post from "@/src/app/_components/public/post-page/Post";
import { PostSkeleton } from "@/src/app/_components/skeletons/news-skeleton";
import { getArticleBySlug } from "@/src/app/_lib/data-service/news/posts";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const paramsData = await params;
  const article = await getArticleBySlug(paramsData?.slug);

  return {
    title: article?.seoTitle || article?.title,
    description: article?.seoDescription || article?.excerpt,
    openGraph: {
      images: [
        {
          url: article?.featuredImage || "",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

// uncomment aug 1st 2025

// export async function generateStaticParams() {
//   const articles = await getAllArticles();

//   if (!articles || articles?.length === 0) {
//     return [];
//   }

//   return articles?.slice(0, 10).map((article) => ({
//     slug: article?.slug,
//   }));
// }

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const paramsData = await params;

  return (
    <div className="bg-slate-50 py-12">
      <Suspense fallback={<PostSkeleton />} key={paramsData?.slug}>
        <Post slug={paramsData?.slug} />
      </Suspense>
    </div>
  );
}
