import TransferNewsCard from "@/src/app/_components/public/home/TransferNewsCard";
import { getHomeArticles } from "@/src/app/_lib/data-service/homepage/articles";
import { bebasNeue } from "@/src/app/_styles/font";

export default async function TransferNews() {
  const transferArticles = await getHomeArticles("transfer");

  console.log(transferArticles);

  return (
    <div className="space-y-6">
      <div>
        <h5 className={`${bebasNeue?.className}`}>Transfer News</h5>
        <p className="text-sm text-neutral-500">The latest Transfer News.</p>
      </div>

      <div className="no-scrollbar flex items-center gap-4 overflow-x-scroll">
        {/*  ========= card ========= */}
        {transferArticles?.map((article) => (
          <TransferNewsCard key={article?.id} article={article} />
        ))}

        {/* ======= End of card */}
      </div>
    </div>
  );
}

// create a card component for the transfer article.
