import { ArrowUpRight, Eye } from "lucide-react";
import Link from "next/link";

interface PopularArticlesCardProps {
  article: {
    id: string;
    title: string;
    views: number;
    slug: string;
  };
  index: number;
}

export default async function PopularArticlesCard({
  article,
  index,
}: PopularArticlesCardProps) {
  const { title, slug, views } = article ?? {};

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <p className="font-medium">{index + 1}.</p>
        <div>
          <p className="text-[15px] font-medium">{title}</p>
          <p className="flex items-center gap-1 text-[13px] text-neutral-500">
            <Eye className="size-3.5" />
            <span>{views} views</span>
          </p>
        </div>
      </div>

      <Link href={`/news/${slug}`}>
        <button className="cursor-pointer text-[15px] font-medium capitalize hover:underline">
          <ArrowUpRight className="size-5" />
        </button>
      </Link>
    </div>
  );
}
