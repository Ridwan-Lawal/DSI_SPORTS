import Articles from "@/src/app/_components/article/Articles";
import ArticlesFilter from "@/src/app/_components/article/ArticlesFilter";
import ArticlesPageHeader from "@/src/app/_components/article/ArticlesPageHeader";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
};

export default function Page() {
  return (
    <div className="px-4 pt-4 pb-8 lg:px-6">
      <ArticlesPageHeader />
      <ArticlesFilter />
      <Articles />
    </div>
  );
}

// push to git
