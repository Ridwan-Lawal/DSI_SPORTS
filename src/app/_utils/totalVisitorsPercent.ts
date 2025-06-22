import { Visitors } from "@/src/app/_utils/types";

export function totalVisitorsPercent(visitors: Visitors) {
  if (visitors) {
    const currentMonthUniqueVisitors = visitors?.filter(
      (article) => article?.visitedAt?.getMonth() === new Date().getMonth(),
    );

    const lastMonthUniqueVisitors = visitors?.filter(
      (article) =>
        article?.visitedAt?.getMonth() ===
        (new Date().getMonth() === 0 ? 11 : new Date()?.getMonth() - 1),
    );

    const currentMonthVisitors = currentMonthUniqueVisitors?.reduce(
      (acc, cur) => acc + cur?.visitedCount,
      0,
    );

    const lastMonthVisitors = lastMonthUniqueVisitors?.reduce(
      (acc, cur) => acc + cur?.visitedCount,
      0,
    );

    const visitorsPercentageBtwTwoMonth =
      ((currentMonthVisitors - lastMonthVisitors) /
        (lastMonthVisitors === 0 ? 1 : lastMonthVisitors)) *
      100;
    // if lastMonthVisitors is 0, and will calculate the percentage, it will be infinity, because anything/0 is infinity, so we rather replace the 0 by 1

    return {
      visitorsPercentageBtwTwoMonth,
      currentMonthUniqueVisitors: currentMonthUniqueVisitors?.length,
      currentMonthVisitors,
    };
  }
}
