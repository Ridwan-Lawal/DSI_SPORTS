import {
  getArticlesCategory,
  getHomeArticles,
} from "@/src/app/_lib/data-service/homepage/articles";

// remove the 2 function aug 1st
export const getHomeArticlesCache = async (category?: string) =>
  await getHomeArticles(category);

export const getHomeArticlesCategoryCache = async () =>
  await getArticlesCategory();

// uncomment the 2 function aug 1st

// export const getHomeArticlesCache = unstable_cache(
//   async (category?: string) => {
//     return getHomeArticles(category);
//   },
//   ["homepage-articles-cache"],
//   {
//     tags: ["articles"],
//     //update to 3600s after aug 1st
//     revalidate: false,
//   },
// );

// export const getHomeArticlesCategoryCache = unstable_cache(
//   async () => {
//     return getArticlesCategory();
//   },
//   ["homepage-articles-category"],
//   {
//     tags: ["categories"],
//     //update to 3600s after aug 1st
//     revalidate: false,
//   },
// );
