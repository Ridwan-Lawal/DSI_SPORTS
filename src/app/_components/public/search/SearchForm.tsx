"use client";

import Input from "@/src/app/_components/auth/Input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchForm() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const onEnterSearchValueDebounced = useDebouncedCallback(
    onEnterSearchValue,
    300,
  );

  function onEnterSearchValue(searchValue: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (!searchValue) {
      params.delete("query");
    } else {
      params.set("query", searchValue);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div>
      <form action="" autoComplete="on" className="sm:w-[450px]">
        <Input label="" htmlFor="" error="">
          <input
            type="text"
            name="search"
            id="search"
            defaultValue={searchParams.get("query") ?? ""}
            autoComplete="search"
            placeholder="Start searching..."
            aria-label="search"
            aria-live="polite"
            onChange={(e) => onEnterSearchValueDebounced(e.target.value)}
          />
        </Input>
      </form>
    </div>
  );
}
