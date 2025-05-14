import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

export function useUploadImageToCloudinary() {
  const [featuredImageLink, setFeaturedImageLink] = useState<string | null>(
    null,
  );
  async function onImageUpload(e: ChangeEvent) {
    const curFile = e.target as HTMLInputElement;
    const file = curFile?.files?.[0];

    if (!file) return;

    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "dsisport");
    form.append("cloud_name", "daetxhtss");

    try {
      const cloudUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL!;
      console.log(cloudUrl, "env");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/daetxhtss/image/upload",
        {
          method: "POST",
          body: form,
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setFeaturedImageLink(data?.url);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  return { featuredImageLink, onImageUpload };
}
