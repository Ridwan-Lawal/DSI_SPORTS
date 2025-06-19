import FeaturedArticle from "@/src/app/_components/public/home/FeaturedPost";
import OtherHomepagePosts from "@/src/app/_components/public/home/OtherHomepagePosts";
import { getHomeArticlesCache } from "@/src/app/_lib/cache";
import { bebasNeue } from "@/src/app/_styles/font";

export default async function LatestNews() {
  const latestArticles = await getHomeArticlesCache();

  const featuredArticleData = latestArticles?.at(0);

  const otherArticles = latestArticles?.slice(1);

  return (
    <div className="space-y-6">
      {/* header */}
      <div>
        <h5 className={`${bebasNeue?.className}`}>Latest News</h5>
        <p className="text-sm text-neutral-500">
          The hottest news from the world of football
        </p>
      </div>

      {/* continue with the desktop view of the featured post. */}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {/* ======= featured post ========= */}
        <FeaturedArticle featuredArticleData={featuredArticleData} />
        {/* ========== Rest of the post */}
        {/* grid */}

        {otherArticles?.map((article) => (
          <OtherHomepagePosts key={article?.id} article={article} />
        ))}
      </div>
    </div>
  );
}

// slice the articles, excluding the first one, and map the otherHomepagePosts component with the rest of the data.
