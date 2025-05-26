import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";
import Link from "next/link";

export default function OverviewHeader() {
  const date = new Date().getHours();
  let timeOfTheDay;

  if (date >= 0 && date <= 11) {
    timeOfTheDay = "morning";
  } else if (date >= 12 && date <= 17) {
    timeOfTheDay = "afternoon";
  } else if (date >= 18 && date <= 21) {
    timeOfTheDay = "evening";
  } else {
    timeOfTheDay = "late night";
  }

  return (
    <>
      <header className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h4>Dashboard</h4>
          <p className="text-sm text-neutral-500 md:text-base">
            Good <span className="capitalize">{timeOfTheDay}</span>, DSI
          </p>
        </div>

        <div className="flex gap-4">
          <Link href="/admin/articles/new">
            <Button className="md:px-8 md:py-3" size="lg">
              <PenLine className="size-4" /> <span>New article</span>
            </Button>
          </Link>
        </div>
      </header>
    </>
  );
}

// starts with the teams page
