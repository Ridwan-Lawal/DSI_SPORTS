import { getArticlesCategory } from "@/src/app/_lib/data-service/homepage/articles";
import { bebasNeue } from "@/src/app/_styles/font";
import Link from "next/link";

export default async function NewsByCategories() {
  const articleCategories = await getArticlesCategory();

  return (
    <div className="space-y-3">
      <div>
        <h5 className={`${bebasNeue?.className} text-xl`}>News By Category</h5>
        <p className="text-[13px] text-neutral-500">
          The latest Transfer News.
        </p>
      </div>

      {/* news by category */}
      <div className="no-scrollbar flex items-center gap-4 overflow-x-scroll px-4 py-4">
        {articleCategories?.map((articleCategory) => (
          <Link
            href={`/news?category=${articleCategory?.category}`}
            key={articleCategory?.id}
          >
            <div className="w-[170px] shrink-0 cursor-pointer space-y-2 rounded-md border border-neutral-100 bg-white px-4 py-3 shadow-md shadow-neutral-100 transition-all hover:scale-105 hover:border-2 hover:border-neutral-800">
              <p className="text-xs font-medium text-neutral-500">Category</p>
              <p className={`${bebasNeue?.className} text-[15px]`}>
                {articleCategory?.category}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
