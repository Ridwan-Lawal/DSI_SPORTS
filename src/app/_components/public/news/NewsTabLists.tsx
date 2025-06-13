"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface NewsTabListsProps {
  articleCategories:
    | {
        id: string;
        category: string;
      }[]
    | undefined;
}

export default function NewsTabLists({ articleCategories }: NewsTabListsProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function onSelectNewsCategory(category: string) {
    const params = new URLSearchParams(searchParams.toString());

    // clear or reset the page number for each page

    params.delete("page");
    if (category !== "all") {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    console.log(
      pathname,
      params.toString(),
      `${pathname}?${params.toString()}`,
    );

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <TabsList className="shrink-0 space-x-4">
      <TabsTrigger
        value="all"
        className="text-neutral-700"
        onClick={() => onSelectNewsCategory("all")}
      >
        All News
      </TabsTrigger>
      {articleCategories?.map((articleCategory) => (
        <TabsTrigger
          value={articleCategory?.category}
          key={articleCategory?.id}
          className="shrink-0 text-neutral-700 capitalize"
          onClick={() => onSelectNewsCategory(articleCategory?.category)}
        >
          {articleCategory?.category}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
