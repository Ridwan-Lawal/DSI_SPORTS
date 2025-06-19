import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        //site crawlers to accept i.e google, bing e.t.c "*" means all crawlers
        userAgent: "*",

        // route to allow site crawlers to crawl
        allow: "/",

        // prevent site crawlers from crawling the admin routes and it subroute like /admin/overview
        disallow: "/admin/",
      },
    ],

    sitemap: `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
  };
}
