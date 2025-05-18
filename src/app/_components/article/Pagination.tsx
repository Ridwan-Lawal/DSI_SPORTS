"use client";

import { Button } from "@/components/ui/button";
import { ARTICLES_PER_PAGE } from "@/src/app/_utils/constant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Pagination({
  totalArticlesCount,
  pageArticlesCount,
}: {
  totalArticlesCount: number | undefined;
  pageArticlesCount: number | undefined;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page") || 1);
  const noOfPages = totalArticlesCount
    ? Math.ceil(totalArticlesCount / ARTICLES_PER_PAGE)
    : 0;

  console.log({ noOfPages, totalArticlesCount, currentPage });

  function addPageToUrl(action: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (action === "previous" && currentPage !== 1) {
      params.set("page", String(currentPage - 1));
    } else if (action === "next" && currentPage < noOfPages) {
      params.set("page", String(currentPage + 1));
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  /** This is saying that if there no longer articles on the current page, automatically direct to the previous page */
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (!pageArticlesCount && currentPage > 1) {
      params.set("page", String(currentPage - 1));
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, pageArticlesCount, searchParams, currentPage]);

  const to = (currentPage - 1) * ARTICLES_PER_PAGE + 1;

  //   if currentPage is the lastpage then show like: showing 11 to 12 of 12 results else show like: showing 1 to 10 of 12 results
  const from =
    currentPage === noOfPages && totalArticlesCount
      ? ARTICLES_PER_PAGE * currentPage -
        (ARTICLES_PER_PAGE * currentPage - totalArticlesCount)
      : ARTICLES_PER_PAGE * currentPage;

  return (
    <footer className="mt-6 flex items-center justify-between py-2">
      <p className="text-[13px] text-gray-500 md:text-sm">
        Showing <span className="font-semibold text-gray-800">{to}</span> to{" "}
        <span className="font-semibold text-gray-800"> {from} </span> of{" "}
        <span className="font-semibold text-gray-800">
          {totalArticlesCount}
        </span>{" "}
        articles
      </p>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="border-neutral-400 text-neutral-500"
          onClick={() => addPageToUrl("previous")}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          className="border-neutral-400 text-neutral-500"
          onClick={() => addPageToUrl("next")}
          disabled={currentPage === noOfPages}
        >
          Next
        </Button>
      </div>
    </footer>
  );
}

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates saepe alias nam, repellendus deleniti, ex quod inventore laudantium tempora iure, veritatis culpa dolore. Aperiam aut est unde enim deleniti cum.
