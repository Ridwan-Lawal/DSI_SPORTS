import PremierLeagueNewsCard from "@/src/app/_components/public/home/PremierLeagueNewsCard";
import { getHomeArticlesCache } from "@/src/app/_lib/cache";
import { bebasNeue } from "@/src/app/_styles/font";

export default async function PremierLeagueNews() {
  const premierLeagueArticles = await getHomeArticlesCache("premier league");

  return (
    <div className="space-y-6">
      <div>
        <h5 className={`${bebasNeue?.className}`}>Premier League</h5>
        <p className="text-sm text-neutral-500">
          The Latest Premier League News
        </p>
      </div>

      <div className="no-scrollbar flex items-center gap-4 overflow-x-scroll">
        {/*  ========= card ========= */}
        {premierLeagueArticles?.map((article) => (
          <PremierLeagueNewsCard key={article?.id} article={article} />
        ))}

        {/* ======= End of card */}
      </div>
    </div>
  );
}
