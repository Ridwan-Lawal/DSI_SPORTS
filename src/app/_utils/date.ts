import { formatDistanceToNow } from "date-fns";

export function formatArticleDate(publishedAt: Date | null | undefined) {
  if (publishedAt) {
    return formatDistanceToNow(new Date(publishedAt), {
      addSuffix: true,
    });
  }
}

export function formatDateForPostPage(publishedAt: Date | null | undefined) {
  if (publishedAt) {
    const formatDate = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "long",
    }).format(publishedAt);

    return formatDate;
  }
}
