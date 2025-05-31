import Messi from "@/public/messi-image.webp";
import Avatar from "@/public/svg/logo-color.svg";
import PremierLeague from "@/public/top1.webp";
import LatestNews from "@/src/app/_components/public/home/LatestNews";
import NewsByCategories from "@/src/app/_components/public/home/NewsByCategories";
import PremierLeagueNews from "@/src/app/_components/public/home/PremierLeague";
import SocialsMediaDetails from "@/src/app/_components/public/home/SocialsMediaDetails";
import TransferNews from "@/src/app/_components/public/home/TransferNews";
import { Suspense } from "react";

export const top = {
  image: PremierLeague,
  title: "🦁 OneFootball reviews the 2024/25 Premier League season",
  excerpts:
    "Another Premier League season is in the history books, and the 2024/25 campaign won't be forgotten in a hurry.Before we head into the summer, our writers take a look back...",
  author: {
    name: "DSI Football",
    avatar: Avatar,
  },
  time: "4 hours ago",
  category: "transfer",
};

export const others = Array.from({ length: 9 }, (_, i) => i + 1)?.map(() => ({
  image: Messi,
  title: "🦁 OneFootball reviews the 2024/25 Premier League season",
  excerpts:
    "Another Premier League season is in the history books, and the 2024/25 campaign won't be forgotten in a hurry.Before we head into the summer, our writers take a look back...",
  author: {
    name: "DSI Football",
    avatar: Avatar,
  },
  time: "4 hours ago",
  category: "transfer",
}));

export default function Page() {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-[1440px] border-2 border-green-500 py-12">
        <div className="space-y-12 bg-white px-4 py-10 sm:px-6 md:space-y-14 md:px-8">
          <Suspense fallback={<div>Loading...</div>}>
            <LatestNews />
          </Suspense>

          <Suspense fallback={<div>Loading...</div>}>
            <TransferNews />
          </Suspense>

          <Suspense fallback={<div>Loading...</div>}>
            <PremierLeagueNews />
          </Suspense>

          <Suspense fallback={<div>Loading...</div>}>
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
