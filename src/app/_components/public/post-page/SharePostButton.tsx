"use client";

import { Share } from "lucide-react";
import toast from "react-hot-toast";

export default function SharePostButton({ slug }: { slug: string }) {
  async function onCopyUrl() {
    const postUrl = `${process.env.NEXT_PUBLIC_APP_URL}/news/${slug}`;

    try {
      await navigator.clipboard.writeText(postUrl);
      toast.success("URL copied to clipboard.");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Something went wrong - ${error.message}`);
      }
    }
  }

  return (
    <button onClick={onCopyUrl}>
      <Share className="size-5 cursor-pointer" />
    </button>
  );
}
