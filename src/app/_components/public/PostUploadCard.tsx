"use client";

import { Button } from "@/components/ui/button";
import { useUploadImageToCloudinary } from "@/src/app/_hooks/useUploadImageToCloudinary";
import { postsImageUploadAction } from "@/src/app/_lib/actions/posts-image-upload-action";
import { Article } from "@/src/app/_utils/types";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PostUploadCard({ post }: { post: Article }) {
  const [hasUploaded, setHasUploaded] = useState(false);
  const { onImageUpload, uploading, featuredImageLink } =
    useUploadImageToCloudinary();
  const [state, formAction, isUploading] = useActionState(
    postsImageUploadAction,
    null,
  );

  const isImageUploaded = post.featuredImage.split(".").includes("imagekit");

  console.log(isImageUploaded);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.success);
      setHasUploaded(true);
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    !isImageUploaded && (
      <div
        key={post.id}
        className={`space-y-5 border-b border-gray-100 pb-4 ${hasUploaded ? "rounded-md bg-green-200 p-4" : ""}`}
      >
        <p>{post.title}</p>

        <form action={formAction} className="flex flex-row gap-2">
          <div>
            <input
              type="hidden"
              name="featuredImageLink"
              value={featuredImageLink || ""}
            />
            <input type="hidden" name="postId" value={post?.id} />
            <input
              type="file"
              name="featuredImage"
              id="featuredImage"
              onChange={(e) => onImageUpload(e)}
              defaultValue=""
              className="flex h-10 items-center md:text-base"
            />
            {uploading && <p className="text-xs italic">uploading image...</p>}
            {featuredImageLink && (
              <p className="text-xs italic">{featuredImageLink}</p>
            )}
          </div>

          {!isImageUploaded && (
            <Button disabled={isUploading || uploading}>
              {isUploading ? "updating..." : "Update featured image"}
            </Button>
          )}
          <a
            href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(post.title + " football match")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="link" type="button">
              Search image
            </Button>
          </a>
        </form>
      </div>
    )
  );
}
