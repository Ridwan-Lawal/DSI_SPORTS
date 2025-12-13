import { getPlaiceholder } from "plaiceholder";

export async function getImageBlurDataUrl(imageUrl: string | null | undefined) {
  if (!imageUrl) return null;

  try {
    const res = await fetch(imageUrl);

    // Check if fetch was successful
    if (!res.ok) {
      console.error(`Failed to fetch image: ${res.status} ${res.statusText}`);
      return null;
    }

    const buffer = await res.arrayBuffer();

    // Check if buffer has content
    if (buffer.byteLength === 0) {
      console.error(`Empty buffer for image: ${imageUrl}`);
      return null;
    }

    const { base64 } = await getPlaiceholder(Buffer.from(buffer));
    return base64;
  } catch (error) {
    console.error(`Error generating blur data for ${imageUrl}:`, error);
    return null;
  }
}
