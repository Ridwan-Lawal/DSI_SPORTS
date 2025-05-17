"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckIcon, Filter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function ArticlesFilter() {
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") || "";
  const pathname = usePathname();
  const router = useRouter();
  const onFormSearch = useDebouncedCallback(function onFormSearch(
    search: string,
  ) {
    const params = new URLSearchParams(searchParams.toString());
    if (!search) {
      params.delete("search");
    } else {
      params.set("search", search);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 900);

  function onSelectStatus(status: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!status) {
      params.delete("status");
    } else if (status === currentStatus) {
      // if the status selected is equal to the current status already in the url, unselect the status, by deleting from the url.
      params.delete("status");
    } else {
      params.set("status", status);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="mt-9 flex items-center justify-between gap-5">
      <form
        action=""
        autoComplete="on"
        className="w-[80%] sm:w-[320px] lg:w-[360px]"
      >
        <input
          type="text"
          name="articleSearch"
          id="articleSearch"
          defaultValue=""
          autoComplete="article-search"
          aria-label="article search"
          placeholder="Search articles by title and category..."
          onChange={(e) => onFormSearch(e.target.value)}
        />
      </form>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-neutral-200 py-2.5 text-neutral-700 shadow-none ring-0"
          >
            <Filter /> <span className="hidden sm:inline">Filter by:</span>
            Status
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-2 w-fit border-0">
          <DropdownMenuLabel className="text-xs text-neutral-400">
            Status
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {["all", "published", "draft"]?.map((status) => (
            <DropdownMenuCheckboxItem
              key={status}
              className="text-sm font-medium text-neutral-700 capitalize"
              onClick={() => {
                onSelectStatus(status);
              }}
            >
              {currentStatus === status && <CheckIcon />} {status}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
