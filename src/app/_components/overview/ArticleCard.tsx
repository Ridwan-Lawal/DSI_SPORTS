"use client";

import { formatDate } from "@/src/app/_utils/formatData";
import Link from "next/link";
interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    publishedAt: Date | null;
  };
}
export default function ArticleCard({ article }: ArticleCardProps) {
  const { id, title, publishedAt } = article ?? {};

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-[15px] font-medium">{title}</p>
        <p className="text-[15px] text-neutral-500">
          Published on {formatDate(publishedAt)}
        </p>
      </div>

      <Link href={`/admin/articles/new?articleToEditId=${id}`}>
        <button className="cursor-pointer text-[15px] font-medium capitalize hover:underline">
          edit
        </button>
      </Link>
    </div>
  );
}

/** TODO:
  total visitors, upcoming matches

 */
