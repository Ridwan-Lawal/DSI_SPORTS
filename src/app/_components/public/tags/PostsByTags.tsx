import PostCardForTags from "@/src/app/_components/public/tags/PostCardForTags";
import TagPostPagination from "@/src/app/_components/public/tags/TagPostsPagination";
import {
  getPostsByTag,
  getPostsCountByTag,
} from "@/src/app/_lib/data-service/news/tags";
import { bebasNeue } from "@/src/app/_styles/font";
import Link from "next/link";

interface PostsByTags {
  tag: string;
  pageNo: string | undefined;
}

export default async function PostsByTags({ tag, pageNo }: PostsByTags) {
  const [articles, articlesCount] = await Promise.all([
    getPostsByTag(tag, pageNo ?? "1"),
    getPostsCountByTag(tag),
  ]);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
        {articles?.length ? (
          articles?.map((article) => (
            <Link href={`/news/${article?.slug}`} key={article?.id}>
              <PostCardForTags article={article} />
            </Link>
          ))
        ) : (
          <h5 className={`${bebasNeue?.className} min mt-16 text-center`}>
            No available news for the tag &quot;{tag}&quot;
          </h5>
        )}
      </div>

      <TagPostPagination newsCount={articlesCount?.at(0)?.count} />
    </>
  );
}
