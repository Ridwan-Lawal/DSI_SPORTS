import { getAllArticles } from "@/src/app/_lib/data-service/homepage/articles";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();

  const articlesUrls = articles?.map((article) => ({
    url: `${process.env.NEXT_PUBLIC_APP_URL}/news/${article.slug}`,
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    },
  ];
}
