import ImageKit from "imagekit";
import { NextResponse } from "next/server";

// Initialize ImageKit with your private key
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export async function POST(request: Request) {
  try {
    // 1. Read the form data from the request
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file found" }, { status: 400 });
    }

    // 2. Convert the File object to a Node.js Buffer
    // ImageKit needs a Buffer, Base64, or URL. We use Buffer here.
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Upload to ImageKit
    const response = await new Promise((resolve, reject) => {
      imagekit.upload(
        {
          file: buffer, // The file buffer
          fileName: file.name, // The original filename
          folder: "/my-uploads", // Optional: Organize in folders
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
    });

    // 4. Return the result (which contains the URL) to the frontend
    return NextResponse.json(response);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
