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
      currentMonthViews && lastMonthViews
        ? ((currentMonthViews - lastMonthViews) / lastMonthViews) * 100
        : 0;

    return { viewPercentageBtwTwoMonth, currentMonthViews };
  }
}
