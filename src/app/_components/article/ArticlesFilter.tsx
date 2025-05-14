import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";

export default function ArticlesFilter() {
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
          {["published", "draft"]?.map((status) => (
            <DropdownMenuCheckboxItem
              key={status}
              className="text-sm font-medium text-neutral-700 capitalize"
            >
              {status}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
