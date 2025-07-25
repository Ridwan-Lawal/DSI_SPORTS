import { Article } from "@/src/app/_utils/types";

export function totalViewsPercent(articles: Article[] | undefined) {
  if (articles) {
    const currentMonthArticles = articles?.filter(
      (article) => article?.publishedAt?.getMonth() === new Date().getMonth(),
    );

    const lastMonthArticles = articles?.filter(
      (article) =>
        article?.publishedAt?.getMonth() ===
        (new Date().getMonth() === 0 ? 11 : new Date()?.getMonth() - 1),
    );

    const currentMonthViews = currentMonthArticles?.reduce(
      (acc, curArticle) => acc + curArticle?.views,
      0,
    );

    const lastMonthViews = lastMonthArticles?.reduce(
      (acc, curArticle) => acc + curArticle?.views,
      0,
    );

    const viewPercentageBtwTwoMonth =
      ((currentMonthViews - lastMonthViews) /
        (lastMonthViews === 0 ? 1 : lastMonthViews)) *
      100;

    // if lastMonthViews is 0, and will calculate the percentage, it will be infinity, because anything/0 is infinity, so we rather replace the 0 by 1

    return { viewPercentageBtwTwoMonth, currentMonthViews };
  }
}
