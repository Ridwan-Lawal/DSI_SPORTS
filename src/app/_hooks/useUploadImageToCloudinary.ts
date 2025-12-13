import { ChangeEvent, useState } from "react";

export function useUploadImageToCloudinary() {
  const [featuredImageLink, setFeaturedImageLink] = useState<string | null>(
    null,
  );
  const [uploading, setUploading] = useState(false);

  const onImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    // 1. Get the file from the form
    const formData = new FormData();
    formData.append("file", file);

    try {
      // 2. Send the file to our API route
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        // Note: Do NOT set Content-Type header manually when using FormData
        // The browser sets it automatically with the boundary
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      console.log("Upload response data:", data);

      // 3. Get the URL from the response
      setFeaturedImageLink(data.url); // 'url' is the key returned by ImageKit
    } catch (error) {
      console.error(error);
      alert("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  return { featuredImageLink, onImageUpload, uploading };
}

// import { ChangeEvent, useState } from "react";
// import toast from "react-hot-toast";

// export function useUploadImageToCloudinary() {
//   const [featuredImageLink, setFeaturedImageLink] = useState<string | null>(
//     null,
//   );
//   async function onImageUpload(e: ChangeEvent) {
//     const curFile = e.target as HTMLInputElement;
//     const file = curFile?.files?.[0];

//     if (!file) return;

//     const form = new FormData();
//     form.append("file", file);
//     form.append("upload_preset", "dsisport");
//     form.append("cloud_name", "daetxhtss");

//     try {
//       const cloudUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL!;

//       const response = await fetch(cloudUrl, {
//         method: "POST",
//         body: form,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       setFeaturedImageLink(data?.url);
//     } catch (error) {
//       if (error instanceof Error) {
//         toast.error(error.message);
//       }
//     }
//   }

//   return { featuredImageLink, onImageUpload };
// }
