import LatestNews from "@/src/app/_components/public/home/LatestNews";
import NewsByCategories from "@/src/app/_components/public/home/NewsByCategories";
import PremierLeagueNews from "@/src/app/_components/public/home/PremierLeague";
import SocialsMediaDetails from "@/src/app/_components/public/home/SocialsMediaDetails";
import TransferNews from "@/src/app/_components/public/home/TransferNews";

import LatestNewsSkeleton, {
  NewsByCategoriesSkeleton,
  PremierLeagueNewsSkeleton,
  TransferNewsSkeleton,
} from "@/src/app/_components/skeletons/homepage";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-[1440px] py-12">
        <div className="space-y-12 bg-white px-4 py-10 sm:px-6 md:space-y-14 md:px-8">
          <Suspense fallback={<LatestNewsSkeleton />}>
            <LatestNews />
          </Suspense>

          <Suspense fallback={<TransferNewsSkeleton />}>
            <TransferNews />
          </Suspense>

          <Suspense fallback={<PremierLeagueNewsSkeleton />}>
            <PremierLeagueNews />
          </Suspense>

          <Suspense fallback={<NewsByCategoriesSkeleton />}>
            <NewsByCategories />
          </Suspense>
        </div>

        {/* follow dsi */}
        <SocialsMediaDetails />
      </div>
    </div>
  );
}

// Start fetching data
