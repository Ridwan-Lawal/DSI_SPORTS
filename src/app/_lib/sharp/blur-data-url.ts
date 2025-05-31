import { getPlaiceholder } from "plaiceholder";

export async function getImageBlurDataUrl(imageUrl: string | null | undefined) {
  if (imageUrl) {
    try {
      const res = await fetch(imageUrl);
      const buffer = await res.arrayBuffer();
      const { base64 } = await getPlaiceholder(Buffer.from(buffer));
      return base64;
    } catch (error) {
      console.error("Error generating base64:", error);
      return null;
    }
  }
}
