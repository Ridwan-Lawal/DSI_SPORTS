import { Article } from "@/src/app/_utils/types";

export function totalArticlesPercent(articles: Article[] | undefined) {
  const currentDate = new Date();

  const currentMonthArticlesCount = articles?.filter(
    (article) => article?.publishedAt?.getMonth() === currentDate.getMonth(),
  )?.length;

  const lastMonthArticlesCount = articles?.filter(
    (article) =>
      article?.publishedAt?.getMonth() === currentDate?.getMonth() - 1,
  )?.length;

  // if both of them are not undefined, calculate the percentage,

  const articlePercentageBtwTwoMonth =
    currentMonthArticlesCount !== undefined &&
    lastMonthArticlesCount !== undefined
      ? ((currentMonthArticlesCount - lastMonthArticlesCount) /
          (lastMonthArticlesCount === 0 ? 1 : lastMonthArticlesCount)) *
        100
      : // if lastMonthArticlesCount is 0, and will calculate the percentage, it will be infinity, because anything/0 is infinity, so we rather replace the 0 by 1
        0;

  return { articlePercentageBtwTwoMonth, currentMonthArticlesCount };
}
