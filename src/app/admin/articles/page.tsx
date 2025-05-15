import Articles from "@/src/app/_components/article/Articles";
import ArticlesFilter from "@/src/app/_components/article/ArticlesFilter";
import ArticlesPageHeader from "@/src/app/_components/article/ArticlesPageHeader";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
};

// get the params from the url
// fetch the data using the filters in the Articles component
// create a suspense key and wrap the components around suspense

export default function Page() {
  return (
    <div className="px-4 pt-4 pb-8 lg:px-6">
      <ArticlesPageHeader />
      <ArticlesFilter />

      <Articles />
    </div>
  );
}
