"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteArticleAction } from "@/src/app/_lib/actions/articles/edit-delete-article";
import { formatDate } from "@/src/app/_utils/formatData";
import { posts } from "@/src/db/schema/article";
import { InferSelectModel } from "drizzle-orm";
import { EllipsisVertical } from "lucide-react";
import { useTransition } from "react";
import toast from "react-hot-toast";

export type Article = InferSelectModel<typeof posts>;

export default function ArticleCard({
  article,
  optimisticDelete,
}: {
  article: Article;
  optimisticDelete: (action: string) => void;
}) {
  const [isDeleting, startTransition] = useTransition();

  function onMutating(action: string) {
    if (action === "delete") {
      // optimistic delete
      startTransition(() => {
        optimisticDelete(article?.id);
      });
      toast.success("Article successfully deleted!");

      //   delete from db
      startTransition(() => {
        deleteArticleAction(article?.id).then((res) => {
          if (res?.error) {
            toast.error(res?.error);
          }
        });
      });
    }
  }

  return (
    <div
      className="justify-items-between lg:min-h-[80px grid min-h-[100px] w-full grid-cols-3 items-center gap-4 px-3 py-3 text-[13.5px] text-neutral-700 odd:bg-neutral-50 even:bg-white md:grid-cols-4 md:text-sm md:odd:bg-white md:even:bg-neutral-50 lg:grid-cols-5"
      key={article?.id}
    >
      <p className="max-w-[200px] break-words whitespace-normal capitalize">
        {article?.title}
      </p>
      {/* category and status for mobile */}
      <div className="flex flex-col items-center gap-4 md:hidden">
        <p className="break-words whitespace-normal capitalize">
          {article?.category}
        </p>
        <p
          className={`capitalize ${article?.status === "published" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"} rounded-xl px-4 py-[3px] text-xs font-medium`}
        >
          {article?.status}
        </p>
      </div>

      {/* category and status for desktop */}
      <p className="hidden justify-self-center break-words whitespace-normal capitalize md:block">
        {article?.category}
      </p>
      <p
        className={`hidden self-center justify-self-center text-xs capitalize md:block ${article?.status === "published" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"} rounded-xl px-4 py-[3px] font-medium`}
      >
        {article?.status}
      </p>

      <p className="hidden justify-self-center lg:block">
        {formatDate(article?.publishedAt) ?? "N/A"}
      </p>

      <div className="flex h-full flex-col items-end justify-between gap-4 lg:justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer" asChild>
            <EllipsisVertical className="size-4 cursor-pointer text-neutral-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="absolute right-0 mt-2 max-w-[30px] min-w-[6rem] border-neutral-200 bg-white">
            {["edit", "delete"]?.map((action) => (
              <DropdownMenuCheckboxItem
                key={action}
                className={`${action === "delete" && "text-red-600"} cursor-pointer capitalize transition-colors hover:bg-neutral-100`}
                onClick={() => {
                  onMutating(action);
                }}
                disabled={isDeleting}
              >
                {action}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <p className="lg:hidden">{formatDate(article?.publishedAt) ?? "N/A"}</p>
      </div>
    </div>
  );
}
