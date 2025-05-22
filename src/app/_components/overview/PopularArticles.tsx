import PopularArticlesCard from "@/src/app/_components/overview/PopularArticlesCard";
import { getPopularArticles } from "@/src/app/_lib/data-service/overview/views";

export default async function PopularArticles() {
  const popularArticles = await getPopularArticles();

  return (
    <div className="space-y-6 rounded-md border border-neutral-100 bg-white px-6 pt-4 pb-6 shadow-md shadow-neutral-100">
      {/* header */}
      <header>
        <h5 className="capitalize">popular articles</h5>
        <p className="text-[15px] text-neutral-500">
          Most viewed articles this month
        </p>
      </header>

      <main className="space-y-3">
        {popularArticles?.map((article, index) => (
          <PopularArticlesCard
            key={article?.id}
            article={article}
            index={index}
          />
        ))}
      </main>
    </div>
  );
}
