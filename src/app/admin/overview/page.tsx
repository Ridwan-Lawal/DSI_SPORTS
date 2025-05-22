import OverviewAnalytics from "@/src/app/_components/overview/OverviewAnalytics";
import OverviewHeader from "@/src/app/_components/overview/OverviewHeader";
import PopularArticles from "@/src/app/_components/overview/PopularArticles";
import RecentArticles from "@/src/app/_components/overview/RecentArticle";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Overview",
};

export default async function Page() {
  return (
    <div className="min-h-screen bg-[#fafafa] px-4 pt-4 pb-8 lg:px-6">
      <OverviewHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <OverviewAnalytics />
      </Suspense>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* recent articles */}
        <Suspense fallback={<div>Loading...</div>}>
          <RecentArticles />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <PopularArticles />
        </Suspense>
      </div>
    </div>
  );
}
