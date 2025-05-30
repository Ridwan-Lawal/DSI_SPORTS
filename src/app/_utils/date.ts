import { formatDistanceToNow } from "date-fns";

export function formatArticleDate(publishedAt: Date | null | undefined) {
  if (publishedAt) {
    return formatDistanceToNow(new Date(publishedAt), {
      addSuffix: true,
    });
  }
}
