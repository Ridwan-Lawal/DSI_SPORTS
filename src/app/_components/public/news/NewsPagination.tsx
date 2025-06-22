"use client";

import { Button } from "@/components/ui/button";
import { NEWS_PER_PAGE } from "@/src/app/_utils/constant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PAGINATION_BUTTON_LABEL = ["newer", "older"];

export default function NewsPagination({
  newsCount,
}: {
  newsCount: number | undefined;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentPage = searchParams?.get("page") ?? 1;
  const lastORTotalPage = newsCount ? Math.ceil(newsCount / NEWS_PER_PAGE) : 1;

  function onNavigatePages(buttonLabel: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (buttonLabel === "older") {
      const increasePageNo = +currentPage + 1;
      params.set("page", increasePageNo.toString());
    } else if (buttonLabel === "newer") {
      const decreasePageNo = +currentPage - 1;
      params.set("page", decreasePageNo.toString());
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="news-pagination mt-8 flex flex-col gap-3">
      {PAGINATION_BUTTON_LABEL?.map((label) => (
        <Button
          key={label}
          variant="outline"
          className={`w-full py-5 text-[15px] capitalize hover:bg-neutral-800 hover:text-white md:text-base ${+currentPage === 1 && label === "newer" && "hidden"} ${+currentPage === lastORTotalPage && label === "older" && "hidden"} `}
          onClick={() => onNavigatePages(label.toLowerCase())}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
