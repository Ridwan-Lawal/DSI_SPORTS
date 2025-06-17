import { Button } from "@/components/ui/button";
import { getMatches } from "@/src/app/_lib/data-service/live-scores/matches";
import Image from "next/image";
import Link from "next/link";

interface Match {
  homeTeam: {
    name: string;
    crest: string;
  };
  awayTeam: {
    name: string;
    crest: string;
  };
  status: string;
  utcDate: string;
  score: {
    fulltime: {
      home: number;
      away: number;
    };
    halftime: {
      home: number;
      away: number;
    };
  };
}

export default async function Matches() {
  const matchesData = await getMatches();
  const matches = matchesData?.matches?.slice(0, 5);

  console.log(matches);

  return (
    <div className="space-y-6 rounded-md border border-neutral-100 bg-white px-6 pt-4 pb-6 shadow-md shadow-neutral-100">
      {/* header */}
      <header>
        <h5 className="capitalize">Today&apos;s Matches</h5>
        <p className="text-[15px] text-neutral-500">
          A list of upcoming and live matches played today.
        </p>
      </header>

      <main className="space-y-3 odd:bg-neutral-100 even:bg-white">
        {matches?.map((match: Match, id: number) => (
          <div
            key={id}
            className="grid grid-cols-3 justify-center px-2 py-2 odd:bg-neutral-50 even:bg-white"
          >
            {/* home */}
            <div className="flex items-center justify-end gap-3">
              <p className="classNa text-[13px] font-medium">
                {match?.homeTeam?.name}
              </p>
              <div className="relative size-[22px]">
                <Image
                  src={match?.homeTeam?.crest}
                  alt="home"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* time */}
            {match?.status === "TIMED" ? (
              <p className="justify-self-center rounded-md px-2 py-1.5 font-medium">
                {String(new Date(match?.utcDate)?.getUTCHours())?.padStart(
                  2,
                  "0",
                )}{" "}
                :{" "}
                {String(new Date(match?.utcDate)?.getUTCMinutes())?.padStart(
                  2,
                  "0",
                )}
              </p>
            ) : (
              <p className="justify-self-center rounded-md px-2 py-1.5 font-medium">
                {match?.score?.fulltime?.home ?? match?.score?.halftime?.home} :{" "}
                {match?.score?.fulltime?.away ?? match?.score?.halftime?.away}
              </p>
            )}

            {/* {new Date(match?.utcDate as Date)?.getMinutes() ===
              new Date()?.getMinutes() &&
              new Date(match?.utcDate as Date)?.getHours() ===
                new Date()?.getHours() ? :} */}

            {/* away */}
            <div className="flex items-center gap-3">
              <div className="relative size-[22px]">
                <Image
                  src={match?.awayTeam?.crest}
                  alt="home"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-[13px] font-medium">{match?.awayTeam?.name}</p>
            </div>
          </div>
        ))}
      </main>

      <footer>
        <Link href="">
          <Button variant="outline" className="border-neutral-500">
            View all matches
          </Button>
        </Link>
      </footer>
    </div>
  );
}
