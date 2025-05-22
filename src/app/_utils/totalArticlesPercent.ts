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

  console.log(currentMonthArticlesCount, lastMonthArticlesCount);

  const articlePercentageBtwTwoMonth =
    currentMonthArticlesCount && lastMonthArticlesCount
      ? ((currentMonthArticlesCount - lastMonthArticlesCount) /
          lastMonthArticlesCount) *
        100
      : 0;

  return { articlePercentageBtwTwoMonth, currentMonthArticlesCount };
}
