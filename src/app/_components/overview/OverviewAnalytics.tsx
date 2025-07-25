import AnalyticsCard from "@/src/app/_components/overview/AnalyticsCard";
import { getMatches } from "@/src/app/_lib/data-service/live-scores/matches";
import { getOverviewArticles } from "@/src/app/_lib/data-service/overview/articles";
import { getVisitorsCount } from "@/src/app/_lib/data-service/overview/visitors";
import { totalArticlesPercent } from "@/src/app/_utils/totalArticlesPercent";

import { totalViewsPercent } from "@/src/app/_utils/totalViewsPercent";
import { totalVisitorsPercent } from "@/src/app/_utils/totalVisitorsPercent";
import { Newspaper, Trophy, Users, View } from "lucide-react";

export default async function OverviewAnalytics() {
  const [matchesData, articles, visitors] = await Promise.all([
    getMatches(),
    getOverviewArticles(),
    getVisitorsCount(),
  ]);

  const { articlePercentageBtwTwoMonth, currentMonthArticlesCount } =
    totalArticlesPercent(articles) ?? {};

  const { currentMonthViews, viewPercentageBtwTwoMonth } =
    totalViewsPercent(articles) ?? {};

  const {
    currentMonthVisitors,
    visitorsPercentageBtwTwoMonth,
    currentMonthUniqueVisitors,
  } = totalVisitorsPercent(visitors) ?? {};

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <AnalyticsCard
        title="total articles"
        value={currentMonthArticlesCount}
        percent={articlePercentageBtwTwoMonth}
        Icon={Newspaper}
      />

      <AnalyticsCard
        title="page views"
        value={currentMonthViews}
        percent={viewPercentageBtwTwoMonth}
        Icon={View}
      />

      <AnalyticsCard
        title="total vistors"
        value={currentMonthVisitors}
        percent={visitorsPercentageBtwTwoMonth}
        Icon={Users}
        uniqueVisitors={currentMonthUniqueVisitors}
      />

      <AnalyticsCard
        title="upcoming matches"
        value={matchesData?.matches?.length}
        Icon={Trophy}
      />
    </div>
  );
}
