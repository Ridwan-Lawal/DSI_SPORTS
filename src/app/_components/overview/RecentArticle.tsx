import { Button } from "@/components/ui/button";
import ArticleCard from "@/src/app/_components/overview/ArticleCard";
import { getRecentArticles } from "@/src/app/_lib/data-service/overview/articles";
import Link from "next/link";

export default async function RecentArticles() {
  const recentArticles = await getRecentArticles();

  console.log(recentArticles);

  return (
    <div className="space-y-6 rounded-md border border-neutral-100 bg-white px-6 pt-4 pb-6 shadow-md shadow-neutral-100">
      {/* header */}
      <header>
        <h5 className="capitalize">recent articles</h5>
        <p className="text-[15px] text-neutral-500">
          Your most recentlly published articles.
        </p>
      </header>
      <main className="space-y-3">
        {/* card */}

        {recentArticles?.map((article) => (
          <ArticleCard key={article?.id} article={article} />
        ))}
      </main>

      <footer>
        <Link href="/admin/articles">
          <Button variant="outline" className="border-neutral-500">
            View all articles
          </Button>
        </Link>
      </footer>
    </div>
  );
}
