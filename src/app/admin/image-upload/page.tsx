import PostsImageUpload from "@/src/app/_components/public/PostsImageUpload";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl">Post images upload</h1>

      <Suspense fallback={<div>Uploading...</div>}>
        <PostsImageUpload />
      </Suspense>
    </div>
  );
}
