import Messi from "@/public/messi-image.webp";
import Avatar from "@/public/svg/logo-color.svg";
import PremierLeague from "@/public/top1.webp";
import LatestNews from "@/src/app/_components/public/home/LatestNews";
import NewsByCategories from "@/src/app/_components/public/home/NewsByCategories";
import PremierLeagueNews from "@/src/app/_components/public/home/PremierLeague";
import SocialsMediaDetails from "@/src/app/_components/public/home/SocialsMediaDetails";
import TransferNews from "@/src/app/_components/public/home/TransferNews";

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
    <div className="border-2 border-green-500 bg-slate-50 py-12">
      <div className="space-y-12 bg-white px-4 py-10 sm:px-6 md:space-y-14 md:px-8">
        <LatestNews />
        <TransferNews />
        <PremierLeagueNews />
        <NewsByCategories />
      </div>

      {/* follow dsi */}
      <SocialsMediaDetails />
    </div>
  );
}

// Start fetching data
