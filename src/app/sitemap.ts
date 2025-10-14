import { getAllArticles } from "@/src/app/_lib/data-service/homepage/articles";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // uncomment the below august first
  const articles = await getAllArticles();

  // urls for dynamic routes for each  article
  const articlesUrls = articles?.slice(0, 10)?.map((article) => ({
    url: `${process.env.NEXT_PUBLIC_APP_URL}/news/${article.slug}`,
    lastModified: new Date(
      article?.updatedAt || article?.createdAt || Date.now(),
    ),
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      lastModified: new Date(),
    },

    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/news`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/about`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/contact`,
      lastModified: new Date(),
    },
    ...(articlesUrls ?? []),
  ];
}
