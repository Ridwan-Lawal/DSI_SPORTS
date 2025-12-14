import PostUploadCard from "@/src/app/_components/public/PostUploadCard";
import { getPostsData } from "@/src/app/_lib/data-service/post-image-upload-service";

export default async function PostsImageUpload() {
  const postsData = await getPostsData();

  const totalPostsNotUpdated = postsData?.reduce((acc, post) => {
    if (!post.featuredImage.split(".").includes("imagekit")) {
      return acc + 1;
    }
    return acc;
  }, 0);
  return (
    <div className="mt-6 flex flex-col gap-8 px-6">
      <p>
        Total Posts Left: {totalPostsNotUpdated} / {postsData?.length}
      </p>
      {postsData?.map((post) => (
        <PostUploadCard
          key={post?.id}
          post={post}
          totalPost={postsData?.length}
        />
      ))}
    </div>
  );
}
