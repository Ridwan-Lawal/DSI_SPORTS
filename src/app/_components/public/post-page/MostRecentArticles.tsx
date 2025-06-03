import MostRecentArticleCard from "@/src/app/_components/public/post-page/MostRecentArticleCard";
import { getMostRecentPosts } from "@/src/app/_lib/data-service/news/posts";
import { bebasNeue } from "@/src/app/_styles/font";

export default async function MostRecentArticles({
  currentPostSlug,
}: {
  currentPostSlug: string;
}) {
  const recentPosts = await getMostRecentPosts(currentPostSlug);

  return (
    <div className="mt-10 space-y-6 bg-white px-4 pt-6 pb-8 shadow-lg shadow-gray-100 sm:px-6 md:px-8 md:pt-8 md:pb-9 lg:mx-auto lg:max-w-[1100px]">
      <div>
        <h4 className={`${bebasNeue?.className}`}>Most Recent News</h4>
        <p className="text-sm text-neutral-500">The most recent News.</p>
      </div>

      <div className="relative flex">
        <div className={`no-scrollbar flex gap-4 overflow-x-scroll`}>
          {/*  ========= card ========= */}
          {recentPosts?.map((article) => (
            <MostRecentArticleCard key={article?.id} article={article} />
          ))}

          {/* ======= End of card */}
        </div>
        <div className="box-shadow absolute top-0 right-0 h-full w-2 bg-white" />
      </div>
    </div>
  );
}
